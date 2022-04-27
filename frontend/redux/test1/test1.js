import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { diff } from 'jsondiffpatch';
import { HYDRATE } from 'next-redux-wrapper';

export const TEST1 = createAsyncThunk(
  'ask',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const d = await response.json();
      return d;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const DataAdpater = createEntityAdapter();


const initialState = DataAdpater.getInitialState({
  data: [],
  loading: 'idle',
  error: ""
});

const testSlice = createSlice({
  name: 'test1',
  initialState,
  reducers: {
    update: {
      reducer: (state, { payload }) => {
        return { ...state, data: payload };
      },
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      const stateDiff = diff(state, action.payload);
      console.log(stateDiff)
      const isdiff1 = stateDiff?.test1?.[0]?.entities;
      const isdiff2 = stateDiff?.test1?.[0]?.loading;

      isdiff1 ? DataAdpater.upsertMany(state, action.payload.test1.entities) : DataAdpater.updateMany(state, state)
      state.loading = isdiff2 ? action.payload.test1.loading : state.loading;

   
    },
    [TEST1.pending]: (state, action) => {
      state.loading = 'loading';
    },
    [TEST1.fulfilled]: (state, action) => {
      state.loading = 'success';
      DataAdpater.addMany(state, action)
      state.data = action.payload;
    },
    [TEST1.rejected]: (state, action) => {
      state.loading = 'fail';
      state.error = action.payload;
    },
  },
});

export default testSlice.reducer;

export const {
  selectAll: selectAllData
} = DataAdpater.getSelectors((state) => state.test1)