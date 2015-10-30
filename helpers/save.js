import got from 'got';
import type from 'file-type';
import { writeFile } from 'fs';

export default function save(image, path, cb) {
  got(image, { encoding: null })
    .then(({ body } = res) => ({ body, ext: type(body).ext }))
    .then(({ body, ext } = res) => {
      writeFile(`./dump/${path}.${ext}`, body, err => {
        if (err) return cb(err);
        cb(null, `${path}.${ext}`.replace('dump/', ''));
      })
    })
    .catch(cb);
}
