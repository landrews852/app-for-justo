import {useQuery, gql} from '@apollo/client';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, type BtnProps} from '../../../../components/buttons/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from '../../../../components/searchbar/SearchBar';
import CreateItem from '../create/CreateItem';

type Items = {
  _id: string;
  name: string;
  model: string;
  serialNumber: string;
  createdBy: {_id: string; username: string};
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

export default function ItemsTable() {
  const [disabled, setDisabled] = useState(true);

  type ItemsQueryProps = {
    data?: ItemsData;
    loading: boolean;
    error?: any;
  };

  const {data, loading, error}: ItemsQueryProps = useQuery<ItemsData>(ITEMS);

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

  return (
    <div className="m-3 items-center justify-center flex flex-col pb-4 max-w-full">
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

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <p className="text-sky-500 font-bold text-base">Nombre</p>
              </TableCell>
              <TableCell>
                <p className="text-sky-500 font-bold text-base">Modelo</p>
              </TableCell>
              <TableCell>
                <p className="text-sky-500 font-bold text-base">
                  Número de serie
                </p>
              </TableCell>
              <TableCell>
                <p className="text-sky-500 font-bold text-base">Creado por</p>
              </TableCell>
              <TableCell align="center">
                {/* <p className="text-sky-500 font-bold text-base">Editar</p> */}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.items.map((item: Items) => (
              <TableRow
                key={item.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  <p className="font-bold">{item.name}</p>
                </TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>{item.serialNumber}</TableCell>
                <TableCell>{item.createdBy.username}</TableCell>
                <TableCell>
                  <Link to={'/articulos/' + item._id} className="m-2 mt-4">
                    <Button {...editBtnProps} />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
