import NFTDetailsPage from '../../nft-details-page/NFTDetailsPage';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axiosClient from 'utils/axiosClient';
import { useRouter } from 'next/router';
import { connectMetaMaskState } from 'global-state/connect-metamask';
import { getItemDetails } from '../../services/itemService';

const NFTDetails = ({ itemsActivity }) => {
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
    isOnSale: 0,
    price: null,
  });
  // const [itemsActivity, setItemActivity] = useState([]);

  const fetchItemDetails = async () => {
    const data = await getItemDetails(itemId, auth.isLogin);
    if (data) {
      const {
        price,
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
        isOnSale,
        price,
      });
    }
  };

  useEffect(() => {
    fetchItemDetails();
  }, [itemId]);

  return <NFTDetailsPage nft={nft} itemsActivity={itemsActivity} />;
};

export default NFTDetails;

export async function getServerSideProps(context) {
  const { itemId } = context.query;

  const {
    data: { body: itemsActivity },
  } = await axiosClient.get(`/item-activities-history/${itemId}`);

  if (!itemsActivity) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      itemsActivity,
    },
  };
}
