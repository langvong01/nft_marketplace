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

  const [open, setOpen] = useState(false);

  const [nft, setNft] = useState({
    mediaFileUrl: '',
    itemName: '',
    description: '',
    isOwner: 0,
    itemId: '',
    tokenId: '',
    isOnSale: 0,
    price: null,
    collectionName: '',
    creator: {},
    ownedBy: {},
  });

  useEffect(() => {
    setOpen(true);
  }, []);
  const fetchItemDetails = async () => {
    const data = await getItemDetails(itemId, auth.isLogin);
    if (data) {
      const {
        collection: { collectionName },
        price,
        isOnSale,
        mediaFileUrl,
        itemName,
        description,
        isOwner,
        itemId,
        tokenId,
        creator,
        ownedBy,
      } = data;
      setNft({
        ...nft,
        mediaFileUrl,
        itemName,
        description,
        isOwner,
        itemId,
        tokenId,
        isOnSale,
        price,
        collectionName,
        creator,
        ownedBy,
      });
    }
  };

  useEffect(() => {
    fetchItemDetails();
  }, [itemId]);

  return open ? (
    <NFTDetailsPage nft={nft} itemsActivity={itemsActivity} />
  ) : null;
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
