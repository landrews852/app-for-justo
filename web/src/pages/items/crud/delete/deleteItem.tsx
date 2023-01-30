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

export default function DeleteItem({_id}) {
  const [deleteItem, {error}] = useMutation(DELETE_ITEM, {
    variables: {_id},
    refetchQueries: [{query: ITEMS}, 'Items'],
  });

  const handleDelete = async () => {
    try {
      await deleteItem();
    } catch (err) {
      console.error(err);
    }
  };

  return {handleDelete, error};
}
