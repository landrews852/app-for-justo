/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/naming-convention */
import {useQuery, gql} from '@apollo/client';
import type {Params} from 'react-router-dom';
import type {Store} from '../../../../constant/constant';

const FIND_ONE_STORE = gql`
  query store($input: FindStoreInput!) {
    store(input: $input) {
      _id
      name
      location
      storeHistory {
        _id
        item {
          _id
          name
        }
        relationId
        relationName
        ownerType
        date
      }
    }
  }
`;

type StoreData = {
  store: Store;
};

export default function FindStoreByID(_id: string | undefined) {
  type StoreQueryProps = {
    data?: StoreData;
    loading: boolean;
    error?: any;
  };

  const {data, loading, error}: StoreQueryProps = useQuery<
    StoreData,
    {input: Params}
  >(FIND_ONE_STORE, {
    variables: {
      input: {_id},
    },
  });

  if (loading) {
    return (
      <p className="w-full text-center my-10 text-3xl font-bold">Loading...</p>
    );
  }

  if (error) {
    return <pre>{error.message}</pre>;
  }

  return data?.store;
}
