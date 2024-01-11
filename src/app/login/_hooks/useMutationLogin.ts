import { PATHNAME_API } from '@/services/paths';
import { TLoginForm, TResponseError, TResponseLogin, TUser } from '@/types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

const postLogin = async (payload: TLoginForm) => {
  return await axios
    .post(PATHNAME_API.LOGIN, payload)
    .then((res) => res.data.data)
    .catch((err) => err.response?.data);
};

export const useMutationLogin = () => {
  return useMutation<TResponseLogin, TResponseError, TLoginForm>({
    mutationFn: postLogin,
  });
};
