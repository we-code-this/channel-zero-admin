const host = process.env.REACT_APP_DATA_API_HOST;

export async function create(data) {
  const res = await fetch(`${host}/label`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  });

  return await res.json();
}

export async function get(params = {}) {
  const order = params.order ? params.order : "desc";
  let url = `${host}/labels`;

  if (params.start && params.limit) {
    url = `${url}/range/${params.start}/${params.limit}/${order}`;
  } else if (params.limit) {
    url = `${url}/${params.limit}/${order}`;
  }

  const res = await fetch(url);
  return await res.json();
}

export async function count() {
  const res = await fetch(`${host}/labels/count`);

  return (await res.json())[0].count;
}

export function indexPath() {
  return "/labels";
}

export function editPath(slug) {
  return `/label/${slug}/edit`;
}

export function createPath() {
  return `/label/create`;
}

export async function findBySlug(slug) {
  const res = await fetch(`${host}/label/${slug}`);
  return await res.json();
}

export async function deleteLabel(id) {
  const res = await fetch(`${host}/label`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "DELETE",
    body: JSON.stringify({ id })
  });

  return await res.json();
}

export async function updateBySlug(slug, data) {
  const res = await fetch(`${host}/label/${slug}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify(data)
  });

  return await res.json();
}
