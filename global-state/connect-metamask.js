import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { ethers } from "ethers";

export const connectMataMaskState = atom({
  key: "connectMetaMask", // unique ID (with respect to other atoms/selectors)
  default: {
    error: "",
    openError: false,
    currentAccount: "",
    accountBalance: "",
    checkIfWalletConnected: async () => {
      try {
        //brower
        if (!window.ethereum) {
          return {
            error: "Install MetaMask",
            openError: true,
            currentAccount: "",
            accountBalance: "",
          };
        }

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (!accounts.length) {
          return {
            error: "No Account Found",
            openError: true,
            currentAccount: "",
            accountBalance: "",
          };
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const getBalance = await provider.getBalance(accounts[0]);
        const bal = ethers.utils.formatEther(getBalance);

        return {
          error: "",
          openError: false,
          currentAccount: accounts[0],
          accountBalance: bal,
        };
      } catch (error) {
        console.log(error);
        return {
          error: "Something wrong while connecting to wallet",
          openError: true,
          currentAccount: "",
          accountBalance: "",
        };
      }
    },
    connectWallet: async () => {
      try {
        // install metamask - turn on modal
        if (!window.ethereum) {
          return {
            error: "Install MetaMask",
            openError: true,
            currentAccount: "",
            accountBalance: "",
          };
        }

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setMetamask((prev) => {
          return { ...prev, currentAccount: accounts[0] };
        });
      } catch (error) {
        return {
          error: "Error while connecting to wallet",
          openError: true,
          currentAccount: "",
          accountBalance: "",
        };
      }
    },
  }, // default value (aka initial value)
});
