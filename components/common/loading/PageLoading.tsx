'use client';
import { PropagateLoader } from 'react-spinners';

type Props = {};

const PageLoading = (props: Props) => {
  return <PropagateLoader color={'#7928CA'} loading={true} size={30} />;
};

export default PageLoading;
