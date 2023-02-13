/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/naming-convention */
import {useQuery, gql} from '@apollo/client';
import type {Params} from 'react-router-dom';
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

type EmployeeData = {
  employee: Employee;
};

export default function FindEmployeeByID(_id: string | undefined) {
  type EmployeeQueryProps = {
    data?: EmployeeData;
    loading: boolean;
    error?: any;
  };

  const {data, loading, error}: EmployeeQueryProps = useQuery<
    EmployeeData,
    {input: Params}
  >(FIND_ONE_EMPLOYEE, {
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

  return data?.employee;
}
