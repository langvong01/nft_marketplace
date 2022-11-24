import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { ethers } from 'ethers';
import Web3 from 'web3';
import axios from 'axios';

const handleSignMessage = async (publicAddress, nonce) => {
  try {
    const web3 = new Web3(window.ethereum);
    const signature = await web3.eth.personal.sign(
      `${nonce}`,
      publicAddress
      // MetaMask will ignore the password argument here
    );

    return { publicAddress, signature };
  } catch (err) {
    throw new Error('You need to sign the message to be able to log in.');
  }
};

export const connectMetaMaskState = atom({
  key: 'connectMetaMask', // unique ID (with respect to other atoms/selectors)
  default: {
    error: '',
    openError: false,
    currentAccount: '',
    accountBalance: '',
    signature: '',
    checkIfWalletConnected: async () => {
      try {
        //brower
        if (!window.ethereum) {
          return {
            error: 'Install MetaMask',
            openError: true,
            currentAccount: '',
            accountBalance: '',
          };
        }

        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });

        if (!accounts.length) {
          return {
            error: 'No Account Found',
            openError: true,
            currentAccount: '',
            accountBalance: '',
          };
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const getBalance = await provider.getBalance(accounts[0]);
        const bal = ethers.utils.formatEther(getBalance);

        return {
          error: '',
          openError: false,
          currentAccount: accounts[0],
          accountBalance: bal,
        };
      } catch (error) {
        console.log(error);
        return {
          error: 'Something wrong while connecting to wallet',
          openError: true,
          currentAccount: '',
          accountBalance: '',
        };
      }
    },
    connectWallet: async () => {
      try {
        // install metamask - turn on modal
        if (!window.ethereum) {
          return {
            error: 'Install MetaMask',
            openError: true,
            currentAccount: '',
            accountBalance: '',
          };
        }

        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        const responseGetNonce = await axios.get(
          `http://localhost:8080/api/v1/auth/nonce?walletAddress=${accounts[0]}`
        );

        // console.log(responseGetNonce.data);

        const { body: nonce } = responseGetNonce.data;

        const { publicAddress, signature } = await handleSignMessage(
          accounts[0],
          nonce
        );

        console.log(publicAddress, signature);

        const responeAuth = await axios.post(
          `http://localhost:8080/api/v1/auth/login`,
          { walletAddress: publicAddress, signature },
          {
            withCredentials: true,
          }
        );

        console.log(responseGetNonce, responeAuth);

        return { currentAccount: accounts[0], signature: signature };
      } catch (error) {
        console.log(error);
        return {
          error: 'Error while connecting to wallet',
          openError: true,
          currentAccount: '',
          accountBalance: '',
        };
      }
    },
  }, // default value (aka initial value)
});
