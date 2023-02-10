import {useMutation, gql} from '@apollo/client';

const EMPLOYEES = gql`
  {
    employees {
      _id
      name
      email
      position
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($_id: ID!) {
    deleteEmployee(_id: $_id) {
      _id
    }
  }
`;

export default function deleteEmployee({_id}: Record<string, unknown>) {
  const [deleteEmployee, {error}] = useMutation(DELETE_EMPLOYEE, {
    variables: {_id},
    refetchQueries: [{query: EMPLOYEES}],
  });

  const handleDelete: () => void = async () => {
    try {
      await deleteEmployee();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return {handleDelete, error};
}
