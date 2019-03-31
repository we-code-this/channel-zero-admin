const host = process.env.REACT_APP_DATA_API_HOST;

export async function count() {
  const res = await fetch(`${host}/releases/count`);

  return (await res.json())[0].count;
}

export function createPath() {
  return `/release/create`;
}

export async function deleteLabel(id) {
  const res = await fetch(`${host}/release`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "DELETE",
    body: JSON.stringify({ id })
  });

  return await res.json();
}

export function editPath(slug) {
  return `/release/${slug}/edit`;
}

export async function get(params = {}) {
  const order = params.order ? params.order : "desc";
  let url = `${host}/releases`;

  if (params.start && params.limit) {
    url = `${url}/range/${params.start}/${params.limit}/${order}`;
  } else if (params.limit) {
    url = `${url}/${params.limit}/${order}`;
  }

  const res = await fetch(url);
  return await res.json();
}

export function indexPath() {
  return "/releases";
}

export function showPath(slug) {
  return `/release/${slug}`;
}
