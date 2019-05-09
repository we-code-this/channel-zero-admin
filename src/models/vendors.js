const host = process.env.REACT_APP_DATA_API_HOST;

export async function count() {
  const res = await fetch(`${host}/vendors/count`);

  return (await res.json())[0].count;
}

export async function create(data) {
  const res = await fetch(`${host}/vendor`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
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
  const res = await fetch(`${host}/vendor`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
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

export function indexPath() {
  return "/vendors";
}

export async function update(id, data) {
  const res = await fetch(`${host}/vendor/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify(data)
  });

  return await res.json();
}
