/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/indent */

import {gql, useMutation} from '@apollo/client';
import {useEffect, useState} from 'react';
import {
  successMsgCss,
  errorMsgCss,
  type Store,
} from '../../../../constant/constant';
import {Button, type BtnProps} from '../../../../components/buttons/Button';
// import FindItemBySerialNumber from '../findOne/FindItemBySerialNumber';

const CREATE_STORE = gql`
  mutation createStore($input: CreateStoreInput!) {
    createStore(input: $input) {
      _id
      name
      location
    }
  }
`;

const STORES = gql`
  {
    stores {
      _id
      name
      location
    }
  }
`;

type NewStore = Store;
type NewStoreDetails = Store;

export default function CreateStore(props: any) {
  const [problem, setProblem] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const [createStore, {error, data}] = useMutation<
    {createStore: NewStore},
    {input: NewStoreDetails}
  >(CREATE_STORE, {
    variables: {
      input: {
        name,
        location,
      },
    },
    refetchQueries: [{query: STORES}, 'Stores'],
  });

  //   const found: any = FindItemBySerialNumber(serialNumber);

  const onClickProps: BtnProps = {
    async onClick(e: Event) {
      e.preventDefault();

      if (name && location) {
        // if (found) {
        //   setProblem('El número de serie ya existe.');
        // } else {
        setProblem('');
        console.log('create store', data?.createStore);
        await createStore();
        // window.location.reload();
        // }
      } else {
        setProblem('Falta información');
      }
    },
    types: 'submit',
    text: 'Crear',
    className: 'mx-auto mt-4 py-1 px-8',
  };

  useEffect(() => {
    if (!name || !location) {
      setProblem('Por favor completa el formulario');
    } else {
      setProblem('');
    }
  }, [name, location]);

  // const msg = () => {
  //   if (error) {
  //     <p className={errorMsgCss}>Oh no! {error}</p>;
  //   }

  //   if (problem) {
  //     <p className={errorMsgCss}>{problem}</p>;
  //   }
  // };

  return (
    <div className={props.className}>
      {error ? <p className={errorMsgCss}>Oh no! {error}</p> : null}
      {problem ? <p className={errorMsgCss}>{problem}</p> : null}
      {/* {msg} */}
      {data?.createStore ? <p className={successMsgCss}>Saved!</p> : null}
      <form className="flex flex-col">
        <div className="flex">
          <span className="self-center">*</span>
          <input
            className="m-2 p-1 rounded w-full"
            type="text"
            name="name"
            placeholder="Nombre"
            autoComplete="off"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex">
          <span className="self-center">*</span>
          <input
            className="m-2 p-1 rounded w-full"
            type="text"
            name="location"
            placeholder="Ubicación"
            autoComplete="off"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <Button {...onClickProps} />
      </form>
    </div>
  );
}
