import { fetchSetting } from "../helpers/fetchConfig";

export const returnFetch = async ({ endpoint, body }) => {
  const output = await fetch(`${process.env.REACT_APP_API_PATH}/${endpoint}`, {
    ...fetchSetting,
    headers: {
      ...fetchSetting.headers,
      ["access-token"]: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    body: body ? JSON.stringify(body) : "",
  })
    .then((response) => response.json())
    .then((res) => {
      if (
        res &&
        res.status &&
        res.message &&
        !res.message.includes("ERROR-LOGS: ")
      ) {
        window.location.reload();
      }

      return res;
    });

  const { data, status, message } = await output;
  if (status && status === "error" && message) {
    document.showAlert(message, status);
  }

  return data;
};
