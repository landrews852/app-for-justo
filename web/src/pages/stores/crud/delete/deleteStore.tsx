import {useMutation, gql} from '@apollo/client';

const STORES = gql`
  {
    STORES {
      _id
      name
      location
    }
  }
`;

const DELETE_STORE = gql`
  mutation deleteStore($_id: ID!) {
    deleteStore(_id: $_id) {
      _id
    }
  }
`;

export default function deleteStore({_id}: Record<string, unknown>) {
  const [deleteStore, {error}] = useMutation(DELETE_STORE, {
    variables: {_id},
    refetchQueries: [{query: STORES}],
  });

  const handleDelete: () => void = async () => {
    try {
      await deleteStore();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return {handleDelete, error};
}
