import Cookies from 'universal-cookie';

const host = process.env.REACT_APP_DATA_API_HOST;
const cookies = new Cookies();

export async function count() {
  const res = await fetch(`${host}/vendors/count`);

  return (await res.json())[0].count;
}

export async function create(data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/vendor`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "POST",
    body: JSON.stringify(data)
  });

  return await res.json();
}

export function createPath() {
  return `/vendor/create`;
}

export async function deleteVendor(id) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/vendor`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "DELETE",
    body: JSON.stringify({ id })
  });

  return await res.json();
}

export function editPath(id) {
  return `/vendor/${id}/edit`;
}

export async function findById(id) {
  const res = await fetch(`${host}/vendor/${id}`);
  return await res.json();
}

export async function get(params = {}) {
  const order = params.order ? params.order : "desc";
  const url = `${host}/vendors/range/${params.start}/${params.limit}/${order}`;

  const res = await fetch(url);
  return await res.json();
}

export async function getForSelect() {
  const res = await fetch(`${host}/vendors/by/name`);
  return await res.json();
}

export function indexPath() {
  return "/vendors";
}

export async function update(id, data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/vendor`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "PATCH",
    body: JSON.stringify({ id, ...data })
  });

  return await res.json();
}
