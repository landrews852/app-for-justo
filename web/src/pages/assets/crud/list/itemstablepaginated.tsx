import {useQuery, gql} from '@apollo/client';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, type BtnProps} from '../../../../components/buttons/Button';
import type {GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {DataGrid} from '@mui/x-data-grid';
import SearchBar from '../../../../components/searchbar/SearchBar';
import CreateItem from '../create/CreateItem';

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

const rows2 = [
  {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
  {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
  {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
  {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
  {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
  {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
  {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
  {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
  {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

export default function DataTable() {
  const [disabled, setDisabled] = useState(true);
  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 0},
    // {field: 'edit', headerName: 'Editar', width: 200},
    {field: 'name', headerName: 'Nombre', width: 130},
    {field: 'model', headerName: 'Modelo', width: 130},
    {field: 'serialNumber', headerName: 'Número de serie', width: 130},
    {
      field: 'edit',
      headerName: 'Edit',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (id) => (
        <Link to={'/assets/' + id} className="m-2 mt-4">
          <Button {...editBtnProps} />
        </Link>
      ),
    },
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
    className: 'w-64 m-auto mb-8',
  };

  const editBtnProps: BtnProps = {
    text: 'Editar',
    className: 'py-0',
  };

  const btnEdit = (id) => (
    <Link to={'/assets/' + id} className="m-2 mt-4">
      <Button {...editBtnProps} />
    </Link>
  );

  const rows = data?.items.map((item) => ({
    id: item._id,
    name: item.name,
    model: item.model,
    serialNumber: item.serialNumber,
    // edit() {
    //   return (
    //     <Link to={'/assets/' + id} className="m-2 mt-4">
    //       <Button {...editBtnProps} />
    //     </Link>
    //   );
    // },
    edit: item._id,
  }));

  return (
    <div className="m-3 items-center justify-center flex flex-col pb-4 max-w-full h-full">
      <SearchBar
        placeholder="Buscar activos"
        className="self-end"
        url="assets"
      />
      <div className="text-center">
        <h1 className="my-10">Items List</h1>
      </div>

      <Button {...onClickProps} />

      {disabled ? null : <CreateItem className="m-4 mt-0 w-64" />}
      <div style={{height: 400, width: '100%'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
