import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Title from '../../components/Title';
import { HighestRatedMoviesData, NewestMoviesData } from '../../Data';

export default function MoviesCard() {

  const [value, setValue] = React.useState(0);

  // Get data here using API
  // Will display the 10 highest rated or most recent movies
  // this will all be done in the query
  let data = [];

  if (value == 0) {
    data = HighestRatedMoviesData;
  } else {
    data = NewestMoviesData;
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
              <TableCell>{row.title} ({row.year})</TableCell>
              <TableCell>{row.actors}</TableCell>

              <TableCell align="right">{`${row.rating}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}