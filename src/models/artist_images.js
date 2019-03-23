import FormData from "form-data";

const host = process.env.REACT_APP_DATA_API_HOST;

export async function create(data) {
  let form = new FormData();
  form.append("image", data.image.files[0]);
  form.append("artist_id", data.artist_id.value);

  let opts = {
    method: "POST",
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

  let opts = {
    method: "PATCH",
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
  try {
    const res = await fetch(`${host}/artist/image`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
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
