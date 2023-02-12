import React, { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Style from './search.module.scss';
import { useRecoilState } from 'recoil';
import { modalSearchState } from 'global-state/modal';
import Loading from '../loading/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import useDebounce from 'hook/useDebounce';
import useOnClickOutside from 'hook/useClickOutSide';
import { getAllItems } from 'services/itemService';
import { getAllCollections } from 'services/collectionService';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const refSearch = useRef();
  const [searchText, setSearchText] = useState('');
  const [dataSearch, setDataSearch] = useState({
    collections: [],
    items: [],
  });
  const [dataApi, setDataApi] = useState({
    collections: [],
    items: [],
  });

  const [modalSearch, setModalSearch] = useRecoilState(modalSearchState);
  const debouncedSearchText = useDebounce(searchText, 600);

  useOnClickOutside(refSearch, () => {
    setModalSearch((prev) => {
      return { ...prev, open: false, isLoading: false };
    });
  });

  const handleOnChangeInput = (e) => {
    setIsLoading(true);
    setSearchText(e.target.value);
  };

  useEffect(() => {
    getAllItems().then((items) => {
      setDataApi((prev) => {
        return { ...prev, items: items };
      });
    });

    getAllCollections().then((collections) => {
      setDataApi((prev) => {
        return { ...prev, collections: collections };
      });
    });
  }, [debouncedSearchText]);

  useEffect(() => {
    if (searchText.length === 0) {
      setDataSearch({
        collections: [],
        items: [],
      });

      setModalSearch((prev) => {
        return {
          ...prev,
          open: false,
          isLoading: false,
        };
      });
    }
  }, [searchText]);

  useEffect(() => {
    setIsLoading(false);

    setModalSearch((prev) => {
      return { ...prev, isLoading: true, open: true };
    });
    if (debouncedSearchText.length > 0) {
      setModalSearch((prev) => {
        return { ...prev, isLoading: true, open: true };
      });

      const colSearch = dataApi.collections.filter((col) => {
        return col.collectionName.includes(debouncedSearchText);
      });

      const itemSearch = dataApi.items.filter((item) => {
        return item.itemName.includes(debouncedSearchText);
      });

      setDataSearch((prev) => {
        return { ...prev, collections: colSearch, items: itemSearch };
      });

      setModalSearch((prev) => {
        return { ...prev, isLoading: false, open: true };
      });
    } else if (debouncedSearchText.length === 0) {
      setModalSearch((prev) => {
        return { ...prev, isLoading: false, open: false };
      });
    }
  }, [debouncedSearchText, setModalSearch]);

  return (
    <>
      <div className={Style.search_container} ref={refSearch}>
        <div className={`${Style.search_content} flex`}>
          <input
            type="text"
            placeholder="Search items, collections"
            onChange={handleOnChangeInput}
          />
          {isLoading ? (
            <span className="border-2 h-[20px] w-[20px] border-blue-500 rounded-full border-r-transparent animate-spin"></span>
          ) : (
            <BsSearch onClick={() => {}} className={Style.search_icon} />
          )}
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
const SearchFilter = ({
  modalSearch,
  data = { collections: [], items: [] },
}) => {
  const router = useRouter();

  return (
    <>
      {data.collections.length === 0 && data.items.length === 0 ? (
        <>
          <motion.div
            className={Style.search_filter_container}
            initial={{ y: '-10px', opacity: 0 }}
            animate={{ y: '-2px', opacity: 1 }}
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
            ) : (
              <Empty></Empty>
            )}
          </motion.div>
        </>
      ) : (
        <motion.div
          className={`${Style.search_filter_container} ${
            data.collections.length === 0 && data.items.length === 0
              ? 'hidden'
              : 'block'
          }`}
          initial={{ y: '-10px', opacity: 0 }}
          animate={{ y: '-2px', opacity: 1 }}
          exit={{ y: '-10px', opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {(!modalSearch.isLoading && data.collections.length > 0) ||
          data.items.length > 0 ? (
            <>
              {data.collections.length > 0 ? (
                <div className={Style.search_collections}>
                  {/* <hr color="#eee"></hr> */}
                  <strong className="mt-2">Collections</strong>
                  <ul>
                    {data.collections.map((col) => (
                      <>
                        <li
                          key={uuidv4()}
                          onClick={() =>
                            router.push(`/collection/${col.collectionName}`)
                          }
                        >
                          <div>
                            <div className={Style.search_collections_item}>
                              <img
                                src={col.featuredImage}
                                alt="collection"
                                className={`${Style.search_collection_img} h-[40px] w-[40px]`}
                              ></img>

                              <div
                                className={Style.search_collection_description}
                              >
                                <p className="capitalize font-semibold text-black">
                                  {col.collectionName}
                                </p>
                                {/* <p>
                                  <span>{data.collections.length}</span> Items
                                </p> */}
                              </div>
                              {/* <div className={Style.search_collection_price}>
                                <p>
                                  <span className="mr-1">{col.totalValue}</span>
                                  MATIC
                                </p>
                              </div> */}
                            </div>
                          </div>
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
              ) : null}
              {data.items.length > 0 ? (
                <>
                  <hr color="#eee"></hr>
                  <div className={Style.search_items}>
                    <strong>Items</strong>
                    <ul>
                      {data.items.map((item) => (
                        <li
                          key={uuidv4()}
                          onClick={() =>
                            router.push(`/NFT-details/${item.itemId}`)
                          }
                        >
                          <div>
                            <div className={Style.search_item}>
                              <img
                                src={item.mediaFileUrl}
                                alt="item"
                                className={`${Style.search_item_img} h-[40px] w-[40px]`}
                              ></img>

                              <div className={Style.search_item_description}>
                                <p>{item.itemName}</p>
                              </div>
                              <div className={Style.search_item_price}>
                                <p>
                                  <span className="mr-1">{item.price}</span>
                                  {renderPrice(item.price)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : null}
            </>
          ) : (
            <Empty></Empty>
          )}
        </motion.div>
      )}
    </>
  );
};
function renderPrice(price)
{
  if (price && price > 0) {
    return 'MATIC';
  } else {
    return 'NOT FOR SALE';
  }
}
const Empty = () => {
  return (
    <>
      <div className="w-full p-2">
        <p className="text-base font-normal">Not found items and collections</p>
      </div>
    </>
  );
};

export default Search;
