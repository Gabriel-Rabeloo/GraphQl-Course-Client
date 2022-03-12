import { makeVar, useReactiveVar } from '@apollo/client';

const initialValue = {
  userName: '',
  password: '',
};

const loginFormVarFn = makeVar(initialValue);

const useLoginFormVar = () => {
  return useReactiveVar(loginFormVarFn);
};

export const loginFormVar = {
  set: (p) => loginFormVarFn(p),
  get: () => loginFormVarFn(),
  reset: () => loginFormVarFn(initialValue),
  use: useLoginFormVar,
};
