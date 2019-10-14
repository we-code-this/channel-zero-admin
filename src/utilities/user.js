import jwtDecode from 'jwt-decode';

export const isAdmin = (groups) => {
  const group = JSON.parse(process.env.REACT_APP_ADMIN_GROUP);
  return groups.hasOwnProperty(group);
};

export const isEditor = (groups) => {
  const group = JSON.parse(process.env.REACT_APP_EDITOR_GROUP);
  return groups.hasOwnProperty(group);
};

export const isAuthor = (groups) => {
  const group = JSON.parse(process.env.REACT_APP_AUTHOR_GROUP);
  return groups.hasOwnProperty(group);
};

export const id = (token) => {
    const decoded = jwtDecode(token);

    return decoded.id;
};

export const canCreate = (groups) => {
    const admin = isAdmin(groups);
    const editor = isEditor(groups);
    const author = isAuthor(groups);

    return (admin || editor || author);
};

export const canEditOrDelete = (token, groups, instanceUserId) => {
    const admin = isAdmin(groups);
    const editor = isEditor(groups);
    const author = isAuthor(groups);

    return (admin || editor) || (author && (id(token) === instanceUserId));
};
