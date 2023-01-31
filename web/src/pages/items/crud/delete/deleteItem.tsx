import {useMutation, gql} from '@apollo/client';

const ITEMS = gql`
  {
    items {
      _id
      name
      model
      serialNumber
      whereIsIt
      createdBy {
        username
      }
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deleteItem($_id: String!) {
    deleteItem(_id: $_id) {
      _id
    }
  }
`;

export default function deleteItem({_id}) {
  const [deleteItem, {error}] = useMutation(DELETE_ITEM, {
    variables: {_id},
    refetchQueries: [{query: ITEMS}, 'Items'],
  });

  const handleDelete: () => void = async () => {
    try {
      await deleteItem();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return {handleDelete, error};
}
