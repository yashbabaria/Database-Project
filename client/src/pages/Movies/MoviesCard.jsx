import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
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

import Title from '../../components/Title';
import { HighestRatedMoviesData, NewestMoviesData } from '../../Data';
import { TextField } from '@mui/material';

export default function MoviesCard() {

  const [sortValue, setSortValue] = React.useState(0);
  const [genreValue, setGenreValue] = React.useState(0);

  const [ratedData, setRatedData] = React.useState([])
  const [newData, setNewData] = React.useState([])

  const [actionData, setActionData] = React.useState([])
  const [comedyData, setComedyData] = React.useState([])
  const [dramaData, setDramaData] = React.useState([])
  const [horrorData, setHorrorData] = React.useState([])
  const [romData, setRomData] = React.useState([])

  // Get data here using API
  // If needed, sort underneath... can sort here or in query
  let data = [];

  // if (sortValue == 0) {
  //   // will actually sort movie query by rating
  //   data = HighestRatedMoviesData;
  // } else {
  //   // will actually sort movie query by genre
  //   data = NewestMoviesData;
  // }

  const fetchRatedData = async () =>{
    try {
      const response = await fetch("http://localhost:3001/api/movies/highest/all")
      const list = await response.json()
      setNewData(list)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchNewData = async () =>{
    try {
      const response = await fetch("http://localhost:3001/api/movies/newest/all")
      const list = await response.json()
      setRatedData(list)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchActionData = async () =>{
    try {
      const response = await fetch("http://localhost:3001/api/movies/newest/Action")
      const list = await response.json()
      setActionData(list)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchComedyData = async () =>{
    try {
      const response = await fetch("http://localhost:3001/api/movies/newest/Comedy")
      const list = await response.json()
      setComedyData(list)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDramaData = async () =>{
    try {
      const response = await fetch("http://localhost:3001/api/movies/newest/Drama")
      const list = await response.json()
      setDramaData(list)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchHorrorData = async () =>{
    try {
      const response = await fetch("http://localhost:3001/api/movies/newest/Thriller")
      const list = await response.json()
      setHorrorData(list)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchRomData = async () =>{
    try {
      const response = await fetch("http://localhost:3001/api/movies/newest/Romance")
      const list = await response.json()
      setRomData(list)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() =>{
    fetchRatedData()
    fetchNewData()
    fetchActionData()
    fetchComedyData()
    fetchDramaData()
    fetchHorrorData()
    fetchRomData()
  }, [])


  if (genreValue == 0) {
    if(sortValue == 1){
      data = ratedData
    }else{
      data = newData
    }
  } else if (genreValue == 1) {
    data = actionData
  } else if (genreValue == 2) {
    data = comedyData
  } else if (genreValue == 3) {
    data = dramaData
  } else if (genreValue == 4) {
    data = horrorData
  } else {
    data = romData
  }

  const handleSortChange = (_event, newValue) => {
    setSortValue(newValue);
  };

  const handleGenreChange = (_event, newValue) => {
    setGenreValue(newValue);
  };



  function Rater(props) {
    const [error, setError] = React.useState(false);
    const [rating, setRating] = React.useState("");
    const handleChange = (e) => {
      setRating(e.target.value);
    }

    const rate = (e) => {
      if (rating !== '' && +rating > 0 && +rating <= 100) {
        setError(false);
        //instead of logging, will create a rating here
        //might want to check if the user has already rated this movie
        const userID = 3 // FIX: need to current user's userID from url or somewhere
        const titleName = e.target.value
        const ratingNum = rating
        try {
          const body = {userID, titleName, ratingNum}
          const response = fetch("http://localhost:3001/api/ratings", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
          })
          //console.log(response)
        } catch (error) {
          console.log(error)
        }
        console.log(e.target.value, "rating: ", rating);
        window.location.reload() // Maybe load to the MyRatings Page
      } else {
        setError(true);
      }
      setRating("");
    }

    return (
      <Grid container direction='row' spacing={1}>
        <Grid item justify="center" xs={6}>
          <TextField
            error={error && (rating === '' || +rating < 0 || +rating > 100)}
            helperText={error ? '0-100' : ''}
            hiddenLabel
            InputProps={{
              inputProps: {
                max: 100, min: 0
              }
            }}
            onChange={handleChange}
            size="small"
            type='number'
            value={rating}
            variant="filled"
          />
        </Grid>
        <Grid item justify="center">
          <Button onClick={rate} value={props.title} variant="outlined">Rate</Button>
        </Grid>
      </Grid>

    )
  }

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
          <TableCell align="right" >
            <Rater title={row.title} />
          </TableCell>
          <TableCell align="right">{row.rating}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <TableRow>
                  <TableCell style={{ verticalAlign: 'top' }} width="10%">Description:</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
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
      <Title href="/Movies">Movies</Title>
      <Tabs
        value={sortValue}
        onChange={handleSortChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
      >
        <Tab label="Highest Rated" />
        <Tab label="Newest" />
      </Tabs>
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
            <TableCell align="right"></TableCell>
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