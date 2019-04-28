const host = process.env.REACT_APP_DATA_API_HOST;

export async function count() {
  const res = await fetch(`${host}/vendors/count`);

  return (await res.json())[0].count;
}

export function createPath() {
  return `/vendors/create`;
}

export function editPath(id) {
  return `/vendor/${id}/edit`;
}

export async function get(params = {}) {
  console.log("vendor params:", params);
  const order = params.order ? params.order : "desc";
  const url = `${host}/vendors/range/${params.start}/${params.limit}/${order}`;

  const res = await fetch(url);
  return await res.json();
}

export function indexPath() {
  return "/vendors";
}
