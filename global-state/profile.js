import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import images from '../img';

// const { persistAtom } = recoilPersist();

export const profileState = atom({
  key: 'profile',
  default: {
    name: '',
    avatar: images.imgDefault.src,
  },
  //   effects_UNSTABLE: [persistAtom],
});
