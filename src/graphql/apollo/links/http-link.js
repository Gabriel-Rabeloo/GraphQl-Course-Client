import { HttpLink } from '@apollo/client';

export const httpLink = new HttpLink({
  uri: 'https://gbr-graphql.herokuapp.com/',
  credentials: 'include',
});
