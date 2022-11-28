/* eslint-disable new-cap */
import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {type Asset} from '../../constant/constant';
import FindItemBySerialNumber from '../../pages/assets/crud/findOne/FindItemBySerialNumber';
import Button, {type BtnProps} from '../buttons/Button';

type Props = {
  url: string;
  placeholder: string;
  className?: string;
};

export default function SearchBar(props: Props) {
  const [input, setInput] = useState('');
  const [problem, setProblem] = useState('');
  const [navigate, setNavigate] = useState(false);

  const item: any = FindItemBySerialNumber(input);

  const onClickProps: BtnProps = {
    onClick(e) {
      e.preventDefault();
      console.log(item);
      if (item.name) {
        setProblem('');
        setNavigate(true);
      } else {
        setNavigate(false);
        setProblem('No se ha encontrado nada :(');
      }
    },
    text: 'Buscar',
    className: 'm-2',
  };

  return (
    <div className={props.className}>
      <form>
        <input
          type="text"
          placeholder={props.placeholder}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        {navigate ? (
          <Navigate to={`/${props.url}/${item._id}`} replace={true} />
        ) : null}
        <Button {...onClickProps} />
      </form>
      <p>{problem ? problem : null}</p>
    </div>
  );
}
