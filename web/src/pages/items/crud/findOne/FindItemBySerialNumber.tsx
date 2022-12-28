/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/naming-convention */
import {useQuery, gql} from '@apollo/client';
import type {Item} from '../../../../constant/constant';

const FIND_ONE_ITEM = gql`
  query item($input: FindItemInput!) {
    item(input: $input) {
      _id
      name
      model
      serialNumber
    }
  }
`;

type ID = {serialNumber: string};
type ItemData = {
  item: Item;
};

export default function FindItemBySerialNumber(props: string) {
  type ItemsQueryProps = {
    data?: ItemData;
    loading: boolean;
    error?: any;
  };

  const {data, loading, error}: ItemsQueryProps = useQuery<
    ItemData,
    {input: ID}
  >(FIND_ONE_ITEM, {
    variables: {
      input: {
        serialNumber: props,
      },
    },
  });

  // if (loading) {
  //   return (
  //     <p className="w-full text-center my-10 text-3xl font-bold">Loading...</p>
  //   );
  // }

  // if (error) {
  //   return <pre>{error.message}</pre>;
  // }
  if (data) {
    return data?.item;
  }

  return false;

  //   Return (
  //     <div className="container">
  //       <p>{data?.item.name}</p>
  //       <p>{data?.item.model}</p>
  //       <p>{data?.item.serialNumber}</p>
  //     </div>
  //   );
}
