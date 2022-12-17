import { useRouter } from 'next/router';
import React from 'react';
import { getAllCollections } from 'services/collectionService';
import { v4 as uuidv4 } from 'uuid';

const Index = ({ collections }) => {
  const router = useRouter();

  return (
    <div className="collection-page-container mb-10">
      <div className="collection-page-img w-full h-[400px] mb-8">
        <img
          src="https://i.seadn.io/gcs/files/61a7eb876efd25dcfd8bbb52b84c6ba4.jpg?auto=format&w=3840"
          className="w-full h-full"
          alt=""
        />
      </div>

      <div className="collection-list w-[95%] mx-auto grid grid-cols-4 relative gap-8">
        {collections.map((collection) => (
          <div
            key={uuidv4()}
            className="collection-item rounded-lg object-cover overflow-hidden shadow-lg cursor-pointer"
            onClick={() =>
              router.push(`/collection/${collection.collectionName}`)
            }
          >
            <div className="col-img h-[250px] overflow-hidden ">
              <img
                src={collection.featuredImage}
                className="w-full h-full object-cover hover:scale-105"
                alt="img"
              />
            </div>

            <div className="p-4">
              <p className="capitalize text-center">
                {collection.collectionName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const data = await getAllCollections();

  return {
    props: {
      collections: data,
    },
  };
}

export default Index;
