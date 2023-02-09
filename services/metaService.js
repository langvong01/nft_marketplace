import { ethers } from 'ethers';

import Web3 from 'web3';
import axiosClient from '../utils/axiosClient';

export const handleSignMessage = async (publicAddress, nonce) => {
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

export const connectMetaMaskService = async () => {
  try {
    // install metamask - turn on modal
    if (!window.ethereum) {
      alert('Please install metamask and reload page to continue');
      window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank')
      return {
        error: 'install',
        openError: true,
        accountCurrent: '',
        accountBalance: '',
        signature: '',
        isLogin: false,
      };
    }
    try {
      console.log('zo')
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                nativeCurrency: {
                  name: 'Matic',
                  symbol: 'MATIC',
                  decimals: 18,
                },
                chainName: 'Mumbai',
                chainId: '0x13881',
                rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
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
