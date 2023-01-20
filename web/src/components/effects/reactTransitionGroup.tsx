import {useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {BtnProps, Button} from '../buttons/Button';
import './transitionStyle.css';

export default function ReactTransitionGroup(props: any) {
  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const nodeRef = useRef(null);

  const onClickProps: BtnProps = {
    onClick: () => setShowMessage(true),
    text: props.text,
  };

  return (
    <>
      {showButton && <Button {...onClickProps} />}
      <CSSTransition
        in={showMessage}
        nodeRef={nodeRef}
        timeout={300}
        classNames="transition"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        <div
          ref={nodeRef}
          className="flex flex-col justify-center border rounded px-2 mb-4"
        >
          <Button
            text="Cerrar"
            onClick={() => setShowMessage(false)}
            className="m-2 my-6 focus:outline-none"
          />
          <div>{props.content}</div>
        </div>
      </CSSTransition>
    </>
  );
}
