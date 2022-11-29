import * as React from 'react';
import Title from '../../components/Title';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function RatingsCard() {
  const [genreValue, setGenreValue] = React.useState(0);

  const [allData, setAllData] = React.useState([]);
  const [actionData, setActionData] = React.useState([])
  const [comedyData, setComedyData] = React.useState([])
  const [dramaData, setDramaData] = React.useState([])
  const [horrorData, setHorrorData] = React.useState([])
  const [romData, setRomData] = React.useState([])
  // Get data here using API
  // If needed, sort underneath... can sort here or in query
  // let data = RatingsData;

  const fetchAllData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/ratings/all")
      const list = await response.json()
      setAllData(list)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchActionData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/ratings/Action")
      const list = await response.json()
      setActionData(list)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchComedyData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/ratings/Comedy")
      const list = await response.json()
      setComedyData(list)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDramaData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/ratings/Drama")
      const list = await response.json()
      setDramaData(list)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchHorrorData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/ratings/Thriller")
      const list = await response.json()
      setHorrorData(list)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchRomData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/ratings/Romance")
      const list = await response.json()
      setRomData(list)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    fetchAllData()
    fetchActionData()
    fetchComedyData()
    fetchDramaData()
    fetchHorrorData()
    fetchRomData()
  }, [])

  let data
  if (genreValue == 0) {
    data = allData
  } else if (genreValue == 1) {
    data = actionData
  } else if (genreValue == 2) {
    data = comedyData
  } else if (genreValue == 3) {
    // Drama Movies
    data = dramaData
  } else if (genreValue == 4) {
    // Horror Movies
    data = horrorData
  } else {
    // Romance Movies
    data = romData
  }

  const handleGenreChange = (_event, newValue) => {
    setGenreValue(newValue);
  };

  function Row(props) {
    const { row } = props;

    return (
      <React.Fragment>
        <TableRow>
          <TableCell align="left">{row.title} ({row.year})</TableCell>
          <TableCell align="right">{row.rating}</TableCell>
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