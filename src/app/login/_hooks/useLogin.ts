import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useMutationLogin } from './useMutationLogin';
import { useEffect } from 'react';
import { TLoginForm } from '@/types';
import { useSnackbar } from 'notistack';
import { saveTokenToLocalStorage } from '@/utils/auth';
import { sleep } from '@/utils/helper';

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

  const onToastError = (message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  useEffect(() => {
    const handleData = async () => {
      if (!data) return;
      const { access_token, message } = data;

      if (message) {
        return onToastError(message);
      }

      if (access_token) {
        saveTokenToLocalStorage(access_token);
        await sleep(1000);
        window.location.reload();
      }
    };
    handleData();
  }, [data, isSuccess]);

  useEffect(() => {
    const messageError = error?.message;
    if (messageError) onToastError(messageError);
  }, [error]);

  return {
    form,
    onSubmit,
    loading: false,
    disabledBtn,
  };
};
