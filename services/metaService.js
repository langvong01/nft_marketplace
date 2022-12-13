import { ethers } from 'ethers';

import Web3 from 'web3';
import axiosClient from '../utils/axiosClient';

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

// export const connectCreateCollectService = async () => {
//   console.log()
//   await axiosClient.post(`/v1/collection`, {
//     walletAddress: publicAddress,
//     signature,
//   });
// }

export const connectMetaMaskService = async () => {
  try {
    // install metamask - turn on modal
    if (!window.ethereum) {
      alert('Plesae install metamask before connecting')
      return {
        error: 'install',
        openError: true,
        accountCurrent: '',
        accountBalance: '',
        signature: '',
        isLogin: false,
      };
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const responseGetNonce = await axiosClient.get(
      `/auth/nonce?walletAddress=${accounts[0]}`
    );

    const { body: nonce } = responseGetNonce.data;

    const { publicAddress, signature } = await handleSignMessage(
      accounts[0],
      nonce
    );

    await axiosClient.post(`/auth/login`, {
      walletAddress: publicAddress,
      signature,
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const getBalance = await provider.getBalance(accounts[0]);
    const bal = ethers.utils.formatEther(getBalance);

    return {
      accountCurrent: accounts[0],
      signature: signature,
      accountBalance: bal,
      error: '',
      openError: false,
      isLogin: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Error while connecting to wallet',
      openError: true,
      accountCurrent: '',
      accountBalance: '',
      signature: '',
      isLogin: false,
    };
  }
};

export const checkMetaMaskService = async () => {
  try {
    //brower
    if (!window.ethereum) {
      return {
        error: 'install',
        openError: true,
        accountCurrent: '',
        accountBalance: '',
        signature: '',
        isLogin: false,
      };
    }

    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });

    if (!accounts.length) {
      return {
        error: 'No Account Found',
        openError: true,
        accountCurrent: '',
        accountBalance: '',
        signature: '',
        isLogin: false,
      };
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const getBalance = await provider.getBalance(accounts[0]);
    const bal = ethers.utils.formatEther(getBalance);

    return {
      error: '',
      openError: false,
      accountCurrent: accounts[0],
      accountBalance: bal,
      signature: '',
      isLogin: false,
    };
  } catch (error) {
    return {
      error: 'Something wrong while connecting to wallet',
      openError: true,
      accountCurrent: '',
      accountBalance: '',
      signature: '',
      isLogin: false,
    };
  }
};
