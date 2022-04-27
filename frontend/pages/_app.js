import React from 'react';

import { wrapper } from '../redux/store';

const MyApp = ({ Component, ...rest }) => {
  return <Component {...rest} />;
};

export default wrapper.withRedux(MyApp);
