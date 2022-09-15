/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable arrow-parens */
// Import {validate} from 'graphql';
import {gql, useMutation} from '@apollo/client';
import {useState} from 'react';
import {
  successMsgCss,
  errorMsgCss,
  type EmployeeProps,
} from '../../../../constant/constant';
import {Button, type BtnProps} from '../../../../components/buttons/Button';

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

type NewItem = ItemProps;

type NewItemDetails = ItemProps;

export default function CreateItem(props: any) {
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
  });

  const onClickProps: BtnProps = {
    async onClick(e: Event) {
      e.preventDefault();
      console.log(data?.createItem);
      if (name && model && serialNumber && createdBy) {
        await createItem();
      }
    },
    types: 'submit',
    text: 'Crear',
    className: 'm-auto',
  };

  //    - name && model && serialNumber && createdBy._id

  return (
    <div className={props.className}>
      {error ? <p className={errorMsgCss}>Oh no! {error}</p> : null}
      {data?.createItem ? <p className={successMsgCss}>Saved!</p> : null}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(data?.createItem);

          return name && model && serialNumber && createdBy && createItem();
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
