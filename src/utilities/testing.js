export function adminGlobals() {
  return {
    token: 'atoken',
    groups: {admin:true},
    uploading: false,
  };
};

export function authorGlobals() {
  return {
    token: 'atoken',
    groups: {author:true},
    uploading: false,
  };
};

export function editorGlobals() {
  return {
    token: 'atoken',
    groups: {editor:true},
    uploading: false,
  };
};

export function emptyGlobals() {
  return {
    token: undefined,
    groups: undefined,
    uploading: false,
  };
};
