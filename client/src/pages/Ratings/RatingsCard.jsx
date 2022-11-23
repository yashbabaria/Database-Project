import * as React from 'react';
import Title from '../../components/Title';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { RatingsData } from '../../Data';

export default function RatingsCard() {
  const [genreValue, setGenreValue] = React.useState(0);

  // Get data here using API
  // If needed, sort underneath... can sort here or in query
  let data = RatingsData;

  if (genreValue == 0) {
    // All Movies
  } else if (genreValue == 1) {
    // Action Movies
  } else if (genreValue == 2) {
    // Comedy Movies
  } else if (genreValue == 3) {
    // Drama Movies
  } else if (genreValue == 4) {
    // Horror Movies
  } else {
    // Romance Movies
  }

  const handleGenreChange = (_event, newValue) => {
    setGenreValue(newValue);
  };

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell align="left">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="left">{row.title} ({row.year})</TableCell>
          {/* user rating will also go here*/}
          <TableCell align="right">{row.rating}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <TableRow>
                  <TableCell style={{ verticalAlign: 'top' }} width="10%">Username:</TableCell>
                  <TableCell align="right">username</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ borderBottom: "none", verticalAlign: 'top' }} width="10%">Rating:</TableCell>
                  <TableCell align="right" style={{ borderBottom: "none" }}>rating</TableCell>
                </TableRow>
              </Box>
              <Box sx={{ margin: 1, marginTop: 3 }}>
                <TableRow>
                  <TableCell style={{ verticalAlign: 'top' }} width="10%">Description:</TableCell>
                  <TableCell align="right">This is where row.description will go, but we don't have any descriptions to put here yet</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ verticalAlign: 'top' }} width="10%">Actors:</TableCell>
                  <TableCell align="right">{row.actors}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ verticalAlign: 'top' }} width="10%">Director:</TableCell>
                  <TableCell align="right">Director Person</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ verticalAlign: 'top' }} width="10%">Released:</TableCell>
                  <TableCell align="right">{row.year}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ borderBottom: "none", verticalAlign: 'top' }} width="10%">Duration:</TableCell>
                  <TableCell align="right" style={{ borderBottom: "none" }}>{row.duration}</TableCell>
                </TableRow>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Title href="/Movies">Ratings</Title>
      <Tabs
        value={genreValue}
        onChange={handleGenreChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
      >
        <Tab label="All" />
        <Tab label="Action" />
        <Tab label="Comedy" />
        <Tab label="Drama" />
        <Tab label="Horror" />
        <Tab label="Romance" />
      </Tabs>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="right">Rating / 100</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.title} row={row} />
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}