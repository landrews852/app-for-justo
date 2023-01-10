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
import FindItemByID from '../findOne/FindItemByID';
// import updateItem from '../items/crud/update/UpdateItems';
import {useMutation, gql} from '@apollo/client';
import FindItemBySerialNumber from '../findOne/FindItemBySerialNumber';

const UPDATE_ITEM = gql`
  mutation updateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      name
      model
      serialNumber
      whereIsIt
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
      whereIsIt
      createdBy {
        username
      }
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deleteAuthor($input: DeleteItem!) {
    deleteAuthor(filter: $filter) {
      msg
      author {
        name
        dob
      }
    }
  }
`;

type ItemProps = {
  _id: string;
  name?: string;
  model?: string;
  serialNumber?: string;
  whereIsIt?: string;
};

type Item = ItemProps;
type UpdatedItem = ItemProps;

export default function ItemDetailEdit() {
  const navigate = useNavigate();
  const {_id} = useParams();

  const assetData: any = FindItemByID(_id);

  console.log(assetData);

  const [name, setName] = useState(assetData.name);
  const [model, setModel] = useState(assetData.model);
  const [serialNumber, setSerialNumber] = useState(assetData.serialNumber);
  const [whereIsIt, setWhereIsIt] = useState(assetData.setWhereIsIt);
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
        whereIsIt,
      },
    },
    refetchQueries: [{query: ITEMS}, 'Items'],
  });

  const found: any = FindItemBySerialNumber(serialNumber);

  const editBtnProps: BtnProps = {
    async onClick(e: Event) {
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

      if (name || model || serialNumber || whereIsIt) {
        setProblem('');
        console.log('update?', _id, name, model, serialNumber, whereIsIt);
        await updateItem();
      } else {
        setProblem('Se requiere llenar al menos un campo del formulario.');
      }
    },
    className: 'm-2 mt-8 font-bold',
    text: 'Guardar',
  };

  const deleteBtnProps: BtnProps = {
    async onClick(e: Event) {
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

      if (name || model || serialNumber || whereIsIt) {
        setProblem('');
        console.log('update?', _id, name, model, serialNumber, whereIsIt);
        await updateItem();
      } else {
        setProblem('Se requiere llenar al menos un campo del formulario.');
      }
    },
    variant: 'delete',
  };

  useEffect(() => {
    if (name || model || serialNumber || whereIsIt) {
      setProblem('');
    }
  }, [name, model, serialNumber, whereIsIt]);

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
        <p className="mt-4">
          ¿Dónde se encuentra?{' '}
          <i className="text-sm">{'(ID/correo de empleado o bodega)'}</i>
        </p>
        <input
          className="m-2"
          type="text"
          name="whereIsIt"
          autoComplete="off"
          placeholder={assetData?.whereIsIt}
          value={whereIsIt}
          onChange={(e) => {
            setWhereIsIt(e.target.value);
          }}
        />
        <div className="flex justify-center">
          <Button
            variant="goBack"
            className="m-2 mt-8 h-12"
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
