/* eslint-disable @typescript-eslint/indent */
import {useState} from 'react';
import {useQuery, gql} from '@apollo/client';
import Button, {type BtnProps} from '../../../../components/buttons/Button';
import CreateItem from '../../../assets/crud/create/CreateItem';
import type {Item, User} from '../../../../constant/constant';

const USERS = gql`
  {
    users {
      _id
      username
      email
      itemsCreated {
        name
        serialNumber
      }
    }
  }
`;

export default function UsersList() {
  const [disabled, setDisabled] = useState(true);

  type Users = {
    users: [User];
  };

  type UsersQuery = {
    data?: Users;
    loading: boolean;
    error?: any;
  };

  const {data, loading, error}: UsersQuery = useQuery(USERS);

  console.log(typeof data);
  console.log(data);

  if (loading) {
    return <p>Loading...;</p>;
  }

  if (error) {
    return <pre>{error.message}</pre>;
  }

  // const createItem = () => {
  //   console.log('asd');
  // };

  const onClickProps: BtnProps = {
    onClick: disabled
      ? () => {
          setDisabled(false);
        }
      : () => {
          setDisabled(true);
        },
    text: 'Nuevo Usuario',
    className: 'w-64 m-auto mb-8',
  };

  return (
    <div className="m-3 items-center justify-center flex flex-col">
      <div className="text-center">
        <h1 className="my-10">Users List</h1>
      </div>
      <Button {...onClickProps} />

      {disabled ? null : <CreateItem className="m-4 mt-0" />}

      <div className="grid grid-cols-3">
        {data?.users.map((user: User) => (
          <>
            <div className="border rounded m-2 p-3">
              <p className="text-center my-2">
                <b className="text-sky-500 text-xl">{user.username} </b>
              </p>
              <p>
                <b className="text-sky-300">ID: </b>
                {user._id}
              </p>
              <p>
                <b className="text-sky-300">Username: </b>
                {user.username}
              </p>
              <p>
                <b className="text-sky-300">Email: </b>
                {user.email}
              </p>
              <p>
                <b className="text-sky-300">Items creados: </b>
              </p>
              {user.itemsCreated?.map((item: Item) => (
                <p key={item._id}> {item.name + ` (${item.serialNumber})`}</p>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
