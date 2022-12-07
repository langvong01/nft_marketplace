import React from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const CollectionStyles = styled.div`
  width: 95%;
  margin: 0 auto;
  padding-bottom: 3rem;
  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: white;
    background-color: rgb(14 165 233);
  }

  .css-1aquho2-MuiTabs-indicator {
    display: none;
  }

  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root {
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Popins', sans-serif;
  }

  .css-1gsv261 {
    border: unset;
  }

  .css-heg063-MuiTabs-flexContainer {
    align-items: center;
  }
`;

const Collections = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <CollectionStyles>
        <h2 className="text-4xl text-center">Collections</h2>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Collections" value="1" />
              <Tab label="Items" value="2" />
              <div className="collections-filter"></div>
            </TabList>
          </Box>
          <div className="h-[1px] bg-slate-400 mt-2"></div>
          <TabPanel value="1">collection</TabPanel>
          <TabPanel value="2">Items</TabPanel>
        </TabContext>
      </CollectionStyles>
    </>
  );
};

export default Collections;
