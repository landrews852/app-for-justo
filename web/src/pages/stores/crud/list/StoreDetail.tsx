/* eslint-disable @typescript-eslint/indent */

import {useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, type BtnProps} from '../../../../components/buttons/Button';
import deleteStore from '../delete/deleteStore';
// import findItemByID from '../findOne/FindItemByID';
// import AddHistory from '../update/addHistory';
import type {GridColDef, GridRowsProp} from '@mui/x-data-grid';
import {DataGrid, GridValueGetterParams} from '@mui/x-data-grid';
import type {History, Store} from '../../../../constant/constant';
import FindStoreByID from '../findOne/FindStoreById';

const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID', width: 130, hide: true},
  {field: 'itemId', headerName: 'ID artículo', width: 130},
  {field: 'itemName', headerName: 'Nombre del artículo', width: 145},
  {field: 'date', headerName: 'Fecha ingreso', width: 1200},
];

export default function StoreDetail() {
  const navigate = useNavigate();
  const {_id} = useParams();
  const [problem, setProblem] = useState<string>('');
  const {handleDelete, error: deleteError} = deleteStore({_id});

  const storeData: Store = FindStoreByID(_id);

  console.log(storeData);

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

  const rows = storeData?.storeHistory?.length
    ? storeData?.storeHistory?.map((history: History) => ({
        id: history?._id,
        itemId: history?.item?._id,
        itemName: history?.item?.name,
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
        <Link to={'/bodegas/' + storeData._id + '/edit'} className="">
          <Button {...editBtnProps} />
        </Link>
        {_id ? <Button {...deleteBtnProps} /> : null}
      </div>
      <div className="flex flex-col items-center justify-center m-5 text-center">
        <div className="flex flex-row items-center">
          <h1 className="font-bold text-3xl text-sky-500 my-5 ml-4">
            {storeData?.name}
          </h1>
        </div>
        <div className="rounded-sm bg-gray-200 dark:bg-slate-800 p-6 w-[90%] text-left mb-12">
          <p className="mb-2">
            <b className="ml-[-4px]">ID bodega:</b> {storeData?._id}
          </p>
          <p>
            <b className="ml-[-4px]">Ubicación:</b> {storeData?.location}
          </p>
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
