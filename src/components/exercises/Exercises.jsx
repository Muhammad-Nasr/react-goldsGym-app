import React from 'react'
import { Box, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import ExerciseCard from './ExerciseCard';
import Pagination from '@mui/material/Pagination';
import { fetchDataFromApi } from '../../utils/FetchDataFromApi';

const Exercises = ({exercises, setExercises, bodyPart}) => {

    
    // state current page
    const [currentPage, setCurrentPage] = useState(1)

    // pagination pages
    const exercisesPerPage = 9

    // Pagination
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

    

    // pagination function
    const handlePaginate = (e, value) => {
        setCurrentPage(value)
        window.scrollTo({ top: 1800, behavior: 'smooth' });
    }

    // handle exercises Category
    useEffect(() => {
        const fetchExercisesData = async () => {
            let exercisesData = []
            if (bodyPart === 'all'){            
                exercisesData = await fetchDataFromApi("https://exercisedb.p.rapidapi.com/exercises")
            }
            else{
                exercisesData = await fetchDataFromApi(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`)
            }
            setExercises(exercisesData)
        }
        fetchExercisesData()
    

    }, [bodyPart])

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">

        <Typography 
            variant="h4" fontWeight="bold" 
            sx={{ fontSize: { lg: '44px', xs: '30px' } }} 
            mb="46px">Showing Results
        </Typography>
        <Stack 
            direction="row" 
            sx={{ gap: { lg: '107px', xs: '50px' } }} 
            flexWrap="wrap" justifyContent="center"
            >
            {currentExercises.map((exercise, idx) => {
                return (
                     <Box key={idx}>
                        <ExerciseCard exercise={exercise} />
                    </Box>
                )
            })}
      </Stack>

      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {exercises.length > exercisesPerPage && (

            <Pagination
                color="standard"
                shape="rounded"
                defaultPage={1}
                count={Math.ceil(exercises.length / exercisesPerPage)}
                page={currentPage}
                onChange={handlePaginate}
                size="large" 
            />
        )}
      </Stack>

    </Box>
  )
}

export default Exercises