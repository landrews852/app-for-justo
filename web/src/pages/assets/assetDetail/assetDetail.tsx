/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable new-cap */
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import type {BtnProps} from '../../../components/buttons/Button';
import Button from '../../../components/buttons/Button';
import {
  errorMsgCss,
  type Asset,
  successMsgCss,
} from '../../../constant/constant';
import FindItemByID from '../crud/findOne/FindItemByID';
// import updateItem from '../items/crud/update/UpdateItems';
import {useMutation, gql} from '@apollo/client';
import FindItemBySerialNumber from '../crud/findOne/FindItemBySerialNumber';

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
  _id: string;
  name?: string;
  model?: string;
  serialNumber?: string;
};

type Item = ItemProps;
type UpdatedItem = ItemProps;

export default function AssetDetail() {
  const {_id} = useParams();

  const assetData: any = FindItemByID(_id);

  console.log(assetData);

  const [name, setName] = useState(assetData.name);
  const [model, setModel] = useState(assetData.model);
  const [serialNumber, setSerialNumber] = useState(assetData.serialNumber);
  const [problem, setProblem] = useState('');

  // console.log(_id, assetData);
  // console.log(typeof assetData);

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

  const found: any = FindItemBySerialNumber(serialNumber);

  const btnProps: BtnProps = {
    async onClick(e: Event) {
      e.preventDefault();
      if (error) {
        console.log(error);
        return;
      }

      if (found) {
        setProblem('El número de serie ya existe.');
        return false;
      }

      if (name || model || serialNumber) {
        setProblem('');
        console.log('update?', _id, name, model, serialNumber);
        // console.log(updateData);
        await updateItem();
      } else {
        setProblem('Se requiere llenar al menos un campo del formulario.');
      }
    },
    className: 'mt-8 font-bold',
    text: 'Guardar',
  };

  useEffect(() => {
    if (name || model || serialNumber) {
      setProblem('');
    }
  }, [name, model, serialNumber]);

  return (
    <div className="w-full flex justify-center">
      <div className="m-12 flex flex-col text-center justify-center w-full max-w-xl">
        <p className="my-4 font-bold text-xl">{assetData?.name}</p>
        {problem ? <p className={errorMsgCss}>{problem}</p> : null}
        {data?.updateItem ? <p className={successMsgCss}>Saved!</p> : null}

        <p className="mt-4">Nombre</p>
        <input
          className="m-2"
          type="text"
          name="name"
          autoComplete="off"
          placeholder={assetData?.name}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <p className="mt-4">Modelo</p>
        <input
          className="m-2"
          type="text"
          name="model"
          autoComplete="off"
          placeholder={assetData?.model}
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
          }}
        />
        <p className="mt-4">Número de serie</p>
        <input
          className="m-2"
          type="text"
          name="serialNumber"
          autoComplete="off"
          placeholder={assetData?.serialNumber}
          value={serialNumber}
          onChange={(e) => {
            setSerialNumber(e.target.value);
          }}
        />

        <Button {...btnProps} />
      </div>
    </div>
  );
}
