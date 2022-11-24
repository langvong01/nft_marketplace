import React from 'react';
import { atom } from 'recoil';

export const modalCartState = atom({
  key: 'modalCart', // unique ID (with respect to other atoms/selectors)
  default: {
    open: false,
  }, // default value (aka initial value)
});

export const modalNotifyMetaMask = atom({
  key: 'modalMetaMask',
  default: {
    open: false,
  },
});
