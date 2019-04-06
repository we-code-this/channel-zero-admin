import FormData from "form-data";

const host = process.env.REACT_APP_DATA_API_HOST;

export async function count() {
  const res = await fetch(`${host}/releases/count`);

  return (await res.json())[0].count;
}

export async function create(data) {
  let form = new FormData();
  form.append("image", data.image.files[0]);
  form.append("artist_id", data.artist_id.value);
  form.append("label_id", data.label_id.value);
  form.append("title", data.title.value);
  form.append("description", data.description.value);

  let opts = {
    method: "POST",
    body: form
  };

  try {
    const res = await fetch(`${host}/release`, opts);
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

export function publishPath(slug, value) {
  return `/release/${slug}/publish/${value}`;
}

export async function get(params = {}) {
  const order = params.order ? params.order : "desc";
  let url = `${host}/releases`;

  if (params.start && params.limit) {
    url = `${url}/unpublished/${params.start}/${params.limit}/${order}`;
  } else if (params.limit) {
    url = `${url}/unpublished/0/${params.limit}/${order}`;
  }

  const res = await fetch(url);
  return await res.json();
}

export async function findBySlug(slug) {
  const res = await fetch(`${host}/release/${slug}`);
  return await res.json();
}

export function imageUrl(filename) {
  const hash = Date.now();
  return `/files/releases/${filename}?${hash}`;
}

export function indexPath() {
  return "/releases";
}

export function showPath(slug) {
  return `/release/${slug}`;
}
