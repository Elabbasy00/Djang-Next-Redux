import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { diff } from 'jsondiffpatch';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  data: [],
};
export const AskCallPost = createAsyncThunk(
  'ask-call',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const d = await response.json();
      return d;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const test = createSlice({
  name: 'test',
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
      const isdiff1 = stateDiff?.test?.[0]?.data;
      state.data = isdiff1 ? action.payload.test.data : state.data;
    },
    [AskCallPost.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { update } = test.actions;
export default test.reducer;
