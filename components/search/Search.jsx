import React, { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Style from './search.module.scss';
import { useRecoilState } from 'recoil';
import { modalSearchState } from 'global-state/modal';
import Loading from '../loading/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import useDebounce from 'hook/useDebounce';
import Link from 'next/link';
import Image from 'next/image';
import useOnClickOutside from 'hook/useClickOutSide';

async function searchCharacters(search) {
  const apiKey = 'f9dfb1e8d466d36c27850bedd2047687';
  try {
    const r = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: 'GET',
    });
    const r_1 = await r.json();

    return r_1;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const Search = () => {
  const refSearch = useRef();
  const [searchText, setSearchText] = useState('');
  const [dataSearch, setDataSearch] = useState([]);

  const [modalSearch, setModalSearch] = useRecoilState(modalSearchState);
  const debouncedSearchText = useDebounce(searchText, 600);

  const handleOnChangeInput = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchText) {
      setModalSearch((prev) => {
        return { ...prev, isLoading: true, open: true };
      });

      searchCharacters(debouncedSearchText).then((results) => {
        setModalSearch((prev) => {
          return { ...prev, isLoading: false };
        });
        setDataSearch(results);
      });
    }
  }, [debouncedSearchText, setModalSearch]);

  useEffect(() => {
    if (searchText === '') {
      setDataSearch([]);

      setModalSearch({
        open: false,
        isLoading: false,
      });
    }
  }, [searchText]);

  useOnClickOutside(refSearch, () => {
    setModalSearch((prev) => {
      return { open: false, isLoading: false };
    });
  });

  return (
    <>
      <div className={Style.search_container} ref={refSearch}>
        <div className={Style.search_content}>
          <input
            type="text"
            placeholder="Search items, collections, and accounts"
            onChange={handleOnChangeInput}
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

const imageLoader = ({ src, width, quality }) => {
  return `https://i.seadn.io/gae/9BXMUpdbaylPBUVYhJTZSBL7bUlXITA3DGUt0hr-f24SP6oqa1HijT0lj-oEMgs0sbBVBXVLG2wO6cEgwIVr83W-uaFYUb1Bn_77dA?auto=format&w=64&h=64}`;
};

const SearchFilter = ({ modalSearch, data = [] }) => {
  return (
    <>
      <motion.div
        className={Style.search_filter_container}
        initial={{ y: '-10px', opacity: 0 }}
        animate={{ y: '-2px', opacity: 1 }}
        exit={{ y: '-10px', opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {modalSearch.isLoading && (
          <>
            <div className={Style.search_loading}>
              <Loading></Loading>
            </div>
            <hr color="#eee"></hr>
            <p className={Style.search_notify}>
              Enter the press to search all items
            </p>
          </>
        )}

        {!modalSearch.isLoading && data.length > 0 ? (
          <>
            <div className={Style.search_collections}>
              <hr color="#eee"></hr>
              <strong>Collection</strong>
              <ul>
                <li>
                  <Link href={'#'}>
                    <div className={Style.search_collections_item}>
                      <Image
                        src="https://i.seadn.io/gae/9BXMUpdbaylPBUVYhJTZSBL7bUlXITA3DGUt0hr-f24SP6oqa1HijT0lj-oEMgs0sbBVBXVLG2wO6cEgwIVr83W-uaFYUb1Bn_77dA?auto=format&w=64&h=64"
                        alt="collection"
                        loader={imageLoader}
                        height={40}
                        width={40}
                        className={Style.search_collection_img}
                      ></Image>

                      <div className={Style.search_collection_description}>
                        <p>Jacob Lee - Break My Heart Again</p>
                        <p>101 Items</p>
                      </div>
                      <div className={Style.search_collection_price}>
                        <p>
                          <span>0,25</span>ETH
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={'#'}>
                    <div className={Style.search_collections_item}>
                      <Image
                        src="https://i.seadn.io/gae/9BXMUpdbaylPBUVYhJTZSBL7bUlXITA3DGUt0hr-f24SP6oqa1HijT0lj-oEMgs0sbBVBXVLG2wO6cEgwIVr83W-uaFYUb1Bn_77dA?auto=format&w=64&h=64"
                        alt="collection"
                        loader={imageLoader}
                        height={40}
                        width={40}
                        className={Style.search_collection_img}
                      ></Image>

                      <div className={Style.search_collection_description}>
                        <p>Jacob Lee - Break My Heart Again</p>
                        <p>101 Items</p>
                      </div>
                      <div className={Style.search_collection_price}>
                        <p>
                          <span>0,25</span>ETH
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>

            <hr color="#eee"></hr>
            <div className={Style.search_items}>
              <strong>Items</strong>
              <ul>
                <li>
                  <Link href={'#'}>
                    <div className={Style.search_item}>
                      <Image
                        src="https://i.seadn.io/gae/9BXMUpdbaylPBUVYhJTZSBL7bUlXITA3DGUt0hr-f24SP6oqa1HijT0lj-oEMgs0sbBVBXVLG2wO6cEgwIVr83W-uaFYUb1Bn_77dA?auto=format&w=64&h=64"
                        alt="collection"
                        loader={imageLoader}
                        height={40}
                        width={40}
                        className={Style.search_item_img}
                      ></Image>

                      <div className={Style.search_item_description}>
                        <p>Jacob Lee - Break My Heart Again</p>
                        <p>101 Items</p>
                      </div>
                      <div className={Style.search_item_price}>
                        <p>
                          <span>0,25</span>ETH
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : null}
      </motion.div>
    </>
  );
};

export default Search;
