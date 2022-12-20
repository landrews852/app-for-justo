/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/indent */
import {useQuery, gql} from '@apollo/client';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import type {Asset} from '../../../../constant/constant';
import {Button, type BtnProps} from '../../../../components/buttons/Button';
import CreateItem from '../create/CreateItem';
import SearchBar from '../../../../components/searchbar/SearchBar';

type Items = {
  _id: string;
  name: string;
  model: string;
  serialNumber: string;
  createdBy: {_id: string; username: string};
};

type ItemsData = {
  items: Items[];
};

const ITEMS = gql`
  {
    items {
      _id
      name
      model
      serialNumber
      createdBy {
        username
      }
    }
  }
`;

export default function ItemsList() {
  const [disabled, setDisabled] = useState(true);

  type ItemsQueryProps = {
    data?: ItemsData;
    loading: boolean;
    error?: any;
  };

  const {data, loading, error}: ItemsQueryProps = useQuery<ItemsData>(ITEMS);

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

  const editBtnProps: BtnProps = {
    text: 'Editar',
    className: 'py-0',
  };

  return (
    <div className="m-3 items-center justify-center flex flex-col">
      <SearchBar
        placeholder="Buscar activos"
        className="self-end"
        url="assets"
      />

      <div className="text-center">
        <h1 className="my-10">Items List</h1>
      </div>

      <Button {...onClickProps} />

      {disabled ? null : <CreateItem className="m-4 mt-0 w-64" />}

      <div className="grid grid-cols-3">
        {data?.items.map((item: Items) => (
          <>
            <div
              className="flex flex-col justify-between border rounded m-2 p-3"
              key={item._id}
            >
              <p className="text-center my-2">
                <b className="text-sky-500 text-xl">{item.name} </b>
              </p>
              <p>
                <b className="text-sky-300">Modelo: </b>
                {item.model}
              </p>
              <p>
                <b className="text-sky-300">Número de serie: </b>
                {item.serialNumber}
              </p>
              <p>
                <b className="text-sky-300">Agregado por: </b>
                {item.createdBy.username}
              </p>
              <div className="flex justify-center">
                <Link to={'/assets/' + item._id} className="m-2 mt-4">
                  <Button {...editBtnProps} />
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}