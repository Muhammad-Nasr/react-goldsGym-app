const BaseUrl = "https://exercisedb.p.rapidapi.com/exercises";

const exercisesOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f17f447857msh9626a4f1d11ee50p14bfc9jsnb6a52bd0b3fb",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const fetchDataFromApi = async (url) => {
  const res = await fetch(url, exercisesOptions);
  const data = await res.json();

  return data;
};

const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f17f447857msh9626a4f1d11ee50p14bfc9jsnb6a52bd0b3fb",
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};

export const fetchVideosFromApi = async (url) => {
  const res = await fetch(url, youtubeOptions);
  const data = res.json();
  return data;
};
