const BASE_URL = "http://localhost:3000/api/";

async function get(url: string, headers = {}) {
  const res = await fetch(BASE_URL + url, {
    headers,
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Error occured");
  }

  const data = await res.json();

  return data;
}

async function post(url: string, headers = {}, body = {}) {
  const res = await fetch(BASE_URL + url, {
    headers,
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Error occured");
  }

  const data = await res.json();

  return data;
}

async function put(url: string, headers = {}, body = {}) {
  const res = await fetch(BASE_URL + url, {
    headers,
    method: "PUT",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Error occured");
  }

  const data = await res.json();

  return data;
}

async function del(url: string, headers = {}) {
  const res = await fetch(BASE_URL + url, {
    headers,
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Error occured");
  }

  const data = await res.json();

  return data;
}

export const api = {
  get,
  post,
  put,
  del,
};
