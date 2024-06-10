import axios from "axios";
import { setPhotos, setIsFetching, setResetPage } from "./reducer.js";

export const getPhotos = (searchQuery = "all", page, per_page) => {
  if (searchQuery === "") {
    searchQuery = "all";
  }
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=35813093-cabe0c7219a04f4206a0ddb1b&q=${searchQuery}&image_type=photo&pretty=true&page=${page}&per_page=${per_page}`
      );

      dispatch(setPhotos(response.data));
    } catch (error) {
      console.error("Error fetching:", error);
      dispatch(setIsFetching(false));
    }
  };
};

export const resetPage = () => {
  return async (dispatch) => dispatch(setResetPage());
};
