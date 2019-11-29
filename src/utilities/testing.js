export function adminGlobals() {
  return {
    token: 'atoken',
    groups: {admin:true}
  };
};

export function authorGlobals() {
  return {
    token: 'atoken',
    groups: {author:true}
  };
};

export function editorGlobals() {
  return {
    token: 'atoken',
    groups: {editor:true}
  };
};

export function emptyGlobals() {
  return {
    token: undefined,
    groups: undefined
  };
};
