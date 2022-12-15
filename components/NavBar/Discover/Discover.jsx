import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

//INTERNAL IMPORT
import Style from './Discover.module.css';

const Discover = () => {
  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: 'Collection',
      link: 'collection',
    },
    {
      name: 'Search',
      link: 'searchPage',
    },
    {
      name: 'Author Profile',
      link: 'author',
    },
    {
      name: 'NFT Details',
      link: 'NFT-details',
    },
    {
      name: 'Account Setting',
      link: 'account',
    },
    {
      name: 'Upload NFT',
      link: 'uploadNFT',
    },
    {
      name: 'Connect Wallet',
      link: 'connectWallet',
    },
    {
      name: 'Blog',
      link: 'blog',
    },
  ];

  return (
    <>
      {discover.map((el, i) => (
        <motion.li key={i + 1} className={Style.discover}>
          <Link href={`/${el.link}`}>{el.name}</Link>
        </motion.li>
      ))}
    </>
  );
};

export default Discover;
