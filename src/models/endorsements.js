import Cookies from 'universal-cookie';

const host = process.env.REACT_APP_DATA_API_HOST;
const cookies = new Cookies();

export async function create(data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const endorsementData = {
    related_id: data.related_id.value,
    review: data.review.value,
    reviewer: data.reviewer.value,
    url: data.url.value,
    type: 'release',
  };

  let opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "POST",
    body: JSON.stringify(endorsementData)
  };

  try {
    const res = await fetch(`${host}/endorsement`, opts);
    return await res.json();
  } catch (e) {
    return {
      errors: [
        {
          field: "review",
          message: "An error occurred. Please try again."
        }
      ]
    };
  }
}

export function createPath(slug) {
  return `/release/${slug}/endorsement/create`;
}

export async function deleteEndorsement(id) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/endorsement`, {
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

export function editPath(id, release_slug) {
  return `/release/${release_slug}/endorsement/${id}/edit`;
}

export async function findById(id) {
  const res = await fetch(`${host}/endorsement/${id}`);
  return await res.json();
}

export async function update(id, data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const endorsementData = {
    id: id,
    review: data.review.value,
    reviewer: data.reviewer.value,
    url: data.url.value,
  };

  let opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "PATCH",
    body: JSON.stringify(endorsementData)
  };

  try {
    const res = await fetch(`${host}/endorsement`, opts);
    return await res.json();
  } catch (e) {
    return {
      errors: [
        {
          field: "review",
          message: "An error occurred. Please try again."
        }
      ]
    };
  }
}
