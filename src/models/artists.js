import Cookies from 'universal-cookie';

const host = process.env.REACT_APP_DATA_API_HOST;
const cookies = new Cookies();

export async function get(params = {}) {
  const order = params.order ? params.order : "desc";
  let url = `${host}/artists`;

  if (params.start && params.limit) {
    url = `${url}/range/${params.start}/${params.limit}/${order}`;
  } else if (params.limit) {
    url = `${url}/${params.limit}/${order}`;
  }

  const res = await fetch(url);
  return await res.json();
}

export async function getForSelect() {
  const res = await fetch(`${host}/artists/by/name`);
  return await res.json();
}

export async function count() {
  const res = await fetch(`${host}/artists/count`);

  return (await res.json())[0].count;
}

export async function create(data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/artist`, {
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

export async function findBySlug(slug) {
  const res = await fetch(`${host}/artist/${slug}`);
  return await res.json();
}

export async function updateBySlug(slug, data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/artist`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "PATCH",
    body: JSON.stringify({ slug: slug, ...data })
  });

  return await res.json();
}

export function indexPath() {
  return "/artists";
}

export function showPath(slug) {
  return `/artist/${slug}`;
}

export function createPath() {
  return `/artist/create`;
}

export function editPath(slug) {
  return `/artist/${slug}/edit`;
}

export async function deleteArtist(id) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/artist`, {
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
