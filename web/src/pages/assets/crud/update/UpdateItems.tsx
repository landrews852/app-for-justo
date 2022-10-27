/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/indent */
import {useMutation, gql} from '@apollo/client';
// import {useState} from 'react';
// import FindItemByID from '../findOne/FindItemByID';

const UPDATE_ITEM = gql`
  mutation updateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      name
      model
      serialNumber
    }
  }
`;

type ItemProps = {
  _id: string;
  name: string;
  model: string;
  serialNumber: string;
};

type Item = ItemProps;
type UpdatedItem = ItemProps;

// /////////////////////////////////////////////////////////////
// NO LOGRO TRAER LA INFO... ** HACER QUERY DE findById(_id)  //
// /////////////////////////////////////////////////////////////

export default async function updateItem({
  _id,
  name,
  model,
  serialNumber,
}: ItemProps) {
  // const [msg, setMsg] = useState('');
  // const itemData: any = FindItemByID(props._id);
  // const [name, setName] = useState(props.name);
  // const [model, setModel] = useState(props.model);
  // const [serialNumber, setSerialNumber] = useState(props.serialNumber);

  // const updateItemData = {
  //   _id: props._id,
  //   name: props.name,
  //   model: props.model,
  //   serialNumber: props.serialNumber,
  // };

  // const {_id, name, model, serialNumber} = props;

  const [updateItem, {error, data}] = useMutation<
    {updateItem: Item},
    {input: UpdatedItem}
  >(UPDATE_ITEM, {
    variables: {
      // input: updateItemData,
      input: {_id, name, model, serialNumber},
    },
  });

  // setName(props.name);
  // setModel(props.model);
  // setSerialNumber(props.serialNumber);

  if (error) {
    console.log(error);
    return 'El número de serie ya está en la base de datos';
  }

  if (name || model || serialNumber) {
    console.log('update?', _id, name, model, serialNumber);

    await updateItem();

    return data;
  }

  // else {
  //   setProblem('Por favor llena al menos un campo del formulario');
  // }

  //   const onClickProps: BtnProps = {
  //     async onClick(e: Event) {
  //       e.preventDefault();
  //       console.log(data?.updateItem);
  //       if (name || model || serialNumber) {
  //         await updateItem();
  //       }
  //     },
  //     types: 'submit',
  //     text: 'Crear',
  //     className: 'm-auto',
  //   };

  //   return (
  //     <div className={props.className}>
  //       <form className="flex flex-col">
  //         <input
  //           className="m-2 p-1 rounded"
  //           type="text"
  //           name="name"
  //           placeholder="Nombre"
  //           autoComplete="off"
  //           value={name}
  //           onChange={(e) => {
  //             setName(e.target.value);
  //           }}
  //         />
  //         <input
  //           className="m-2 p-1 rounded"
  //           type="text"
  //           name="model"
  //           placeholder="Modelo"
  //           autoComplete="off"
  //           value={model}
  //           onChange={(e) => {
  //             setModel(e.target.value);
  //           }}
  //         />
  //         <input
  //           className="m-2 p-1 rounded"
  //           type="text"
  //           name="serialNumber"
  //           placeholder="Numero de serie"
  //           autoComplete="off"
  //           value={serialNumber}
  //           onChange={(e) => {
  //             setSerialNumber(e.target.value);
  //           }}
  //         />
  //         <Button {...onClickProps} />
  //       </form>
  //     </div>
  //   );
}
