/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/naming-convention */
import {useQuery, gql} from '@apollo/client';
import type {Employee} from '../../../../constant/constant';

const FIND_ONE_EMPLOYEE = gql`
  query employee($input: FindEmployeeInput!) {
    employee(input: $input) {
      _id
      name
      email
      position
      employeeHistory {
        _id
        item {
          _id
          name
          serialNumber
        }
        relationId
        relationName
        ownerType
        date
      }
    }
  }
`;

type Email = {email?: string};
type EmployeeData = {
  employee: Employee;
};

export default function FindEmployeeByEmail(email: string) {
  type ItemsQueryProps = {
    data?: EmployeeData;
    loading: boolean;
    error?: any;
  };

  const {data, loading, error}: ItemsQueryProps = useQuery<
    EmployeeData,
    {input: Email}
  >(FIND_ONE_EMPLOYEE, {
    variables: {
      input: {
        email,
      },
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

  return data?.employee;
}
