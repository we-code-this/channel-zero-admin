import Cookies from 'universal-cookie';

export default async (global, setGlobal) => {
  const cookies = new Cookies();
  cookies.remove(process.env.REACT_APP_COOKIE_NAME, { path: '/' });

  return setGlobal({
      ...global,
      groups: undefined,
      token: undefined
  });
};
