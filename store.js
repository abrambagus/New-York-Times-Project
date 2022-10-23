import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlices';

const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export default store;
