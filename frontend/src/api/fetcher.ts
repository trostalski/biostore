import { redirect, Router } from "react-router-dom";

export const fetcher = (url: string) =>
  fetch(url, { credentials: "include" })
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .catch((error) => {
      console.log(error);
    });
