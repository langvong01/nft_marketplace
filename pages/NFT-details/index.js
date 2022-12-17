import { useRouter } from 'next/router';
import React from 'react';
import { getAllItems } from 'services/itemService';
import { v4 as uuidv4 } from 'uuid';

const Index = ({ items }) => {
  const router = useRouter();
  console.log(items);

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
        {items?.map((item) => (
          <div
            className="collection-item rounded-lg object-cover overflow-hidden shadow-lg cursor-pointer"
            key={uuidv4()}
            onClick={() => router.push(`/NFT-details/${item.itemId}`)}
          >
            <div className="col-img h-[250px] overflow-hidden ">
              <img
                src={item.mediaFileUrl}
                className="w-full h-full object-cover hover:scale-105"
                alt="img"
              />
            </div>

            <div className="p-4">
              <p className="capitalize text-center">{item.itemName}</p>
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

  const data = await getAllItems();

  return {
    props: {
      items: data,
    },
  };
}

export default Index;
