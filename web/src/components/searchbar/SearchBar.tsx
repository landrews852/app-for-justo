/* eslint-disable new-cap */
import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {type Item} from '../../constant/constant';
import FindItemBySerialNumber from '../../pages/items/crud/findOne/FindItemBySerialNumber';
import {Button, type BtnProps} from '../buttons/Button';

type Props = {
  url: string;
  placeholder: string;
  className?: string;
  searchBy: string;
};

export default function SearchBar(props: Props) {
  const [input, setInput] = useState('');
  const [problem, setProblem] = useState('');
  const [navigate, setNavigate] = useState(false);

  // const searchBy: any = () => {
  //   if (props.searchBy === 'article') {
  //     const data: any = FindItemBySerialNumber(input);
  //   }

  //   return false;
  // };

  let data: any = Object;

  const onClickProps: BtnProps = {
    onClick(e) {
      e.preventDefault();
      if (props.searchBy === 'article') {
        data = FindItemBySerialNumber(input);
      }

      if (props.searchBy === 'employee') {
        // data = FindEmployeeByID(input);
        console.log('employee');
      }

      if (props.searchBy === 'store') {
        console.log('store');
        // data = FindEmployeeByID(input);
      }

      if (data) {
        setProblem('');
        setNavigate(true);
      }

      setNavigate(false);
      setProblem('No se encontró nada, intenta con el ID.');
    },
    text: 'Buscar',
  };

  return (
    <div className={props.className}>
      <form className="w-full self-right">
        <input
          type="text"
          placeholder={props.placeholder}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        {navigate ? (
          <Navigate to={`/${props.url}/${data._id}`} replace={true} />
        ) : null}
        <Button {...onClickProps} />
      </form>
      <p>{problem ? problem : null}</p>
    </div>
  );
}
