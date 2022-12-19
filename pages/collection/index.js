import CollectionCard from '@/components/CollectionCard/CollectionCard';
import useDebounce from 'hook/useDebounce';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { getAllCollections } from 'services/collectionService';
import { BsSearch } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { Skeleton } from '@mui/material';

const Index = ({ collections }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const valueSearch = useDebounce(textSearch, 600);

  const handleOnChange = (e) => {
    setIsLoading(true);
    setTextSearch(e.target.value);
  };

  useEffect(() => {
    if (valueSearch !== '') {
      setIsLoading(true);
      const listNewData = collections.filter((col) => {
        return col.collectionName.includes(valueSearch);
      });
      setIsLoading(false);
      setData(listNewData);
    }

    if (valueSearch === '') {
      setIsLoading(false);

      setData(collections);
    }
  }, [valueSearch]);

  return (
    <>
      <div className="collection-page-container mb-10">
        <div className="collection-page-img w-full h-[400px] mb-8">
          <img
            src="https://i.seadn.io/gcs/files/61a7eb876efd25dcfd8bbb52b84c6ba4.jpg?auto=format&w=3840"
            className="w-full h-full"
            alt=""
          />
        </div>
        <div className="w-[95%] mx-auto my-5">
          <form action="" className="flex w-[80%]  gap-x-4">
            <div className="w-[1000px] flex items-center border py-3 px-4 rounded-lg">
              <input
                type="text"
                placeholder="Search collection by name"
                className="flex-1 px-3"
                onChange={(e) => handleOnChange(e)}
              />
              {isLoading ? (
                <span className="h-[25px] w-[25px] border-2 border-blue-500 rounded-full border-r-transparent animate-spin"></span>
              ) : (
                <BsSearch className="text-xl"></BsSearch>
              )}
            </div>
          </form>
        </div>
        <div className="collection-list w-[95%] mx-auto grid grid-cols-4 relative gap-8">
          {isLoading && <ListSkeleton></ListSkeleton>}

          {!isLoading &&
            data.map((collection) => (
              <CollectionCard collection={collection} key={uuidv4()} />
            ))}
        </div>
        {!isLoading && data.length === 0 && (
          <>
            <div className="w-[95%] mx-auto h-[300px] border-2 rounded-lg border-gray-200 flex justify-center items-center">
              <p className="text-2xl">Collection not found by name</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const ListSkeleton = () => {
  return (
    <>
      {Array(4)
        .fill(0)
        .map(() => (
          <div className="flex flex-col">
            <Skeleton className="w-full object-cover h-[350px]" />

            <Skeleton className="w-[70px] h-[70px] object-cover rounded-lg " />

            <Skeleton></Skeleton>
          </div>
        ))}
    </>
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
