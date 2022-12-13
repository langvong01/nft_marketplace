import NFTDetailsPage from '../../nft-details-page/NFTDetailsPage';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axiosClient from 'utils/axiosClient';
import { useRouter } from 'next/router';
import { connectMetaMaskState } from 'global-state/connect-metamask';
import { getItemDetails } from '../../services/itemService';

const NFTDetails = ({}) => {
  const router = useRouter();
  const { itemId } = router.query;
  const [auth, setAuth] = useRecoilState(connectMetaMaskState);

  const [nft, setNft] = useState({
    mediaFileUrl: '',
    itemName: '',
    description: '',
    isOwner: 0,
    itemId: '',
    walletAddress: ' ',
    tokenId: '',
    isOnSale : 0
  });
  const [itemsActivity, setItemActivity] = useState([]);

  const fetchItemDetails = async () => {
    const data = await getItemDetails(itemId, auth.isLogin);
    if (data) {
      const {
        isOnSale,
        mediaFileUrl,
        itemName,
        description,
        isOwner,
        itemId,
        tokenId,
        creator: { walletAddress },
      } = data;
      setNft({
        ...nft,
        mediaFileUrl,
        itemName,
        description,
        isOwner,
        itemId,
        walletAddress,
        tokenId,
        isOnSale
      });
    }
  };

  const fetchItemActivity = async () => {
    try {
      if (!itemId) return;
      const { data } = await axiosClient.get(
        `/item-activities-history/${itemId}`
      );
      setItemActivity(data.body);
    } catch (error) {}
  };

  useEffect(() => {
    fetchItemDetails();
  }, [itemId]);

  useEffect(() => {
    fetchItemActivity();
  }, [itemId]);
  return <NFTDetailsPage nft={nft} itemsActivity={itemsActivity} />;
};

export default NFTDetails;
