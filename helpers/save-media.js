import save from './save';
import profileMedia from 'twitter-profile-media';
import { ensureDirSync } from 'fs-extra';

const saveMedia = (tokens, username, authorId, cb) => {
  profileMedia(tokens, username).then(data => {
    const { image: imageURL, banner: bannerURL } = data;

    ensureDirSync('./dump/images/');
    save(imageURL, `./images/${authorId}-image`, (imageErr, image) => {
      save(bannerURL, `./images/${authorId}-banner`, (bannerErr, banner) => {
        cb(null, { image, banner });
      });
    });
  }).catch(err => cb(err));
};

export default saveMedia;
