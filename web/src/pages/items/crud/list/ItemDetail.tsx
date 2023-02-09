/* eslint-disable @typescript-eslint/indent */

import {useState} from 'react';
import {Link, Params, useNavigate, useParams} from 'react-router-dom';
import {Button, type BtnProps} from '../../../../components/buttons/Button';
import deleteItem from '../delete/deleteItem';
import findItemByID from '../findOne/FindItemByID';
import AddHistory from '../update/addHistory';
import type {GridColDef, GridRowsProp} from '@mui/x-data-grid';
import {DataGrid, GridValueGetterParams} from '@mui/x-data-grid';
import type {Item, ItemHistory} from '../../../../constant/constant';

const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID', width: 130},
  {field: 'relationId', headerName: 'ID Relación', width: 130},
  {field: 'relationName', headerName: 'Nombre Relación', width: 130},
  {field: 'ownerType', headerName: 'Relación', width: 90},
  {field: 'date', headerName: 'Fecha', width: 1200},
];

export default function ItemDetail() {
  const navigate = useNavigate();
  const {_id} = useParams();
  const [problem, setProblem] = useState<string>('');
  const {handleDelete, error: deleteError} = deleteItem({_id});

  const itemData: Item = findItemByID({_id});

  console.log(itemData);

  const editBtnProps: BtnProps = {
    variant: 'edit',
    className: 'px-[11px] py-[9.5px] m-1',
    fontSize: 'medium',
  };

  const deleteBtnProps: BtnProps = {
    async onClick(e) {
      e.preventDefault();
      if (_id) {
        console.log('ID deleted ->', _id);

        handleDelete();
        navigate('/articulos');
      }

      if (deleteError) {
        console.log(deleteError);
        setProblem('Hay un problema con la ID');
      }
    },
    text: ' ',
    variant: 'delete',
  };

  const rows = itemData?.itemHistory?.length
    ? itemData?.itemHistory?.map((history: ItemHistory) => ({
        id: history?.itemHistoryId,
        relationId: history?.relationId,
        relationName: history?.relationName,
        ownerType: history?.ownerType,
        date: history?.date,
      }))
    : false;

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
        <div className="rounded-sm bg-gray-200 dark:bg-slate-800 p-6 w-[90%] text-left">
          <p className="mb-2">
            <b className="ml-[-4px]">Modelo:</b> {itemData?.model}
          </p>
          <p>
            <b className="ml-[-4px]">Número de serie:</b>{' '}
            {itemData?.serialNumber}
          </p>
        </div>
        <div className="m-6">
          <AddHistory />
        </div>
        <div className="w-full h-[500px] mb-10">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            initialState={{
              sorting: {
                sortModel: [{field: 'date', sort: 'desc'}],
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
