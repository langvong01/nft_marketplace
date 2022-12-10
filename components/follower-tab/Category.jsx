import React from 'react';
//INTERNAL IMPORT
import Style from './Category.module.scss';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import useSWR from 'swr';
import { fetcherSWR } from 'utils/api-config';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

const Category = () => {
  const { data, erorr } = useSWR('category', fetcherSWR);
  const router = useRouter();

  if (!data) {
    return (
      <>
        <div className={Style.followerTab}>
          <div className={Style.followerTab_title}>
            <h2 className="capitalize">Popular categories</h2>
          </div>
          <div className="category flex items-center justify-between w-[95%] mx-auto gap-y-8 flex-wrap">
            <CategorySkeleton></CategorySkeleton>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={Style.followerTab}>
      <div className={Style.followerTab_title}>
        <h2 className="capitalize">Popular categories</h2>
      </div>
      <div className="category flex items-center justify-between w-[95%] mx-auto gap-y-8 flex-wrap">
        <div className="category-item cursor-pointer rounded-lg overflow-hidden shadow-md  w-[30%]">
          <div className="category-image ">
            <img
              src="https://opensea.io/static/images/categories/art.png"
              alt="arts"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="category-text text-center">
            <h2 className="p-8 text-2xl">Arts</h2>
          </div>
        </div>

        <div className="category-item cursor-pointer  rounded-lg  overflow-hidden shadow-md w-[30%]">
          <div className="category-image">
            <img
              src="	https://opensea.io/static/images/categories/collectibles.png"
              alt="sports"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="category-text text-center">
            <h2 className="p-8 text-2xl">Sports</h2>
          </div>
        </div>

        <div className="category-item cursor-pointer   rounded-lg overflow-hidden shadow-md w-[30%]">
          <div className="category-image ">
            <img
              src="https://opensea.io/static/images/categories/sports.png"
              alt="arts"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="category-text text-center">
            <h2 className="p-8 text-2xl">Photography</h2>
          </div>
        </div>

        <div className="category-item cursor-pointer  rounded-lg overflow-hidden shadow-md w-[30%]">
          <div className="category-image ">
            <img
              src="https://opensea.io/static/images/categories/sports.png"
              alt="arts"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="category-text text-center">
            <h2 className="p-8 text-2xl">Vitural Worlds</h2>
          </div>
        </div>
        {data.body.map((categori) => (
          <>
            <div
              className="category-item cursor-pointer  rounded-lg overflow-hidden shadow-md w-[30%]"
              key={uuidv4()}
              onClick={() => router.push(`/category/${categori.categoryId}`)}
            >
              <div className="category-image overflow-hidden ">
                <img
                  src="https://opensea.io/static/images/categories/sports.png"
                  alt="arts"
                  className="w-full h-full object-cover hover:scale-105 scale-100 transition-all"
                />
              </div>
              <div className="category-text text-center">
                <h2 className="p-8 text-2xl">{categori.categoryName}</h2>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

const CategorySkeleton = () => {
  return (
    <>
      <Stack spacing={1} width={450}>
        {/* For other variants, adjust the size with `width` and `height` */}

        <Skeleton variant="rectangular" width={450} height={200} />
        <Skeleton variant="rectangular" width={450} height={100} />
      </Stack>

      <Stack spacing={1} width={450}>
        {/* For other variants, adjust the size with `width` and `height` */}

        <Skeleton variant="rectangular" width={450} height={200} />
        <Skeleton variant="rectangular" width={450} height={100} />
      </Stack>

      <Stack spacing={1} width={450}>
        {/* For other variants, adjust the size with `width` and `height` */}

        <Skeleton variant="rectangular" width={450} height={200} />
        <Skeleton variant="rectangular" width={450} height={100} />
      </Stack>
      <Stack spacing={1} width={450}>
        {/* For other variants, adjust the size with `width` and `height` */}

        <Skeleton variant="rectangular" width={450} height={200} />
        <Skeleton variant="rectangular" width={450} height={100} />
      </Stack>
      <Stack spacing={1} width={450}>
        {/* For other variants, adjust the size with `width` and `height` */}

        <Skeleton variant="rectangular" width={450} height={200} />
        <Skeleton variant="rectangular" width={450} height={100} />
      </Stack>
      <Stack spacing={1} width={450}>
        {/* For other variants, adjust the size with `width` and `height` */}

        <Skeleton variant="rectangular" width={450} height={200} />
        <Skeleton variant="rectangular" width={450} height={100} />
      </Stack>
    </>
  );
};

export default Category;
