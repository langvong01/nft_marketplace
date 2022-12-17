import React, { useState, useEffect } from 'react';

//INTERNAL IMPORT
import Style from '../../styles/author.module.css';
import images from '../../img';

import AuthorProfileCard from '../../authorPage/AuthorProfileCard/AuthorProfileCard';
import AuthorTaps from '../../authorPage/AuthorTaps/AuthorTaps';
import { useRouter } from 'next/router';
import axiosClient from 'utils/axiosClient';

import Banner from '@/components/banner/Banner';

import AuthorNFTCardBox from 'authorPage/AuthorNFTCardBox/AuthorNFTCardBox';

const AccountPage = ({}) => {
  const [profile, setProfile] = useState();
  const [itemsOwned, setItemOwned] = useState([]);
  const [itemCreated, setItemCreated] = useState([]);

  const router = useRouter();
  const { wlAdress } = router.query;

  useEffect(() => {
    const fetchProfileDetail = async () => {
      const {
        data: { body },
      } = await axiosClient.get(`/profile/${wlAdress}`);
      return body;
    };
    const fetchItemsOwned = async (name) => {
      const {
        data: {
          body: { content },
        },
      } = await axiosClient.post(`/item/filter`, {
        owned_by: name,
        sort_by: ['created_at'],
        order: ['DESC'],
        page: 1,
        size: 10,
      });
      return content;
    };
    const fetchItemsCreated = async (name) => {
      const {
        data: {
          body: { content },
        },
      } = await axiosClient.post(`/item/filter`, {
        creator: name,
        sort_by: ['created_at'],
        order: ['DESC'],
        page: 1,
        size: 10,
      });
      return content;
    };

    if (router.isReady) {
      fetchProfileDetail().then((data) => {
        console.log(data);
        const { name } = data;
        fetchItemsOwned(name).then((data) => setItemOwned(data));
        fetchItemsCreated(name).then((data) => setItemCreated(data));
        setProfile(data);
      });
    }
  }, [router.isReady]);
  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);

  return (
    <div className={Style.author}>
      <Banner bannerImage={profile?.avatar} />
      <AuthorProfileCard profile={profile} />
      <AuthorTaps setCollectiables={setCollectiables} setCreated={setCreated} />

      <AuthorNFTCardBox
        collectiables={collectiables}
        created={created}
        itemCreated={itemCreated}
        itemsOwned={itemsOwned}
      />
    </div>
  );
};
export default AccountPage;
