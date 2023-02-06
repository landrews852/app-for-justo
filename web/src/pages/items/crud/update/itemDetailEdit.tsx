/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable new-cap */
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, type BtnProps} from '../../../../components/buttons/Button';
import {
  errorMsgCss,
  type Item,
  successMsgCss,
} from '../../../../constant/constant';
import findItemByID from '../findOne/FindItemByID';
import {useMutation, gql} from '@apollo/client';
import FindItemBySerialNumber from '../findOne/FindItemBySerialNumber';
import deleteItem from '../delete/deleteItem';

const UPDATE_ITEM = gql`
  mutation updateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      name
      model
      serialNumber
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
      itemHistory {
        itemHistoryId
        relationId
        ownerType
        date
      }
      createdBy {
        username
      }
    }
  }
`;

export default function ItemDetailEdit() {
  const navigate = useNavigate();
  const {_id} = useParams();

  const assetData: any = findItemByID(_id);

  console.log(assetData);

  const [name, setName] = useState<string>(assetData.name);
  const [model, setModel] = useState<string>(assetData.model);
  const [serialNumber, setSerialNumber] = useState<string>(
    assetData.serialNumber,
  );
  const [problem, setProblem] = useState<string>('');

  const {handleDelete, error: deleteError} = deleteItem({_id});

  // console.log(_id, assetData);
  // console.log(typeof assetData);

  const [updateItem, {error, data}] = useMutation<
    {updateItem: Item},
    {input: Item}
  >(UPDATE_ITEM, {
    variables: {
      input: {
        _id,
        name,
        model,
        serialNumber,
      },
    },
    refetchQueries: [{query: ITEMS}],
  });

  const found: any = FindItemBySerialNumber(serialNumber);

  // const whereIsItHandle = () => {
  //   const type = '';

  //   const itemHistory = {
  //     relationId: '',
  //     type: '',
  //     action: '',
  //     date: Date.now,
  //   };
  // };

  const editBtnProps: BtnProps = {
    async onClick(e) {
      e.preventDefault();
      if (error) {
        console.log(error);
        return;
      }

      if (found) {
        if (found.serialNumber === assetData.serialNumber) {
          setSerialNumber('');
        } else {
          setProblem('El número de serie ya existe.');
          return false;
        }
      }

      if (name || model || serialNumber) {
        setProblem('');
        console.log('update?', _id, name, model, serialNumber);
        await updateItem();
      } else {
        setProblem('Se requiere llenar al menos un campo del formulario.');
      }
    },
    // className: 'm-2 mt-8 font-bold',
    text: 'Guardar',
  };

  const deleteBtnProps: BtnProps = {
    async onClick(e) {
      e.preventDefault();
      if (_id) {
        console.log('ID deleted ->', _id);

        handleDelete();
      }

      if (deleteError) {
        console.log(deleteError);
        setProblem('Hay un problema con la ID');
      }
    },
    variant: 'delete',
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
        {data?.updateItem ? (
          <p className={successMsgCss}>
            <b>Articulo guardado!</b> <br />
            <span className="text-sm">
              {'(Recargar página para ver los cambios.)'}
            </span>
          </p>
        ) : null}

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
        {/* <p className="mt-4">
          ¿Dónde se encuentra?{' '}
          <i className="text-sm">{'(ID/correo de empleado o bodega)'}</i>
        </p>
        <input
          className="m-2"
          type="text"
          name="whereIsIt"
          autoComplete="on"
          placeholder="Ingrese el email de empleado o nombre de bodega."
          onChange={(e) => {
            setWhereIsIt(e.target.value);
          }}
        /> */}
        <div className="flex justify-center">
          <Button
            variant="goBack"
            className="m-2 mt-8 h-12 focus:outline-none"
            onClick={() => {
              navigate(-1);
            }}
          />
          <Button {...editBtnProps} />
          <Button {...deleteBtnProps} />
        </div>
      </div>
    </div>
  );
}
