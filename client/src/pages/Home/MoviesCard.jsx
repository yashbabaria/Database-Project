import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Title from './Title';
import { HighestRatedMoviesData, NewestMoviesData, TrendingMoviesData } from '../../Data';

export default function MoviesCard() {

  const [value, setValue] = React.useState(0);

  let data = [];

  if (value == 0) {
    data = HighestRatedMoviesData;
  } else if (value == 1) {
    data = NewestMoviesData;
  } else {
    data = TrendingMoviesData;
  }

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Title href="/Movies">Movies</Title>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Highest Rated" />
          <Tab label="Newest" />
          <Tab label="Trending" />
        </Tabs>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Actors</TableCell>
            <TableCell align="right">Rating / 100</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.title}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.actors}</TableCell>

              <TableCell align="right">{`${row.rating}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}