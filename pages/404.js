import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const FourOhFour = () => {
  const router = useRouter();
  useEffect(() => {
    document.title = '404';
  }, []);
  return (
    <>
      <div className="relative w-[100vw] h-[100vh]">
        <div className="w-[100%] absolute h-full">
          <img
            src="https://mauwebsite.vn/wp-content/uploads/2021/10/loi-404.png"
            alt=""
            className="object-cover w-full h-full !m-0"
          />
        </div>
        <div className="absolute bg-slate-400 opacity-60 w-full h-full top-0 left-0 z-[20]"></div>

        <button
          className="absolute z-[9999999999999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !text-white py-3 px-6 bg-blue-500 font-bold hover:opacity-95 rounded-lg"
          onClick={() => router.push('/')}
        >
          Go Home
        </button>
      </div>
    </>
  );
};

export default FourOhFour;
