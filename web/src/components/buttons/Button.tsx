import EditIcon from '@mui/icons-material/Edit';
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type {MouseEventHandler} from 'react';

type BtnProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  types?: 'button' | 'submit' | 'reset' | undefined;
  text?: any;
  className?: string;
  variant?: string;
  fontSize?: 'small' | 'medium' | 'inherit' | 'large' | undefined;
  href?: any;
};

const Button: any = ({
  onClick,
  types,
  text,
  className,
  variant,
  fontSize,
  href,
}: BtnProps) => {
  if (!variant) {
    const style = () => {
      if (className) {
        return className;
      }

      return 'm-2 mt-8 focus:outline-none';
    };

    return (
      <button onClick={onClick} className={style()} type={types}>
        {text}
      </button>
    );
  }

  if (variant === 'edit') {
    const style = () => {
      if (className) {
        return className;
      }

      return 'px-2 py-1 focus:outline-none';
    };

    return (
      <button onClick={onClick} className={style()}>
        <EditIcon fontSize={fontSize ? fontSize : 'small'} />
      </button>
    );
  }

  if (variant === 'detail') {
    const style = () => {
      if (className) {
        return className;
      }

      return 'px-2 py-1 focus:outline-none';
    };

    return (
      <button onClick={onClick} className={style()}>
        <FileOpenRoundedIcon fontSize={fontSize ? fontSize : 'small'} />
      </button>
    );
  }

  if (variant === 'refresh') {
    return (
      <button
        onClick={onClick}
        className="border-0 active:text-sky-600 focus:outline-none bg-transparent p-1 pr-2"
      >
        <SyncRoundedIcon fontSize={fontSize ? fontSize : 'medium'} /> Recargar
      </button>
    );
  }

  if (variant === 'goBack') {
    return (
      <button onClick={onClick} className={className}>
        <KeyboardBackspaceRoundedIcon
          fontSize={fontSize ? fontSize : 'medium'}
        />
      </button>
    );
  }

  if (variant === 'delete') {
    const style = () => {
      if (className) {
        return className;
      }

      return 'm-2 mt-8 font-bold hover:border-red-500 hover:text-red-500 active:border-red-600 active:text-red-600 focus:outline-none';
    };

    return (
      <button onClick={onClick} className={style()}>
        <DeleteForeverIcon fontSize={fontSize ? fontSize : 'medium'} />{' '}
        {text ? text : 'Eliminar'}
      </button>
    );
  }

  // Error('no existe la variante');
  console.log('no existe la variante');
};

export {Button, type BtnProps};
