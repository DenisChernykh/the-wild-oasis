import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
export function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        'Аккаунт успешно создан! Пожалуйста, подтвердите новый аккаунт по адресу электронной почты пользователя'
      );
    },
  });
  return { signup, isLoading };
}
