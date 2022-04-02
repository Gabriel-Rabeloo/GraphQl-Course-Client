import { makeVar, useReactiveVar } from '@apollo/client';

const authVarKey = '__auth_data__';

const initialValue = {
  userName: '',
  userId: '',
  isLoggedIn: false,
};

const authVar = makeVar({ ...initialValue });

const setVar = ({ userName = '', userId = '', isLoggedIn = false }) => {
  const authData = { userName, userId, isLoggedIn };
  localStorage.setItem(authVarKey, JSON.stringify(authData));
  authVar(authData);
};

const getVar = () => {
  return authVar();
};

const resetVar = () => {
  localStorage.removeItem(authVarKey);
  authVar({ ...initialValue });
};

const hydrate = () => {
  const localDataStr = localStorage.getItem(authVarKey);
  const authVarData = getVar();

  if (!localDataStr) {
    if (authVarData.isLoggedIn) {
      resetVar();
    }
    return;
  }

  if (JSON.stringify(authVarData) === localDataStr) {
    return;
  }

  const localDataObj = JSON.parse(localDataStr);

  setVar(localDataObj);
};

export const useAuthVar = () => {
  authDataManager.hydrate();
  return useReactiveVar(authVar);
};

export const authDataManager = { setVar, getVar, resetVar, hydrate };
