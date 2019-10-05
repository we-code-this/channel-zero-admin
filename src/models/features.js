import Cookies from 'universal-cookie';

const host = process.env.REACT_APP_DATA_API_HOST;
const cookies = new Cookies();

export async function count() {
  const res = await fetch(`${host}/features/count`);

  return (await res.json())[0].count;
}

export async function create(data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/feature`, {
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
  return `/feature/create`;
}

export async function deleteFeature(id) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/feature`, {
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
  return `/feature/${id}/edit`;
}

export async function findById(id) {
  const res = await fetch(`${host}/feature/${id}`);
  return await res.json();
}

export async function get(params = {}) {
  const order = params.order ? params.order : "desc";
  const url = `${host}/features/range/${params.start}/${params.limit}/${order}`;

  const res = await fetch(url);
  return await res.json();
}

export function indexPath() {
  return "/features";
}

export function showPath(id) {
  return `/feature/${id}`;
}

export async function togglePublish(id, published) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);
  const path = published ? "feature/unpublish" : "feature/publish";

  const res = await fetch(`${host}/${path}`, {
    method: "PATCH",
    body: JSON.stringify({
      id
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  });

  return await res.json();
}

export async function update(id, data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/feature`, {
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
