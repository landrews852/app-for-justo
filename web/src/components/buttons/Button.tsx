import EditIcon from '@mui/icons-material/Edit';
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';

type BtnProps = {
  onClick?: (e: Event) => void;
  types?: any;
  text?: any;
  className?: string;
  variant?: string;
  fontSize: string;
  href?: any;
};

const Button = ({
  onClick,
  types,
  text,
  className,
  variant,
  fontSize,
  href,
}: BtnProps) => {
  if (variant === 'edit') {
    return (
      <button onClick={onClick} className={className}>
        <EditIcon fontSize={fontSize ? fontSize : 'small'} />
      </button>
    );
  }

  if (variant === 'detail') {
    return (
      <button onClick={onClick} className={className}>
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

  return (
    <button onClick={onClick} className={className} type={types}>
      {text}
    </button>
  );
};

export {Button, type BtnProps};
