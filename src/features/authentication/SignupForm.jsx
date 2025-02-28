import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignUp } from './useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { isLoading, signup } = useSignUp();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Имя" error={errors?.fullName?.message}>
        <Input
          type="text"
          disabled={isLoading}
          id="fullName"
          {...register('fullName', { required: 'Это обязательное поле' })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          disabled={isLoading}
          type="email"
          id="email"
          {...register('email', {
            required: 'Это обязательное поле',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Пожалуйста, введите верный email',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Пароль (минимум 6 символов)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isLoading}
          type="password"
          id="password"
          {...register('password', {
            required: 'Это поле обязательное',
            minLength: {
              value: 6,
              message: 'Пароль должен быть минимум 6 символов',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Повторите пароль"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'Это поле обязательное',
            validate: (value) =>
              value === getValues().password || 'Пароли не совпадают',
          })}
        />
      </FormRow>

      <FormRow>
        <Button disabled={isLoading} $variation="secondary" type="reset">
          Отмена
        </Button>
        <Button disabled={isLoading}>Создать нового пользователя</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
