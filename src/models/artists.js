const host = process.env.REACT_APP_DATA_API_HOST;

export async function get(params = {}) {
  const order = params.order ? params.order : "desc";
  let url = `${host}/artists`;

  if (params.start && params.limit) {
    url = `${url}/range/${params.start}/${params.limit}/${order}`;
  } else if (params.limit) {
    url = `${url}/${params.limit}/${order}`;
  }

  const res = await fetch(url);
  return await res.json();
}

export async function count() {
  const res = await fetch(`${host}/artists/count`);

  return (await res.json())[0].count;
}

export async function findBySlug(slug) {
  const res = await fetch(`${host}/artist/${slug}`);
  return await res.json();
}
