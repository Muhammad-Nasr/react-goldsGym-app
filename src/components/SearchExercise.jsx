import React from 'react'
import { useState, useEffect } from 'react'
import {Box, Button, Stack, TextField, Typography} from '@mui/material'
import { fetchDataFromApi} from '../utils/FetchDataFromApi'
import HorizontalScrollBar from './horizontalScrollBar/HorizontalScrollBar'



const SearchExercise = ({bodyPart, setBodyPart, setExercises}) => {

  // set state to search input
  const [searchTerm, setSearchTerm] = useState('')

  // set state for body parts and pass it to HorizontalScrollBar component
  const [bodyParts, setbodyParts] = useState([])
  

 /// fetch body parts data
 useEffect(() => {
  const fetchBodyParts = async () => {
    const bodyPartsData = await fetchDataFromApi("https://exercisedb.p.rapidapi.com/exercises/bodyPartList")
    setbodyParts(['all', ...bodyPartsData])
  }
  fetchBodyParts()
 }, [])



  // fetch exercise data search
  const handleSearch =  async () => {
    if (searchTerm){
      const exercisesData = await fetchDataFromApi("https://exercisedb.p.rapidapi.com/exercises")
      const  searchedExercises= exercisesData.filter(
        (item) =>  item.name.toLowerCase().includes(searchTerm)
               || item.target.toLowerCase().includes(searchTerm)
               || item.equipment.toLowerCase().includes(searchTerm)
               || item.bodyPart.toLowerCase().includes(searchTerm)
        );

      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

      setSearchTerm('');
      setExercises(searchedExercises);

      }
  };

  return (

    <Stack 
      alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography 
        fontWeight={700} 
        sx={{ fontSize: { lg: '44px', xs: '30px' } }} 
        mb="49px" textAlign="center">
        Awesome Exercises you <br /> Should Know
      </Typography>

      <Box position="relative" mb="72px">

        <TextField
          height="76px"
          sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '1170px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.currentTarget.value.toLocaleLowerCase())}}
          placeholder="Search Exercises"
          type="text"
           />

        <Button 
          className="search-btn" 
          sx={{ bgcolor: '#FF2625', color: '#fff', 
                textTransform: 'none', width: { lg: '173px', xs: '80px' }, 
                height: '56px', position: 'absolute', right: '0px', 
                fontSize: { lg: '20px', xs: '14px' } }} 
                onClick={handleSearch}>
          Search
        </Button>
      </Box>
      
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollBar 
          data={bodyParts} 
          bodyParts 
          bodyPart={bodyPart} 
          setBodyPart={setBodyPart}
          />
      </Box>
    </Stack>
  )
}

export default SearchExercise