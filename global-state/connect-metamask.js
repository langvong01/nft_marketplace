import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
// import { ethers } from 'ethers';
// import Web3 from 'web3';
// import axios from 'axios';
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

    // checkIfWalletConnected: async () => {
    //   try {
    //     //brower
    //     if (!window.ethereum) {
    //       return {
    //         error: 'install',
    //         openError: true,
    //         accountCurrent: '',
    //         accountBalance: '',
    //         signature: '',
    //       };
    //     }

    //     const accounts = await window.ethereum.request({
    //       method: 'eth_accounts',
    //     });

    //     if (!accounts.length) {
    //       return {
    //         error: 'No Account Found',
    //         openError: true,
    //         accountCurrent: '',
    //         accountBalance: '',
    //         signature: '',
    //       };
    //     }

    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const getBalance = await provider.getBalance(accounts[0]);
    //     const bal = ethers.utils.formatEther(getBalance);

    //     return {
    //       error: '',
    //       openError: false,
    //       accountCurrent: accounts[0],
    //       accountBalance: bal,
    //       signature: '',
    //     };
    //   } catch (error) {
    //     return {
    //       error: 'Something wrong while connecting to wallet',
    //       openError: true,
    //       accountCurrent: '',
    //       accountBalance: '',
    //       signature: '',
    //     };
    //   }
    // },

    // connectWallet: async () => {
    //   try {
    //     // install metamask - turn on modal
    //     if (!window.ethereum) {
    //       return {
    //         error: 'install',
    //         openError: true,
    //         accountCurrent: '',
    //         accountBalance: '',
    //         signature: '',
    //       };
    //     }

    //     const accounts = await window.ethereum.request({
    //       method: 'eth_requestAccounts',
    //     });

    //     const responseGetNonce = await axios.get(
    //       `http://localhost:8080/api/v1/auth/nonce?walletAddress=${accounts[0]}`
    //     );

    //     const { body: nonce } = responseGetNonce.data;

    //     const { publicAddress, signature } = await handleSignMessage(
    //       accounts[0],
    //       nonce
    //     );

    //     await axios.post(
    //       `http://localhost:8080/api/v1/auth/login`,
    //       { walletAddress: publicAddress, signature },
    //       {
    //         withCredentials: true,
    //       }
    //     );
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const getBalance = await provider.getBalance(accounts[0]);
    //     const bal = ethers.utils.formatEther(getBalance);

    //     return {
    //       accountCurrent: accounts[0],
    //       signature: signature,
    //       accountBalance: bal,
    //       error: '',
    //       openError: false,
    //     };
    //   } catch (error) {
    //     return {
    //       error: 'Error while connecting to wallet',
    //       openError: true,
    //       accountCurrent: '',
    //       accountBalance: '',
    //       signature: '',
    //     };
    //   }
    // },
  },
  effects_UNSTABLE: [persistAtom], // default value (aka initial value)
});
