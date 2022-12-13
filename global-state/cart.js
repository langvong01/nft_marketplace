import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const cartState = atom({
  key: 'cartPayment',
  default: {
    idItemSelected: [],
    items: [],
  },
  effects_UNSTABLE: [persistAtom],
});
