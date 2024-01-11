import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useMutationLogin } from './useMutationLogin';
import { useEffect } from 'react';
import { TLoginForm } from '@/types';
import { useSnackbar } from 'notistack';

const schema: yup.ObjectSchema<TLoginForm> = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const useLogin = () => {
  const { isLoading, isSuccess, data, error, mutate } = useMutationLogin();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<TLoginForm>({
    resolver: yupResolver(schema),
  });
  const {
    formState: { isDirty, isValid },
  } = form;
  const disabledBtn = !isDirty || isLoading || !isValid;

  const onSubmit = async () => {
    form.handleSubmit(async (data) => {
      mutate(data);
    })();
  };

  useEffect(() => {
    if (!data) return;
    const { access_token, message } = data;

    if (access_token) {
      enqueueSnackbar(access_token, { variant: 'success' });
      return;
    }
    if (message) {
      enqueueSnackbar(message, { variant: 'error' });
      return;
    }
  }, [data, isSuccess]);

  useEffect(() => {
    const messageError = error?.message;
    if (messageError) enqueueSnackbar(messageError, { variant: 'error' });
  }, [error]);

  return {
    form,
    onSubmit,
    loading: false,
    disabledBtn,
  };
};
