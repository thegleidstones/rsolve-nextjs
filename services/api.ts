import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

let cookies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3344",
  headers: {
    Authorization: `Bearer ${cookies["rsolve.auth-token"]}`
  }
});

api.interceptors.response.use(response => {
  return response;
}, error => {

  // console.log("/**********************************************************/");
  // console.log("passou no error??? ");
  // console.log("/**********************************************************/");
  // console.log("/******************* RESPONSE ********************************/");
  // console.log(error.response);
  // console.log("/******************* DATA ********************************/");
  // console.log(error.response.data);
  // console.log("/******************* ERROR ********************************/");
  // console.log(error.response.data.error);  
  // console.log("/******************* MESSAGE ********************************/");
  // console.log(error.response.data.message);  
  // console.log("/******************* CODE ********************************/");
  // console.log(error.response.data.code);

  const err = error as AxiosError;
  if (err.response?.status === 401) {
    if (err.response.data?.message === "Token Expired.") {
      cookies = parseCookies();

      const { "rsolve.auth-refreshToken": refreshToken } = cookies;

      console.log("OLD REFRESH TOKEN");
      console.log(refreshToken);

      api.post("/refresh-token", {
        refreshToken
      }).then(response => {
        // console.log("passou na rota refresh");
        // console.log(response);
        console.log("/*******************************************************/");
        console.log("RESPONSE");
        console.log(response);
        console.log("/*******************************************************/");        

        const { token } = response.data;
        console.log("/*******************************************************/");
        console.log("RESPONSE DATA!!!");
        console.log(response.data);
        console.log("/*******************************************************/");        

        setCookie(undefined, "rsolve.auth-token", token, {
          maxAge: 60 * 60 * 24 * 30, // 30 dias
          path: "/"
        });
  
        setCookie(undefined, "rsolve.auth-refreshToken", response.data.newRefreshToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 dias
          path: "/"
        });

        api.defaults.headers['Authorization'] = `Bearer ${token}`;
      });

    } else {
      // deslogar o usuário
    }
  }
})