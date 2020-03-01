import Cookies from 'universal-cookie';

const host = process.env.REACT_APP_DATA_API_HOST;
const cookies = new Cookies();

export async function create(data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const trackData = {
    disc_id: data.disc_id.value,
    number: data.number.value,
    title: data.title.value,
  };

  let opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "POST",
    body: JSON.stringify(trackData)
  };

  try {
    const res = await fetch(`${host}/track`, opts);
    return await res.json();
  } catch (e) {
    return {
      errors: [
        {
          field: "title",
          message: "An error occurred. Please try again."
        }
      ]
    };
  }
}

export async function deleteTrack(id) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/track`, {
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

export async function findByDiscIdAndSlug(disc_id, slug) {
  const res = await fetch(`${host}/disc/${disc_id}/track/${slug}`);
  return await res.json();
}

export async function update(id, data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const trackData = {
    id: id,
    number: data.number.value,
    title: data.title.value,
  };

  let opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "PATCH",
    body: JSON.stringify(trackData)
  };

  try {
    const res = await fetch(`${host}/track`, opts);
    return await res.json();
  } catch (e) {
    return {
      errors: [
        {
          field: "title",
          message: "An error occurred. Please try again."
        }
      ]
    };
  }
}

export function editPath(slug, disc_id, release_slug) {
  return `/release/${release_slug}/disc/${disc_id}/track/${slug}/edit`;
}

export function createPath(id, release_slug) {
  return `/release/${release_slug}/disc/${id}/track/create`;
}
