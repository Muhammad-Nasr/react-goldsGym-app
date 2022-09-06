import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {
  fetchDataFromApi,
  fetchVideosFromApi,
} from "../utils/FetchDataFromApi";
import { ExerciseData, ExerciseVideos, SimilarExercises } from "../components";

const ExerciseDetail = () => {
  const { id } = useParams();
  // state exercise detail and send to exercise data component
  const [exerciseData, setExerciseData] = useState({});

  // state exercise videos and send to exercise videos detail
  const [exerciseVideos, setExerciseVideos] = useState([]);

  // state similar exercises
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDetailData = await fetchDataFromApi(
        `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`
      );
      setExerciseData(exerciseDetailData);
      const exerciseVideosData = await fetchVideosFromApi(
        `https://youtube-search-and-download.p.rapidapi.com/search?query=${exerciseDetailData.name} exercise`
      );
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExercisesData = await fetchDataFromApi(
        `https://exercisedb.p.rapidapi.com/exercises/target/${exerciseDetailData.target}`
      );
      setTargetMuscleExercises(targetMuscleExercisesData);

      const equimentExercisesData = await fetchDataFromApi(
        `https://exercisedb.p.rapidapi.com/exercises/equipment/${exerciseDetailData.equipment}`
      );
      setEquipmentExercises(equimentExercisesData);
    };
    fetchExercisesData();
  }, [id]);
  console.log(exerciseVideos);
  return (
    <Box sx={{ mt: { lg: "96px", xs: "60px" } }}>
      <ExerciseData data={exerciseData} />
      <ExerciseVideos videos={exerciseVideos} name={exerciseData.name} />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
