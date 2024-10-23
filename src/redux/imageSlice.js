import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    selectedImage: null,
  },
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
  },
});

export const { setImages, setSelectedImage } = imageSlice.actions;
export default imageSlice.reducer;
