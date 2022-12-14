import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

//INTERNAL IMPORT
import Style from './Discover.module.scss';

const Discover = () => {
  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: 'All collections',
      link: 'collection',
    },
    {
      name: 'All items',
      link: 'NFT-details',
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
