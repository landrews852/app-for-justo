import {useQuery, gql} from '@apollo/client';
import {useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, type BtnProps} from '../../../../components/buttons/Button';
import deleteItem from '../delete/deleteItem';
import FindItemByID from '../findOne/FindItemByID';

type ItemHistory = {
  relationId: string;
  ownerType: string;
  date?: any;
};

type Item = {
  _id: string;
  name: string;
  model: string;
  serialNumber: string;
  createdBy: {username: string};
  itemHistory: ItemHistory[];
  //   itemHistory: {whereId: string; enter: string; out: string};
};

export default function ItemDetail() {
  const navigate = useNavigate();
  const {_id} = useParams();

  const {handleDelete, error: deleteError} = deleteItem({_id});

  const itemData: Item = FindItemByID(_id);

  console.log(itemData);

  const editBtnProps: BtnProps = {
    variant: 'edit',
    className: 'px-[11px] py-[9.5px] m-1',
    fontSize: 'medium',
  };

  console.log(itemData);

  const deleteBtnProps: BtnProps = {
    async onClick(e: Event) {
      e.preventDefault();
      if (_id) {
        console.log('ID deleted ->', _id);

        await handleDelete(_id);
        navigate('/articulos');
      }

      if (deleteError) {
        console.log(deleteError);
      } else {
        setProblem('Hay un problema con la ID');
      }
    },
    text: ' ',
    variant: 'delete',
  };

  return (
    <>
      <div className="m-4">
        <Button
          variant="goBack"
          fontSize="small"
          className="pb-[10.5px]"
          onClick={() => {
            navigate(-1);
          }}
        />
        <Link to={'/articulos/' + itemData._id + '/edit'} className="">
          <Button {...editBtnProps} />
        </Link>
        {_id ? <Button {...deleteBtnProps} /> : null}
      </div>
      <div className="flex flex-col items-center justify-center m-5 text-center">
        <div className="flex flex-row items-center">
          <h1 className="font-bold text-3xl text-sky-500 my-5 ml-4">
            {itemData?.name}
          </h1>
        </div>
        <p className="">Modelo: {itemData?.model}</p>
        <p>Número serial: {itemData?.serialNumber}</p>
        <div className="">
          {itemData?.itemHistory?.length ? (
            itemData?.itemHistory?.map((history) => (
              <>
                <div>
                  <p>{history?.relationId}</p>
                </div>
              </>
            ))
          ) : (
            <p className="my-2 text-xl italic">
              ( Aún no existe un historial )
            </p>
          )}
        </div>
      </div>
    </>
  );
}
