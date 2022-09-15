/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/indent */
import {useMutation, gql} from '@apollo/client';
import {useState} from 'react';
import {successMsgCss, errorMsgCss} from '../../../../constant/constant';
import type {BtnProps} from '../../../../components/buttons/Button';
import Button from '../../../../components/buttons/Button';
import {useParams} from 'react-router-dom';

const UPDATE_ITEM = gql`
  mutation updateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      name
      model
      serialNumber
    }
  }
`;

type ItemProps = {
  name: string;
  model: string;
  serialNumber: string;
};

type Item = ItemProps;
type UpdatedItem = ItemProps;

export default function UpdateItem() {
  const {_id} = useParams();
  const [name, setName] = useState(props.name);
  const [model, setModel] = useState(props.model);
  const [serialNumber, setSerialNumber] = useState(props.serialNumber);

  const [updateItem, {error, data}] = useMutation<
    {updateItem: Item},
    {input: UpdatedItem}
  >(UPDATE_ITEM, {
    variables: {
      input: {
        _id,
        name,
        model,
        serialNumber,
      },
    },
  });

  const onClickProps: BtnProps = {
    async onClick(e: Event) {
      e.preventDefault();
      console.log(data?.updateItem);
      if (name && model && serialNumber) {
        await updateItem();
      }
    },
    types: 'submit',
    text: 'Crear',
    className: 'm-auto',
  };

  return (
    <div className={props.className}>
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
        <Button {...onClickProps} />
      </form>
    </div>
  );
}
