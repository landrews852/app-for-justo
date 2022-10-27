type BtnProps = {
  onClick?: (e: any) => void;
  types?: any;
  text?: string;
  className?: string;
  href?: any;
};

const Button = ({onClick, types, text, className, href}: BtnProps) => (
  <button onClick={onClick} className={className} type={types}>
    {text}
  </button>
);

export default Button;
export {Button, type BtnProps};
