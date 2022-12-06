import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import Filter from './Filter';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const FilterCollection = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="container">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="flex !justify-between"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
            <Filter></Filter>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    </>
  );
};

export default FilterCollection;
