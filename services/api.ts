import axios, { AxiosError } from "axios";
import { signOut } from "context/AuthContext";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";

let cookies = parseCookies();
// let isRefreshing = false;
// let failedRequestQueue: { onSuccess: (token: string) => void; onFailure: (err: AxiosError<unknown, any>) => void; }[] = [];

export const api = axios.create({
  baseURL: "http://localhost:3344",
  headers: {
    Authorization: `Bearer ${cookies["rsolve.auth-token"]}`
  }
});

api.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  if (error.response?.status === 401) {
    console.log("§§§§§§§§§§§§§§§§§§§§§§§§§§");
    console.log("Passou no status code 401?");
    if (error.response.data?.message === "Token Expired.") {
      alert(error.response.data?.message);
      signOut();
    }
  } else {
    signOut();
  }
});

// api.interceptors.response.use(response => {
//   return response;
// }, (error: AxiosError) => {
//   if (error.response?.status === 401) {
//     console.log("§§§§§§§§§§§§§§§§§§§§§§§§§§");
//     console.log("Passou no status code 401?");
//     if (error.response.data?.message === "Token Expired.") {
//       console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
//       console.log("Passou no message Token Expired????");
//       cookies = parseCookies();

//       const { "rsolve.auth-refreshToken": refreshToken } = cookies;
//       const originalConfig = error.config

//       console.log("OLD REFRESH TOKEN");
//       console.log(refreshToken);

//       if (!isRefreshing) {
//         isRefreshing = true;

//         api.post("/refresh-token", {
//           refreshToken
//         }).then(response => {
//           console.log("RT na api.post('/refresh-token')");
//           console.log(refreshToken);
//           // console.log("passou na rota refresh");
//           // console.log(response);
//           console.log("/*******************************************************/");
//           console.log("RESPONSE");
//           console.log(response);
//           console.log("/*******************************************************/");

//           const { token } = response.data;
//           console.log("/*******************************************************/");
//           console.log("RESPONSE DATA!!!");
//           console.log(response.data);
//           console.log("/*******************************************************/");

//           setCookie(undefined, "rsolve.auth-token", token, {
//             maxAge: 60 * 60 * 24 * 30, // 30 dias
//             path: "/"
//           });

//           setCookie(undefined, "rsolve.auth-refreshToken", response.data.newRefreshToken, {
//             maxAge: 60 * 60 * 24 * 30, // 30 dias
//             path: "/"
//           });

//           api.defaults.headers['Authorization'] = `Bearer ${token}`;

//           failedRequestQueue.forEach(request => request.onSuccess(token));
//           failedRequestQueue = [];
//         }).catch(err => {
//           failedRequestQueue.forEach(request => request.onFailure(err));
//           failedRequestQueue = [];
//         }).finally(() => {
//           isRefreshing = false;
//         });
//       }

//       return new Promise((resolve, reject) => {
//         failedRequestQueue.push({
//           onSuccess: (token: string) => {
//             originalConfig.headers['Authorization'] = `Bearer ${token}`;
//             resolve(api(originalConfig));
//           },
//           onFailure: (err: AxiosError) => {
//             reject(err);
//           }
//         });
//       });

//     } else {
//       // deslogar o usuário
//     }
//   }
// });