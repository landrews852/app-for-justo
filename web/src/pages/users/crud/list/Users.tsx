import {useState} from 'react';
import {useQuery, gql} from '@apollo/client';
import Button from '../../../../components/buttons/Button';

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
  const {data, loading, error} = useQuery(USERS);
  const [disabled, setDisabled] = useState(true);

  if (loading) return <p>Loading...;</p>;
  if (error) return <pre>{error.message}</pre>;

  const createItem = () => {
    console.log('asd');
  };

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
        {data?.users.map((user: any) => (
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
              {user.itemsCreated.map((item: any) => (
                <p key={item._id}> {item.name + ` (${item.serialNumber})`}</p>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
