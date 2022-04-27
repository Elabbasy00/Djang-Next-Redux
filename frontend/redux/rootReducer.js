import { combineReducers } from '@reduxjs/toolkit';
import test from './test/tes';
import test1 from './test1/test1';

const reducers = combineReducers({
  test: test,
  test1:test1
});

export default reducers;
