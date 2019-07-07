import FormData from "form-data";
import Cookies from 'universal-cookie';

const host = process.env.REACT_APP_DATA_API_HOST;
const cookies = new Cookies();

export async function create(data) {
  let form = new FormData();
  form.append("image", data.image.files[0]);
  form.append("artist_id", data.artist_id.value);

  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  let opts = {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`
    },
    body: form
  };

  try {
    const res = await fetch(`${host}/artist/image`, opts);
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

export async function edit(data) {
  let form = new FormData();
  form.append("image", data.image.files[0]);
  form.append("id", data.id.value);

  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  let opts = {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`
    },
    body: form
  };

  try {
    const res = await fetch(`${host}/artist/image`, opts);
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

export async function deleteImage(id) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  try {
    const res = await fetch(`${host}/artist/image`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      method: "DELETE",
      body: JSON.stringify({ id })
    });

    return await res.json();
  } catch (e) {
    console.error(e.stack);
    return false;
  }
}

export function createPath(slug) {
  return `/artist/${slug}/image/create`;
}

export function editPath(slug, id) {
  return `/artist/${slug}/image/${id}/edit`;
}

export function imageUrl(filename) {
  const hash = Date.now();
  return `/files/artists/${filename}?${hash}`;
}
