import React from 'react';

const Question = () => {
  return (
    <>
      <div className="w-[95%] mx-auto mb-14">
        <div className="questions-top flex justify-between items-center">
          <div className="questions-top-left">
            <h3 className="text-3xl">NFT 101</h3>
            <p className="font-medium text-base">
              Get comfortable with the basics
            </p>
          </div>
          <div className="questions-top-right">
            <button className="border-slate-300 rounded-lg hover:text-blue-500 px-7 py-2 border-2 text-xl font-semibold">
              Learn more
            </button>
          </div>
        </div>

        <div className="questions-bottom mt-4 flex items-center justify-between gap-y-8 flex-wrap">
          <div className="category-item cursor-pointer   rounded-lg overflow-hidden shadow-md w-[30%]">
            <div className="category-image ">
              <img
                src="https://opensea.io/static/images/learn-center//how-to-create-nft.png"
                alt="arts"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="category-text text-center">
              <h2 className="p-8 text-2xl">How to create an NFT?</h2>
            </div>
          </div>

          <div className="category-item cursor-pointer   rounded-lg overflow-hidden shadow-md w-[30%]">
            <div className="category-image ">
              <img
                src="https://opensea.io/static/images/learn-center//how-to-sell-nft.png"
                alt="arts"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="category-text text-center">
              <h2 className="p-8 text-2xl">How to sell an NFT?</h2>
            </div>
          </div>

          <div className="category-item cursor-pointer   rounded-lg overflow-hidden shadow-md w-[30%]">
            <div className="category-image ">
              <img
                src="https://opensea.io/static/images/learn-center//what-is-minting.png"
                alt="arts"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="category-text text-center">
              <h2 className="p-8 text-2xl">What is minting</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
