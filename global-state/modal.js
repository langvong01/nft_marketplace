import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

export const cartModalState = atom({
  key: 'modalCartPayment', // unique ID (with respect to other atoms/selectors)
  default: {
    open: false,
    animation: false,
  }, // default value (aka initial value)
});
