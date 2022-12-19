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
  const [collections, setCollections] = useState([]);

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [collectionOwned, setCollectionOwned] = useState(false);

  const router = useRouter();
  const { wlAdress } = router.query;

  useEffect(() => {
    const fetchAllCollection = async () => {
      const { data } = await axiosClient.get(`/collection/personal`);
      return data.body;
    };

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
      fetchAllCollection()
        .then((data) => setCollections(data))
        .catch((err) => console.log(err));
      fetchProfileDetail().then((data) => {
        const { name } = data;
        fetchItemsOwned(name).then((data) => setItemOwned(data));
        fetchItemsCreated(name).then((data) => setItemCreated(data));
        setProfile(data);
      });
    }
  }, [router.isReady]);

  return (
    <div className={Style.author}>
      <Banner
        bannerImage={profile?.avatar ? profile?.avatar : images.imgDefault.src}
      />
      <AuthorProfileCard profile={profile} />
      <AuthorTaps
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setCollectionOwned={setCollectionOwned}
      />

      <AuthorNFTCardBox
        collectionOwned={collectionOwned}
        collectiables={collectiables}
        created={created}
        collections={collections}
        itemCreated={itemCreated}
        itemsOwned={itemsOwned}
      />
    </div>
  );
};
export default AccountPage;
