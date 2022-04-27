import React, { useEffect } from 'react';
import { AskCallPost } from '../../redux/test/tes';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { wrapper } from '../../redux/store';
import { selectAllData } from '../../redux/test1/test1';


function Test({ pageProps }) {
  const { data } = useSelector((state) => state.test);
  const  data1 = useSelector(selectAllData);

  return (
    <div>
      <h1>TEST PAGE</h1>
      <Link href="/">
        <a>home</a>
      </Link>
      {data && data.map((name) => <h1>{name.name}</h1>)}

      {data1.length > 0 ? <h1>Data is Here</h1> : <h1>Not here</h1>}
    </div>
  );
}
export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    await store.dispatch(AskCallPost('hi'));
    return {
      props: {},
    };
  }
);
// Test.getInitialProps = wrapper.getInitialPageProps(
//   ({ dispatch }) =>
//     async () => {
//       await dispatch(AskCallPost('hi'));
//       return {
//         props: {},
//       };
//     }
// );
export default Test;
