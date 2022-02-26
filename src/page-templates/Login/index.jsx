import { useState } from 'react';
import { Helmet } from 'react-helmet';

import { useMutation } from '@apollo/client';

import { AuthForm } from 'components/AuthForm';
import { GQL_LOGIN } from 'graphql/mutations/auth';
import { Loading } from 'components/Loading';

export const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(GQL_LOGIN, {
    onError() {},
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    const variables = {
      userName,
      password,
    };

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
        setUserName={setUserName}
        setPassword={setPassword}
        formError={error?.message}
        formData={{ password, userName }}
      />
    </>
  );
};
