import { ensureFileSync, ensureDirSync } from 'fs-extra';

export default function ensureAuthorFiles(authorId) {
  ensureDirSync('./dump/images');
  ['info', 'tweets', 'media'].map(area => {
    ensureFileSync(`./dump/${authorId}-${area}.json`);
  });
}
