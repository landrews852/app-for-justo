import {useQuery, gql} from '@apollo/client';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, type BtnProps} from '../../../../components/buttons/Button';
import type {GridColDef, GridApi, GridCellValue} from '@mui/x-data-grid';
import {DataGrid} from '@mui/x-data-grid';
import SearchBar from '../../../../components/searchbar/SearchBar';
import CreateItem from '../create/CreateItem';
import './styles.css';

type Items = {
  _id: string;
  name: string;
  model: string;
  serialNumber: string;
  createdBy: {username: string};
};

type ItemsData = {
  items: Items[];
};

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

export default function DataTable() {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  // const editBtnProps: BtnProps = {
  //   text: 'Editar',
  //   className: 'py-0',
  // };

  const columns: GridColDef[] = [
    {
      field: 'edit',
      headerName: '',
      sortable: false,
      filterable: false,
      align: 'center',
      width: 50,
      renderCell(params) {
        const onClick = (e) => {
          const {api} = params;
          const thisRow: Record<string, GridCellValue> = {};
          console.log(thisRow);

          api
            .getAllColumns()
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
          console.log(thisRow.id);

          navigate('/articulos/' + thisRow.id + '/edit');
        };

        return (
          <Button onClick={onClick} variant="edit" className="px-2 py-1" />
        );
      },
    },
    {
      field: 'detail',
      headerName: '',
      sortable: false,
      filterable: false,
      align: 'center',
      width: 50,
      renderCell(params) {
        const onClick = (e) => {
          // e.stopPropagation(); // don't select this row after clicking

          const {api} = params;
          const thisRow: Record<string, GridCellValue> = {};
          console.log(thisRow);

          api
            .getAllColumns()
            // .filter((c) => c.field !== '__check__' && Boolean(c))
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
          console.log(thisRow.id);

          navigate('/articulos/' + thisRow.id);
        };

        return (
          <Button onClick={onClick} variant="detail" className="px-2 py-1" />
        );
      },
    },
    {field: 'name', headerName: 'Nombre', width: 250},
    {field: 'model', headerName: 'Modelo', width: 250},
    {field: 'serialNumber', headerName: 'Número de serie', width: 250},
    {field: 'id', headerName: 'ID', width: 250},
  ];

  type ItemsQueryProps = {
    data?: ItemsData;
    loading: boolean;
    error?: any;
  };

  const {data, loading, error}: ItemsQueryProps = useQuery<ItemsData>(ITEMS);
  console.log('data', data);

  if (loading) {
    return (
      <p className="w-full text-center my-10 text-3xl font-bold">Loading...</p>
    );
  }

  if (error) {
    return <pre>{error.message}</pre>;
  }

  const onClickProps: BtnProps = {
    onClick: disabled
      ? () => {
          setDisabled(false);
        }
      : () => {
          setDisabled(true);
        },
    text: 'Nuevo Item',
    className: 'w-64 mb-8',
  };

  const rows = data?.items.map((item) => ({
    id: item._id,
    name: item.name,
    model: item.model,
    serialNumber: item.serialNumber,
  }));

  function refreshHandle() {
    window.location.reload();
  }

  return (
    <div className="m-6 items-center flex flex-col pb-4 max-w-full h-full">
      <SearchBar
        placeholder="Buscar artículos"
        className="self-end"
        url="articulos"
      />
      <div className="text-center">
        <h1 className="my-10">Items List</h1>
      </div>

      <Button {...onClickProps} />

      {disabled ? null : <CreateItem className="mb-16 w-64" />}

      <div className="gridTable">
        <Button variant="refresh" onClick={refreshHandle} />
        <DataGrid
          // loading={rows?.length === 0}
          rows={rows}
          columns={columns}
          page={page}
          pageSize={pageSize}
          pagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
          }}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
        />
      </div>
    </div>
  );
}