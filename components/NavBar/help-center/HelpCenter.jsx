import React from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
//INTERNAL IMPORT
import Style from './HelpCenter.module.scss';

const HelpCenter = () => {
  const helpCenter = [
    {
      name: 'About',
      link: '/aboutus',
    },
    {
      name: 'Contact Us',
      link: '/contactus',
    },
  ];
  return (
    <div className={Style.box}>
      {helpCenter.map((el, i) => (
        <div key={uuidv4()} className={Style.helpCenter}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default HelpCenter;
