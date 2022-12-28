/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable arrow-parens */
// Import {validate} from 'graphql';
import {gql, useMutation} from '@apollo/client';
import {useEffect, useState} from 'react';
import {
  successMsgCss,
  errorMsgCss,
  type Employee,
} from '../../../../constant/constant';
import {Button, type BtnProps} from '../../../../components/buttons/Button';

const CREATE_EMPLOYEE = gql`
  mutation createEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      name
      email
      position
    }
  }
`;

const EMPLOYEES = gql`
  {
    employees {
      name
      email
      position
    }
  }
`;

type NewEmployee = Employee;

type NewEmployeeDetails = Employee;

export default function CreateItem(props: any) {
  const [problem, setProblem] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');

  const [createEmployee, {error, data}] = useMutation<
    {createEmployee: NewEmployee},
    {input: NewEmployeeDetails}
  >(CREATE_EMPLOYEE, {
    variables: {
      input: {
        name,
        email,
        position,
      },
    },
    refetchQueries: [{query: EMPLOYEES}, 'Employees'],
  });

  // const found: any = FindEmployeeByEmail(email);

  const onClickProps: BtnProps = {
    async onClick(e: Event) {
      e.preventDefault();
      console.log(data?.createEmployee);
      if (name && email && position) {
        setProblem('');
        console.log('create employee', data?.createEmployee);
        await createEmployee();
        // window.location.reload();
      } else {
        setProblem('Falta información');
      }
    },
    types: 'submit',
    text: 'Crear',
    className: 'mx-auto mt-4 py-1 px-8',
  };

  useEffect(() => {
    if (!name || !email || !position) {
      setProblem('Por favor completa el formulario');
    } else {
      setProblem('');
    }
  }, [name, email, position]);

  return (
    <div className={props.className}>
      {error ? <p className={errorMsgCss}>Oh no! {error}</p> : null}
      {problem ? <p className={errorMsgCss}>{problem}</p> : null}
      {data?.createEmployee ? <p className={successMsgCss}>Saved!</p> : null}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(data?.createEmployee);

          return name && email && position && createEmployee();
        }}
        className="flex flex-col"
      >
        <input
          className="m-2 p-1 rounded"
          type="text"
          name="name"
          placeholder="Nombre"
          autoComplete="off"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="m-2 p-1 rounded"
          type="text"
          name="email"
          placeholder="Correo"
          autoComplete="off"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="m-2 p-1 rounded"
          type="text"
          name="position"
          placeholder="Cargo"
          autoComplete="off"
          value={position}
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <Button {...onClickProps} />
      </form>
    </div>
  );
}
