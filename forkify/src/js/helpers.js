import { TIMEOUT_SEC } from "./config.js";

const timeout = (msec) => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error(`Request took too long! Timeout after ${s} second`));
  }, msec * 1000);
});

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, dataToSend) {
  try {
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
  } catch (err) {
    throw err;
  }
};
