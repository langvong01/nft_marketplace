import { useRouter } from 'next/router';
import React from 'react';

const CollectionCard = ({ collection }) => {
  const router = useRouter();

  return (
    <>
      <div
        className="collection-item w-full shadow-md rounded-lg overflow-hidden relative cursor-pointer "
        key={collection.collectionId}
        onClick={() => router.push(`/collection/${collection.collectionName}`)}
      >
        <div className="collection-item-img z-10">
          <img
            src={collection.featuredImage}
            alt="alt"
            className="w-full object-cover h-[300px]"
          />
        </div>
        <div className="sub-img p-2 shadow-lg rounded-lg overflow-hidden z-[50] absolute bottom-9 left-5 bg-slate-100">
          <img
            src={collection.logoImage}
            alt="sub-alt"
            className="w-[70px] h-[70px] object-cover rounded-lg "
          />
        </div>
        <div className="collection-text p-4 ">
          <h2 className="text-center capitalize">{collection.collectionName}</h2>
        </div>
      </div>
    </>
  );
};

export default CollectionCard;
