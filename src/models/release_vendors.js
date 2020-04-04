import Cookies from 'universal-cookie';

const host = process.env.REACT_APP_DATA_API_HOST;
const cookies = new Cookies();

export async function create(data) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const vendorData = {
    release_id: data.release_id.value,
    vendor_id: data.vendor_id.value,
    url: data.url.value,
  };

  let opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "POST",
    body: JSON.stringify(vendorData)
  };

  try {
    const res = await fetch(`${host}/releasevendor`, opts);
    return await res.json();
  } catch (e) {
    return {
      errors: [
        {
          field: "url",
          message: "An error occurred. Please try again."
        }
      ]
    };
  }
}

export async function deleteVendor(id) {
  const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

  const res = await fetch(`${host}/releasevendor`, {
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

  const vendorData = {
    id: id,
    vendor_id: data.vendor_id.value,
    url: data.url.value,
  };

  let opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    method: "PATCH",
    body: JSON.stringify(vendorData)
  };

  try {
    const res = await fetch(`${host}/releasevendor`, opts);
    return await res.json();
  } catch (e) {
    return {
      errors: [
        {
          field: "url",
          message: "An error occurred. Please try again."
        }
      ]
    };
  }
}

export function createPath(slug) {
  return `/release/${slug}/vendor/create`;
}

export function editPath(id, release_slug) {
  return `/release/${release_slug}/vendor/${id}/edit`;
}

export async function findById(id) {
  const res = await fetch(`${host}/releasevendor/${id}`);
  return await res.json();
}
