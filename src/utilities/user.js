export const isAdmin = (groups) => {
    return groups.hasOwnProperty(process.env.REACT_APP_ADMIN_GROUP);
}

export const isEditor = (groups) => {
    return groups.hasOwnProperty(process.env.REACT_APP_EDITOR_GROUP);
}