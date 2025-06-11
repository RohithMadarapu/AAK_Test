import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ChartItem } from '../types/chart';

interface ChartState {
  data: ChartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ChartState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchChartData = createAsyncThunk(
  'chart/fetchChartData',
  async () => {
    const response = await axios.get('https://django-dev.aakscience.com/candidate_test/fronted');
    const rawData = response.data;

    const result: { date: string; value: number }[] = [];

    const yearObject = rawData[0];
    const yearKey = Object.keys(yearObject)[0];
    const monthsArray = yearObject[yearKey]; 

    for (const monthObj of monthsArray) {
      const monthKey = Object.keys(monthObj)[0]; 
      const dayArray = monthObj[monthKey];       

      for (const dayEntry of dayArray) {
        const rawDate = Object.keys(dayEntry)[0]; 
        const value = dayEntry[rawDate];
        const formattedDate = rawDate.split(',')[0].trim().replace(/\//g, '-'); 

        result.push({ date: formattedDate, value });
      }
    }

    console.log("Formatted Chart Data:", result);
    return result;
  }
);


const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChartData.fulfilled, (state, action: PayloadAction<ChartItem[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default chartSlice.reducer;
