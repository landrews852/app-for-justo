type BtnProps = {
  onClick?: () => void;
  types?: string;
  text?: string;
  className?: string;
  href?: any;
};

const Button = ({onClick, types, text, className, href}: BtnProps) => (
  <button
    onClick={onClick}
    className={className}
    type={types ? types : 'default'}
  >
    {text}
  </button>
);

export default Button;
export {Button, type BtnProps};
