import {useParams} from 'react-router-dom';
import FindItemByID from '../crud/findOne/FindItemByID';

export default function AssetDetail() {
  const {_id} = useParams();

  const assetData = FindItemByID(_id);

  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [problem, setProblem] = useState('');

  const btnProps: BtnProps = {
    async onClick(e: Event) {
      e.preventDefault();
      if (error) {
        console.log(error);
        return;
      }

      if (name || model || serialNumber) {
        setProblem('');
        console.log('update?', _id, name, model, serialNumber);
        // console.log(updateData);
        await updateItem();
      } else {
        setProblem('Se requiere llenar al menos un campo del formulario.');
      }
    },
    className: 'mt-8 font-bold',
    text: 'Guardar',
  };

  useEffect(() => {
    if (name || model || serialNumber) {
      setProblem('');
    }
  }, [name, model, serialNumber]);

  return (
    <div className="w-full flex justify-center">
      <div className="m-12 flex flex-col text-center justify-center w-full max-w-xl">
        <p className="my-4 font-bold text-xl">{assetData?.name}</p>
        {problem ? <p className={errorMsgCss}>{problem}</p> : null}
        {data?.updateItem ? <p className={successMsgCss}>Saved!</p> : null}

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

        <Button {...btnProps} />
      </div>
    </div>
  );
}
