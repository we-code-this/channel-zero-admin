import Cookies from 'universal-cookie';

const host = process.env.REACT_APP_DATA_API_HOST;
const cookies = new Cookies();

export async function count() {
  const res = await fetch(`${host}/articles/count`);

  return (await res.json())[0].count;
}

export async function create(data) {
  let form = new FormData();
  
  if (data.image.files.length > 0) {
    form.append("image", data.image.files[0]);
  }
  
  form.append("title", data.title.value);
  form.append("summary", data.summary.value);
  form.append("description", data.description.value);
  form.append("publish_date", data.publish_date.value);

  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  let opts = {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`
    },
    body: form
  };

  try {
    const res = await fetch(`${host}/article`, opts);
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
  return `/article/create`;
}

export async function deleteArticle(id) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/article`, {
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

export function editPath(slug) {
  return `/article/${slug}/edit`;
}

export async function findBySlug(slug) {
  const res = await fetch(`${host}/article/${slug}`);
  return await res.json();
}

export async function get(params = {}) {
  const order = params.order ? params.order : "desc";
  let url = `${host}/articles`;

  if (params.start && params.limit) {
    url = `${url}/unpublished/${params.start}/${params.limit}/${order}`;
  } else if (params.limit) {
    url = `${url}/unpublished/0/${params.limit}/${order}`;
  }

  const res = await fetch(url);
  return await res.json();
}

export async function getForSelect() {
  const res = await fetch(`${host}/articles/by/title`);
  return await res.json();
}

export function imageUrl(url) {
  const hash = Date.now();
  return `${url}?${hash}`;
}

export function indexPath() {
  return "/articles";
}

export function showPath(slug) {
  return `/article/${slug}`;
}

export async function togglePublish(id, published) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);
  const path = published ? "article/unpublish" : "article/publish";

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
  form.append("title", data.title.value);
  form.append("summary", data.summary.value);
  form.append("description", data.description.value);
  form.append("publish_date", data.publish_date.value);

  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  let opts = {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`
    },
    body: form
  };

  try {
    const res = await fetch(`${host}/article`, opts);
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
