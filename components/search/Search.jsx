import React, { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Style from './search.module.scss';
import { useRecoilState } from 'recoil';
import { modalSearchState } from 'global-state/modal';
import Loading from '../loading/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import useDebounce from 'hook/useDebounce';
import Link from 'next/link';

const promise = new Promise((resolve, reject) => {
  const fakeData = [
    {
      type: 'collections',
      name: 'agj',
      img: 'https://i.seadn.io/gae/YcEhaLullll7uOW_J2LgFzNExy20VjjGJQYLKapP5RvA0g98fyyJc7Wyo4hWduM0ZEPSD2yzLPnVp2xr5vWrH_7SjUgMy2ePjZ5T8A?auto=format&w=64&h=64',
      total_item: 1,
    },

    {
      type: 'accounts',
      name: 'agj',
      img: 'https://i.seadn.io/gae/YcEhaLullll7uOW_J2LgFzNExy20VjjGJQYLKapP5RvA0g98fyyJc7Wyo4hWduM0ZEPSD2yzLPnVp2xr5vWrH_7SjUgMy2ePjZ5T8A?auto=format&w=64&h=64',
      total_item: 2,
    },
  ];

  setTimeout(() => {
    resolve(fakeData);
  }, 2000);
});

const Search = () => {
  const refSearch = useRef();
  const [searchText, setSearchText] = useState('');
  const [modalSearch, setModalSearch] = useRecoilState(modalSearchState);
  const [dataSearch, setDataSearch] = useState([]);
  const debouncedSearchText = useDebounce(searchText, 400);

  useEffect(() => {
    if (debouncedSearchText) {
      setModalSearch((prev) => {
        return { ...prev, open: true, type: 'result', isLoading: true };
      });

      promise.then((result) => {
        if (result) {
          setModalSearch((prev) => {
            return { ...prev, isLoading: false };
          });
          setDataSearch(refSearch);
        }
      });
    } else {
      setModalSearch((prev) => {
        return { ...prev, open: false, type: 'loading', isLoading: false };
      });
    }
  }, [debouncedSearchText]);

  console.log(modalSearch);
  return (
    <>
      <div className={Style.search_container} ref={refSearch}>
        <div className={Style.search_content}>
          <input
            type="text"
            placeholder="Search items, collections, and accounts"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <BsSearch onClick={() => {}} className={Style.search_icon} />
        </div>

        <AnimatePresence>
          {modalSearch.open ? (
            <SearchFilter
              modalSearch={modalSearch}
              data={dataSearch}
            ></SearchFilter>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
};

const SearchFilter = ({ modalSearch }) => {
  return (
    <>
      <motion.div
        className={Style.search_filter_container}
        initial={{ y: '-10px', opacity: 0 }}
        animate={{ y: '0', opacity: 1 }}
        exit={{ y: '-10px', opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {modalSearch.isLoading ? (
          <>
            <div className={Style.search_loading}>
              <Loading></Loading>
            </div>
            <hr color="#eee"></hr>
            <p className={Style.search_notify}>
              Enter the press to search all items
            </p>
          </>
        ) : null}
        <div className={Style.search_collections}>
          <strong>Collection</strong>
          <hr color="#eee"></hr>
          <ul>
            <li>aaa</li>
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default Search;
