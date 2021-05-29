import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * TIMEOUT_SEC);
  });
};

export const getJSON = async function (url) {
  const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
};

export const sendJSON = async function (url, dataToSend) {
  const fetchUrl = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });

  const res = await Promise.race([fetchUrl, timeout(TIMEOUT_SEC)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
};
