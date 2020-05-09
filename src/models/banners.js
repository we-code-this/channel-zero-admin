import Cookies from 'universal-cookie';

const host = process.env.REACT_APP_DATA_API_HOST;
const cookies = new Cookies();

export async function count() {
  const res = await fetch(`${host}/banners/count`);

  return (await res.json())[0].count;
}

export async function create(data) {
  let form = new FormData();
  form.append("desktop_image", data.desktop_image.files[0]);
  form.append("mobile_image", data.mobile_image.files[0]);
  form.append("url", data.url.value);
  form.append("alt", data.alt.value);

  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  let opts = {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`
    },
    body: form
  };

  try {
    const res = await fetch(`${host}/banner`, opts);
    return await res.json();
  } catch (e) {
    return {
      errors: [
        {
          field: "desktop_image",
          message: "An error occurred while uploading. Please try again."
        },
        {
          field: "mobile_image",
          message: "An error occurred while uploading. Please try again."
        }
      ]
    };
  }
}

export function createPath() {
  return `/banner/create`;
}

export async function deleteBanner(id) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/banner`, {
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
  return `/banner/${id}/edit`;
}

export async function findById(id) {
  const res = await fetch(`${host}/banner/${id}`);
  return await res.json();
}

export async function get(params = {}) {
  const order = params.order ? params.order : "desc";
  const url = `${host}/banners/range/${params.start}/${params.limit}/${order}`;

  const res = await fetch(url);
  return await res.json();
}

export function imageUrl(url) {
  const hash = Date.now();
  return `${url}?${hash}`;
}

export function indexPath() {
  return "/banners";
}

export function showPath(id) {
  return `/banner/${id}`;
}

export async function togglePublish(id, published) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);
  const path = published ? "banner/unpublish" : "banner/publish";

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
  if (data.desktop_image.files.length) {
    form.append("desktop_image", data.desktop_image.files[0]);
  }
  if (data.mobile_image.files.length) {
    form.append("mobile_image", data.mobile_image.files[0]);
  }
  form.append("id", id);
  form.append("url", data.url.value);
  form.append("alt", data.alt.value);

  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  let opts = {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`
    },
    body: form
  };

  try {
    const res = await fetch(`${host}/banner`, opts);
    return await res.json();
  } catch (e) {
    return {
      errors: [
        {
          field: "desktop_image",
          message: "An error occurred while uploading. Please try again."
        },
        {
          field: "mobile_image",
          message: "An error occurred while uploading. Please try again."
        }
      ]
    };
  }
}
