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

export function createPath(slug) {
  return `/artist/${slug}/image/create`;
}