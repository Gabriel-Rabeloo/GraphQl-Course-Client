import { useState } from 'react';
import { Helmet } from 'react-helmet';

import { useMutation } from '@apollo/client';

import { AuthForm } from 'components/AuthForm';
import { GQL_LOGIN } from 'graphql/mutations/auth';
import { Loading } from 'components/Loading';
import { loginFormVar } from 'graphql/reactive-var/login-form';
import { authDataManager } from 'graphql/reactive-var/auth';

export const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  loginFormVar.use();

  const [login, { loading, error }] = useMutation(GQL_LOGIN, {
    onError() {},
    onCompleted(data) {
      const authData = {
        userName: loginFormVar.get().userName,
        userId: data.login.userId,
        isLoggedIn: true,
      };
      authDataManager.setVar(authData);
    },
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    const variables = {
      userName,
      password,
    };

    loginFormVar.set({ ...variables });

    await login({ variables });
  };

  if (loading) return <Loading loading={loading} />;
  // if (error) return <DefaultError error={error} />;

  return (
    <>
      <Helmet title="Login - GraphQL + Apollo-Client - Gabriel Rabelo" />

      <AuthForm
        handleLogin={handleLogin}
        formDisabled={false}
        formError={error?.message}
        setUserName={setUserName}
        setPassword={setPassword}
      />
    </>
  );
};
