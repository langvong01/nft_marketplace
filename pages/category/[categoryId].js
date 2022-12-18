import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAllCollectionInCategory } from 'services/collectionService';
import { v4 as uuidv4 } from 'uuid';
import axiosClient from 'utils/axiosClient';
import CollectionCard from '@/components/CollectionCard/CollectionCard';

const ListCollectionCategory = ({ collections, category }) => {
  const router = useRouter();
  console.log(category);
  useEffect(() => {
    document.title = `Category-${category.categoryName}`;
  }, [collections]);

  return (
    <>
      <div className="category-collection-container">
        <div className="banner w-full mb-10">
          <img
            src="https://i.seadn.io/gae/g6IAEmQm0J8J2ZoG0wLS04HEkVC7OvxNON5TvBZ4UR0Jm6LfIH4QwJNLWSnJsnabTnvarLUhpfRw_l-lMSBu6R0ymspZXNnT11YtXw?auto=format&w=3840"
            alt="banner"
          />
        </div>

        <div className="description w-[95%] mx-auto mb-10">
          <h1 className="text-4xl font-semibold">
            Explore {category.categoryName}
          </h1>
          <p className="text-base font-normal">
            <span>{category.categoryName}</span> are taking the NFT world by
            storm, and we've got a selection of breathtaking collections from a
            growing and increasingly global community of creators right here on
            underground.
          </p>
        </div>

        <div className="collection w-[95%] mx-auto">
          <h3 className="text-2xl">Collections</h3>
          <div className="collection-list my-6 grid grid-cols-4 gap-12">
            {collections
              ? collections.map((col) => (
                <CollectionCard collection={col} />
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const { categoryId } = context.query;
  const response = await axiosClient.get(`/category/${categoryId}`);
  const category = await response.data.body;
  const data = await getAllCollectionInCategory(categoryId);

  if (response.data.status === 404) {
    return {
      notFound: true,
    };
  }
  // console.log({ a : category})
  // console.log({b : response})
  return {
    props: {
      collections: data,
      category: category,
    },
  };
}

export default ListCollectionCategory;
