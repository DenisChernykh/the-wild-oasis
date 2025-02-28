import Heading from '../ui/Heading';
import SingupForm from '../features/authentication/SignupForm';

function NewUsers() {
  return (
    <>
      <Heading as="h1">Создать нового пользователя</Heading>
      <SingupForm />
    </>
  );
}

export default NewUsers;
