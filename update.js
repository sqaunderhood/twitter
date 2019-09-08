import log from './helpers/log';
import { outputFile } from 'fs-extra';
import { reverse } from 'ramda';
import moment from 'moment';
import dec from 'bignum-dec';
import { sync as rm } from 'rimraf';

import { underhood } from './.underhoodrc.json';
import authors from './authors';

import tokens from 'twitter-tokens';
import getTweets from './helpers/get-tweets';
import getInfo from 'get-twitter-info';
import saveMedia from './helpers/save-media';

import ensureFilesForFirstUpdate from './helpers/ensure-author-files';
import saveAuthorArea from './helpers/save-author-area';

function update(author, nextAuthor) {
  const { authorId, first, username } = author;

  const { first: nextAuthorFirst } = nextAuthor || { first: null };

  ensureFilesForFirstUpdate(authorId);

  const tweetsSinceId = dec(first);
  const tweetsMaxId = nextAuthorFirst && dec(nextAuthorFirst);
  getTweets(tokens, underhood, tweetsSinceId, tweetsMaxId, (err, newTweetsRaw) => {
    if (err) throw err;
    saveAuthorArea(authorId, 'tweets', { tweets: reverse(newTweetsRaw) });
  });
  getInfo(tokens, username).then(info => {
    saveAuthorArea(authorId, 'info', info);
  });

  rm(`./dump/images/${username}*`);
  saveMedia(tokens, username, authorId, (err, media) => {
    if (err) throw err;
    saveAuthorArea(authorId, 'media', media);
  });

  outputFile('./dump/.timestamp', moment().unix(), err => {
    log(`${err ? '✗' : '✓'} timestamp`);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  getInfo(tokens, underhood).then(info => {
    saveAuthorArea(underhood, 'info', info);
  });

  const reversedAuthors = reverse(authors);
  for (let index = 0; index < reversedAuthors.length; index++) {
    if (index !== 0) await sleep(10000);
    const author = reversedAuthors[index];

    update(author, reversedAuthors[index + 1]);
  }
})();
