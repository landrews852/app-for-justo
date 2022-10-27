/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/indent */

// Import {validate} from 'graphql';
import {gql, useMutation} from '@apollo/client';
import {useEffect, useState} from 'react';
import {
  successMsgCss,
  errorMsgCss,
  type Item,
} from '../../../../constant/constant';
import {Button, type BtnProps} from '../../../../components/buttons/Button';
import FindItemBySerialNumber from '../findOne/FindItemBySerialNumber';

const CREATE_ITEM = gql`
  mutation createItem($input: CreateItemInput!) {
    createItem(input: $input) {
      _id
      name
      model
      serialNumber
      createdBy {
        _id
      }
    }
  }
`;

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

type NewItem = Item;
type NewItemDetails = Item;
type AssetProps = {
  _id: string;
  name: string;
  model: string;
  serialNumber: string;
};

export default function CreateItem(props: any) {
  const [problem, setProblem] = useState('');
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [createdBy, setCreatedBy] = useState('');

  const [createItem, {error, data}] = useMutation<
    {createItem: NewItem},
    {input: NewItemDetails}
  >(CREATE_ITEM, {
    variables: {
      input: {
        name,
        model,
        serialNumber,
        createdBy,
      },
    },
    refetchQueries: [{query: ITEMS}, 'Items'],
  });

  const found: any = FindItemBySerialNumber(serialNumber);

  const onClickProps: BtnProps = {
    async onClick(e: Event) {
      e.preventDefault();
      console.log(serialNumber);

      if (name && model && serialNumber && createdBy) {
        if (found) {
          setProblem('El número de serie ya existe.');
        } else {
          setProblem('');
          console.log('create item', data?.createItem);
          await createItem();
        }
      } else {
        setProblem('Falta información');
      }
    },
    types: 'submit',
    text: 'Crear',
    className: 'm-auto',
  };

  useEffect(() => {
    if (!name || !model || !serialNumber || !createdBy) {
      setProblem('Por favor completa el formulario');
    } else setProblem('');
  }, [name, model, serialNumber, createdBy]);
  //    - name && model && serialNumber && createdBy._id

  const msg = () => {
    if (error) {
      <p className={errorMsgCss}>Oh no! {error}</p>;
    }

    if (problem) {
      <p className={errorMsgCss}>{problem}</p>;
    }
  };

  return (
    <div className={props.className}>
      {/* {error ? <p className={errorMsgCss}>Oh no! {error}</p> : null} */}
      {/* {problem ? <p className={errorMsgCss}>{problem}</p> : null} */}
      {msg}
      {data?.createItem ? <p className={successMsgCss}>Saved!</p> : null}
      <form className="flex flex-col">
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
          name="model"
          placeholder="Modelo"
          autoComplete="off"
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
          }}
        />
        <input
          className="m-2 p-1 rounded"
          type="text"
          name="serialNumber"
          placeholder="Numero de serie"
          autoComplete="off"
          value={serialNumber}
          onChange={(e) => {
            setSerialNumber(e.target.value);
          }}
        />
        <input
          className="m-2 p-1 rounded"
          type="text"
          name="createdBy"
          placeholder="Creado por"
          autoComplete="off"
          value={createdBy}
          onChange={(e) => {
            setCreatedBy(e.target.value);
          }}
        />
        <Button {...onClickProps} />
      </form>
    </div>
  );
}
