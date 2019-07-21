import Cookies from 'universal-cookie';

export default async (component) => {
    const cookies = new Cookies();
    cookies.remove(process.env.REACT_APP_COOKIE_NAME);

    return component.setGlobal({
        ...component.global,
        groups: undefined,
        token: undefined
    });
};