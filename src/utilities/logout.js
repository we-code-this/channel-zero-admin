import Cookies from 'universal-cookie';

export default async (component) => {
    const cookies = new Cookies();
    console.log('cookie:', cookies.get(process.env.REACT_APP_COOKIE_NAME));
    cookies.remove(process.env.REACT_APP_COOKIE_NAME, { sameSite: true });
    console.log('cookie:', cookies.get(process.env.REACT_APP_COOKIE_NAME));

    return component.setGlobal({
        ...component.global,
        groups: undefined,
        token: undefined
    });
};