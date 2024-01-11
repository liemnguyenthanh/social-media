export type TLoginForm = {
  username: string;
  password: string;
};

export type TUser = {
  id: number;
  access_token: string;
  username: string;
};

export type TResponseLogin = {
  user: TUser;
  access_token: string;
  message?: string;
};
