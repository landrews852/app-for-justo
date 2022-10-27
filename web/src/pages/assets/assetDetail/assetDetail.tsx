/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable new-cap */
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import type {BtnProps} from '../../../components/buttons/Button';
import Button from '../../../components/buttons/Button';
import {
  errorMsgCss,
  type Item,
  successMsgCss,
} from '../../../constant/constant';
import FindItemByID from '../crud/findOne/FindItemByID';
// import updateItem from '../items/crud/update/UpdateItems';
import {useMutation, gql} from '@apollo/client';
import {Types} from 'mongoose';

const UPDATE_ITEM = gql`
  mutation updateItem($_id: ID!, $input: UpdateItemInput!) {
    updateItem(_id: $_id, input: $input) {
      _id
    }
  }
`;
// name
// model
// serialNumber

type AssetProps = {
  _id?: string;
  name?: string;
  model?: string;
  serialNumber?: string;
};

type AssetDetail = {
  name?: string;
  model?: string;
  serialNumber?: string;
};

type variables = {
  name?: string;
  model?: string;
  serialNumber?: string;
};

interface Params {
  input: variables;
  _id: Types.ObjectId;
}

export default function AssetDetail() {
  const {_id} = useParams();
  // const id: any = _id;
  const assetData: any = FindItemByID(_id);
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [problem, setProblem] = useState('');

  // console.log(_id, assetData);
  // console.log(typeof assetData);

  // const filter = {
  //   id: _id,
  // };

  const [updateItem, {error, data}] = useMutation<
    {updateItem: AssetProps},
    {input: Params}
  >(UPDATE_ITEM, {
    variables: {
      input: {_id, name, model, serialNumber},
      // input: {
      //   filter: {id},
      //   set: {name, model, serialNumber},
      // },
    },
  });

  //   const updateData: ItemProps = {
  //     name: name,
  //     model: model,
  //     serialNumber: serialNumber,
  //   };

  const btnProps: BtnProps = {
    async onClick(e: Event) {
      e.preventDefault();
      if (error) {
        console.log(error);
        return;
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
    if (name ?? model ?? serialNumber) {
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
