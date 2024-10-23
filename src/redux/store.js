import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './imageSlice'; // Assuming your image-related logic is in 'imageSlice'

const store = configureStore({
  reducer: {
    images: imageReducer,
  },
});

export default store;
