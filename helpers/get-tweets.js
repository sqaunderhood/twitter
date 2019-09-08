import Twitter from 'twit';
import log from './log';
import { merge, pipe, prop, head, concat, isEmpty } from 'ramda';

const defaults = {
  count: 200,
  trim_user: true,
  include_rts: true,
  exclude_replies: false,
};

const getNextOptions = (options, tweets) => {
  const lastId = head(tweets) && pipe(head, prop('id_str'))(tweets);
  return (isEmpty(tweets))
    ? options
    : merge(options, lastId && { since_id: lastId });
};

function accumulate(get, options, tweets, cb) {
  const nextOptions = getNextOptions(options, tweets);
  log('OPT:', nextOptions);
  get(nextOptions, (err, res) => {
    log('LENGTH:', res.length);
    if (err) return cb(err);
    const accumulatedTweets = concat(tweets, res);
    return (isEmpty(res))
      ? cb(null, accumulatedTweets)
      : accumulate(get, nextOptions, accumulatedTweets, cb);
  });
}

export default function getTweets(tokens, username, sinceId, maxId, cb) {
  const client = new Twitter(tokens);
  const get = client.get.bind(client, 'statuses/user_timeline');
  const options = merge(merge(defaults, { screen_name: username, since_id: sinceId }), maxId && { max_id: maxId });

  return accumulate(get, options, [], cb);
}
