import Cookies from 'universal-cookie';

const host = process.env.REACT_APP_DATA_API_HOST;
const cookies = new Cookies();

export async function create(data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const discData = {
    release_id: data.release_id.value,
    name: data.name.value,
  };

  let opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "POST",
    body: JSON.stringify(discData)
  };

  try {
    const res = await fetch(`${host}/disc`, opts);
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

export async function deleteDisc(id) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/disc`, {
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

  const discData = {
    id: id,
    name: data.name.value,
  };

  let opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "PATCH",
    body: JSON.stringify(discData)
  };

  try {
    const res = await fetch(`${host}/disc`, opts);
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

export async function discTrackCount(id) {
  const res = await fetch(`${host}/disc/${id}/tracks/count`);

  return (await res.json())[0].count;
}

export async function findById(id) {
  const res = await fetch(`${host}/disc/${id}`);
  return await res.json();
}

export function createPath(slug) {
  return `/release/${slug}/disc/create`;
}

export function editPath(id, slug) {
  return `/release/${slug}/disc/${id}/edit`;
}
