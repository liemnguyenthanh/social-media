'use client';
import { Box, Button, Stack, TextField } from '@mui/material';
import React from 'react';
import { useLogin } from './_hooks/useLogin';

export default function Login() {
  const { form, onSubmit, disabledBtn, loading } = useLogin();
  const {
    register,
    formState: { errors },
  } = form;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onSubmit();
  };

  return (
    <Box height="100dvh" width={1} display="flex" alignItems="center" justifyContent="center">
      <Stack gap={2} width={400} component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder="Username"
          error={!!errors?.username}
          helperText={!!errors?.username && errors.username.message}
          {...register('username')}
        />

        <TextField
          fullWidth
          placeholder="Password"
          error={!!errors?.password}
          helperText={!!errors?.password && errors.password.message}
          {...register('password')}
        />

        <Button fullWidth variant="contained" type="submit" disabled={disabledBtn}>
          {loading ? 'loading' : 'Login'}
        </Button>
      </Stack>
    </Box>
  );
}
