import Cookies from 'universal-cookie';

const host = process.env.REACT_APP_DATA_API_HOST;
const cookies = new Cookies();

export async function count() {
  const res = await fetch(`${host}/promos/count`);

  return (await res.json())[0].count;
}

export async function create(data) {
  let form = new FormData();
  form.append("image", data.image.files[0]);
  form.append("name", data.name.value);
  form.append("url", data.url.value);
  form.append("location", data.location.value);

  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  let opts = {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`
    },
    body: form
  };

  try {
    const res = await fetch(`${host}/promo`, opts);
    return await res.json();
  } catch (e) {
    return {
      errors: [
        {
          field: "image",
          message: "An error occurred while uploading. Please try again."
        }
      ]
    };
  }
}

export function createPath() {
  return `/promo/create`;
}

export async function deletePromo(id) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/promo`, {
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
  return `/promo/${id}/edit`;
}

export async function findById(id) {
  const res = await fetch(`${host}/promo/${id}`);
  return await res.json();
}

export async function get(params = {}) {
  const order = params.order ? params.order : "desc";
  let url = `${host}/promos`;

  if (params.start && params.limit) {
    url = `${url}/unpublished/${params.start}/${params.limit}/${order}`;
  } else if (params.limit) {
    url = `${url}/unpublished/0/${params.limit}/${order}`;
  }

  const res = await fetch(url);
  return await res.json();
}

export function imageUrl(filename) {
  const hash = Date.now();
  return `/files/promos/${filename}?${hash}`;
}

export function indexPath() {
  return "/promos";
}

export function showPath(id) {
  return `/promo/${id}`;
}

export async function togglePublish(id, published) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);
  const path = published ? "promo/unpublish" : "promo/publish";

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
  let form = new FormData();
  if (data.image.files.length) {
    form.append("image", data.image.files[0]);
  }
  form.append("id", id);
  form.append("name", data.name.value);
  form.append("url", data.url.value);
  form.append("location", data.location.value);

  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  let opts = {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`
    },
    body: form
  };

  try {
    const res = await fetch(`${host}/promo`, opts);
    return await res.json();
  } catch (e) {
    return {
      errors: [
        {
          field: "image",
          message: "An error occurred while uploading. Please try again."
        }
      ]
    };
  }
}
