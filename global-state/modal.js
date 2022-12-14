import React from 'react';
import { atom } from 'recoil';

export const modalCartState = atom({
  key: 'modalCart', // unique ID (with respect to other atoms/selectors)
  default: {
    open: false,
  }, // default value (aka initial value)
});

export const modalNotifyMetaMaskState = atom({
  key: 'modalMetaMask',
  default: {
    open: false,
  },
});

export const modalSearchState = atom({
  key: 'modalSearch',
  default: {
    open: false,
    isLoading: false,
  },
});

export const modalPaymentState = atom({
  key: 'modalPayment',
  default: {
    open: false,
  },
});

export const modalPaymentStateSuccess = atom({
  key: 'modalPaymentSuccess',
  default: {
    open: false,
  },
});
