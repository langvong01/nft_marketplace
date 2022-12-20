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
import { getAllCollections } from 'services/collectionService';


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
    const fetchAllItems = async () => {
      const {
        data,
      } = await axiosClient.post(`item/filter`, {
        sort_by: ['created_at'],
        order: ['DESC'],
        page: 1,
        size: 100000,
      });
        return data?.body?.content
    };
    const fetchProfileDetail = async () => {
      const {
        data: { body },
      } = await axiosClient.get(`/profile/${wlAdress}`);
      return body;
    };

    if (router.isReady) {
      fetchAllItems().then((data) => {
        const filterItemCollected = data.filter((item) => {
          return item.ownedBy.walletAddress === wlAdress
        })
        const filterItemCreated = data.filter((item) => {
          return item.creator.walletAddress === wlAdress
        })
        setItemCreated(filterItemCreated)
        setItemOwned(filterItemCollected)
      }).catch(err => console.log(err))
      getAllCollections()
        .then((data) => {
          const filterCollections = data.filter((collection) => {
            return collection.account.walletAddress === wlAdress
          })
          setCollections(filterCollections)
        })
        .catch((err) => console.log(err));
      fetchProfileDetail().then((data) => {
        setProfile(data);
      });
    } else {
      return
    }
  }, [router.isReady,wlAdress]);

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
