/* eslint-disable @typescript-eslint/indent */
import {useQuery, gql} from '@apollo/client';
import {useState} from 'react';
import {Button, type BtnProps} from '../../../../components/buttons/Button';
import CreateEmployee from '../../../items/crud/create/CreateItem';

type Items = {
  id: number;
  name: string;
  model: string;
  serialNumber: number;
  createdBy: {username: string};
};

type ItemsData = {
  items: Items[];
};

const items = gql`
  {
    items {
      name
      model
      serialNumber
      createdBy {
        username
      }
    }
  }
`;

export default function EmployeeList() {
  const [disabled, setDisabled] = useState(true);

  type ItemsQueryProps = {
    data?: ItemsData;
    loading: boolean;
    error?: any;
  };
  const {data, loading, error}: ItemsQueryProps = useQuery<ItemsData>(items);

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
    text: 'Nuevo Item',
    className: 'w-64 m-auto mb-8',
  };

  return (
    <div className="m-3 items-center justify-center flex flex-col">
      <div className="text-center">
        <h1 className="my-10">Items List</h1>
      </div>
      <Button {...onClickProps} />

      {disabled ? null : <CreateEmployee className="m-4 mt-0" />}

      <div className="grid grid-cols-3">
        {data?.items.map((item: Items) => (
          <div className="border rounded m-2 p-3" key={item.name}>
            <p className="text-center my-2">
              <b className="text-sky-500 text-xl">{item.name} </b>
            </p>
            <p>
              <b className="text-sky-300">Modelo: </b>
              {item.model}
            </p>
            <p>
              <b className="text-sky-300">Serial: </b>
              {item.serialNumber}
            </p>
            <p>
              <b className="text-sky-300">Agregado por: </b>
              {item.createdBy.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
