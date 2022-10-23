import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newsList: [],
  detailNews: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.newsList = action.payload;
    },
    setDetailNews: (state, action) => {
      state.detailNews = action.payload;
    },
  },
});

export const { setNews, setDetailNews } = newsSlice.actions;

export const newsSelector = (state) => state.news;

export default newsSlice.reducer;
