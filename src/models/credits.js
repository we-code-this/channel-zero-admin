import Cookies from 'universal-cookie';

const host = process.env.REACT_APP_DATA_API_HOST;
const cookies = new Cookies();

export async function create(data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const creditData = {
    release_id: data.release_id.value,
    label: data.label.value,
    value: data.value.value,
    url: data.url.value,
  };

  let opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "POST",
    body: JSON.stringify(creditData)
  };

  try {
    const res = await fetch(`${host}/credit`, opts);
    return await res.json();
  } catch (e) {
    return {
      errors: [
        {
          field: "label",
          message: "An error occurred. Please try again."
        }
      ]
    };
  }
}

export async function deleteCredit(id) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/credit`, {
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

export async function update(id, data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const creditData = {
    id: id,
    label: data.label.value,
    value: data.value.value,
    url: data.url.value,
  };

  let opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "PATCH",
    body: JSON.stringify(creditData)
  };

  try {
    const res = await fetch(`${host}/credit`, opts);
    return await res.json();
  } catch (e) {
    return {
      errors: [
        {
          field: "name",
          message: "An error occurred. Please try again."
        }
      ]
    };
  }
}

export function createPath(slug) {
  return `/release/${slug}/credit/create`;
}

export function editPath(id, release_slug) {
  return `/release/${release_slug}/credit/${id}/edit`;
}

export async function findById(id) {
  const res = await fetch(`${host}/credit/${id}`);
  return await res.json();
}
