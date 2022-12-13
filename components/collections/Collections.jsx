import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getTopTenCollectionLatest } from 'services/collectionService';
import { getTopTenItemLatest } from 'services/itemService';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

const CollectionStyles = styled.div`
  width: 95%;
  margin: 0 auto;
  padding-bottom: 3rem;
  .tab-list .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: white;
    background-color: rgb(14 165 233);
  }

  .tab-list .css-1aquho2-MuiTabs-indicator {
    display: none;
  }

  .tab-list .css-1h9z7r5-MuiButtonBase-root-MuiTab-root {
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Popins', sans-serif;
  }

  .tab-list .css-1gsv261 {
    border: unset;
  }

  .css-heg063-MuiTabs-flexContainer {
    align-items: center;
  }
  .css-1daeahq {
    border-bottom: unset;
  }
`;

const Collections = () => {
  const [value, setValue] = React.useState('collections');
  const [filter, setFilter] = useState('DESC');
  const [data, setData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 'collections') {
      getTopTenCollectionLatest(filter).then((data) => {
        setData(data);
      });
    } else if (value === 'items') {
      getTopTenItemLatest(filter).then((data) => {
        setData(data);
      });
    }
  }, [value, filter]);

  return (
    <>
      <CollectionStyles>
        <h2 className="text-4xl text-center">Collections</h2>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 'unset',
              margin: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            className=""
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              className="tab-list"
            >
              <Tab label="Collections" value="collections" />
              <Tab label="Items" value="items" />
            </TabList>
            <div className="collections-filter text-base">
              <select
                name="sort"
                id="sort"
                className="cursor-pointer"
                defaultValue={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              >
                <option value="DESC">Top</option>
                <option value="ASC">Cheapest</option>
              </select>
            </div>
          </Box>
          <div className="h-[1px] bg-gray-200 mt-2"></div>
          <TabPanel value="collections">
            {data.length > 0 ? (
              <ListCollection data={data}></ListCollection>
            ) : (
              <>
                <ListCollectionSkeleton></ListCollectionSkeleton>
              </>
            )}
          </TabPanel>
          <TabPanel value="items">
            {data.length > 0 ? (
              <ListItem data={data}></ListItem>
            ) : (
              <>
                <ListCollectionSkeleton></ListCollectionSkeleton>
              </>
            )}
          </TabPanel>
        </TabContext>
      </CollectionStyles>
    </>
  );
};

const ListCollection = React.memo(({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="list-collection-container flex items-center justify-between ">
        <div className="list-collection-left w-[45%]">
          <div className="list-collection-header flex justify-between mb-3">
            <p className="capitalize">Collection</p>
            <p className="capitalize">Total</p>
          </div>
          {data.length > 0 &&
            data.slice(0, 5).map((collection, index) => (
              <div
                className="list-collection-item w-full flex items-center justify-between mb-4 cursor-pointer hover:bg-slate-100 p-2"
                key={uuidv4()}
                onClick={() =>
                  router.push(`/collection/${collection.collectionName}`)
                }
              >
                <div className="flex-1 flex items-center gap-x-8">
                  <p>{index + 1}</p>
                  <img
                    src={collection.featuredImage}
                    alt="collection-img"
                    className="w-[60px] h-[60px] object-cover rounded-md"
                  />
                  <p className="capitalize">{collection.collectionName}</p>
                </div>
                <p>{collection.totalValue || 1}</p>
              </div>
            ))}
        </div>
        {data.length > 5 && (
          <div className="list-collection-right w-[45%]">
            <div className="list-collection-header flex justify-between mb-3">
              <p className="capitalize">Collection</p>
              <p className="capitalize">Total</p>
            </div>

            {data.length > 5 &&
              data.slice(5, 10).map((collection, index) => (
                <div
                  className="list-collection-item w-full flex items-center justify-between mb-4 cursor-pointer hover:bg-slate-100 p-2"
                  key={uuidv4()}
                >
                  <div className="flex-1 flex items-center gap-x-8">
                    <p>{index + 1}</p>
                    <img
                      src={collection.featuredImage}
                      alt="collection-img"
                      className="w-[60px] h-[60px] object-cover rounded-md"
                    />
                    <p className="capitalize">{collection.collectionName}</p>
                  </div>
                  <p>{collection.totalValue || 1}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
});

const ListItem = React.memo(({ data }) => {
  console.log(data);
  return (
    <>
      <div className="list-collection-container flex items-center justify-between ">
        <div className="list-collection-left w-[45%]">
          <div className="list-collection-header flex justify-between mb-3">
            <p className="capitalize">Item</p>
            <p className="capitalize">Total</p>
          </div>
          {data.length > 0 &&
            data.slice(0, 5).map((item, index) => (
              <div
                className="list-collection-item w-full flex items-center justify-between mb-4 cursor-pointer hover:bg-slate-100 p-2"
                key={uuidv4()}
              >
                <div className="flex-1 flex items-center gap-x-8">
                  <p>{index + 1}</p>
                  <img
                    src={item.mediaFileUrl}
                    alt="collection-img"
                    className="w-[60px] h-[60px] object-cover rounded-md"
                  />
                  <p>{item.itemName}</p>
                </div>
                <p>{item.price || 1}</p>
              </div>
            ))}
        </div>

        {data.length > 5 && (
          <div className="list-collection-right w-[45%]">
            <div className="list-collection-header flex justify-between mb-3">
              <p className="capitalize">Item</p>
              <p className="capitalize">Total</p>
            </div>
            <div className="list-collection-right w-[45%]">
              <div className="list-collection-header flex justify-between mb-3">
                <p className="capitalize">Collection</p>
                <p className="capitalize">Total</p>
              </div>

              {data.length > 5 &&
                data.slice(5, 10).map((item, index) => (
                  <div
                    className="list-collection-item w-full flex items-center justify-between mb-4 cursor-pointer hover:bg-slate-100 p-2"
                    key={uuidv4()}
                  >
                    <div className="flex-1 flex items-center gap-x-8">
                      <p>{index + 1}</p>
                      <img
                        src={item.mediaFileUrl}
                        alt="collection-img"
                        className="w-[60px] h-[60px] object-cover rounded-md"
                      />
                      <p className="capitalize">{item.itemName}</p>
                    </div>
                    <p>{item.price || 1}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
});

const ListCollectionSkeleton = () => {
  return <></>;
};

export default Collections;
