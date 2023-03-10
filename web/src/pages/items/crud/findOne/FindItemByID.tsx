/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/naming-convention */
import {useQuery, gql} from '@apollo/client';
import type {Params} from 'react-router-dom';
import type {Item} from '../../../../constant/constant';

const FIND_ONE_ITEM = gql`
  query item($input: FindItemInput!) {
    item(input: $input) {
      _id
      name
      model
      serialNumber
      itemHistory {
        _id
        item {
          _id
        }
        relationId
        relationName
        ownerType
        date
      }
    }
  }
`;

type ItemData = {
  item: Item;
};

export default function FindItemByID(_id: string | undefined) {
  type ItemsQueryProps = {
    data?: ItemData;
    loading: boolean;
    error?: any;
  };

  const {data, loading, error}: ItemsQueryProps = useQuery<
    ItemData,
    {input: Params}
  >(FIND_ONE_ITEM, {
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

  return data?.item;
}
