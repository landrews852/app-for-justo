import {Button} from '../../../components/buttons/Button';

const Account = () => {
  return (
    <div>
      <h1>Tu cuenta</h1>
      <p>Correo del usuario:</p>

      <Button variant="delete" text="Desconectarse" />
    </div>
  );
};

export default Account;
