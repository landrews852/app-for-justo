/* eslint-disable @typescript-eslint/indent */
import {useQuery, gql} from '@apollo/client';
import {useState} from 'react';
import {Button, type BtnProps} from '../../../../components/buttons/Button';
import CreateEmployee from '../../../employees/crud/create/CreateEmployee';

type Employees = {
  _id: string;
  name: string;
  email: string;
  position: string;
};

type EmployeesData = {
  employees: Employees[];
};

const EMPLOYEES = gql`
  {
    employees {
      name
      email
      position
    }
  }
`;

export default function EmployeeList() {
  const [disabled, setDisabled] = useState(true);

  type EmployeesQueryProps = {
    data?: EmployeesData;
    loading: boolean;
    error?: any;
  };
  const {data, loading, error}: EmployeesQueryProps =
    useQuery<EmployeesData>(EMPLOYEES);

  if (loading) {
    return (
      <p className="w-full text-center my-10 text-3xl font-bold">Loading...</p>
    );
  }

  if (error) {
    return <pre>{error.message}</pre>;
  }

  const onClickProps: BtnProps = {
    onClick: disabled
      ? () => {
          setDisabled(false);
        }
      : () => {
          setDisabled(true);
        },
    text: 'Nuevo Empleado',
    className: 'w-64 m-auto mb-8',
  };

  return (
    <div className="m-3 items-center justify-center flex flex-col">
      <div className="text-center">
        <h1 className="my-10">Employees List</h1>
      </div>
      <Button {...onClickProps} />

      {disabled ? null : <CreateEmployee className="m-4 mt-0" />}

      <div className="grid grid-cols-3">
        {data?.employees.map((employees: Employees) => (
          <div className="border rounded m-2 p-3" key={employees.name}>
            <p className="text-center my-2">
              <b className="text-sky-500 text-xl">{employees.name} </b>
            </p>
            <p>
              <b className="text-sky-300">Correo: </b>
              {employees.email}
            </p>
            <p>
              <b className="text-sky-300">Cargo: </b>
              {employees.position}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
