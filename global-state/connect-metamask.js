import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const connectMetaMaskState = atom({
  key: 'connectMetaMask', // unique ID (with respect to other atoms/selectors)
  default: {
    error: '',
    openError: false,
    accountCurrent: '',
    accountBalance: '',
    signature: '',
    isLogin: false,
  },
  effects_UNSTABLE: [persistAtom], // default value (aka initial value)
});
