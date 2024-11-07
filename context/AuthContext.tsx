import { ReactNode, createContext, useEffect, useState } from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "services/api";


type Company = {
  id: string;
  cnpj: string;
  companyName: string;
}

type User = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

type SignInCredentials = {
  cnpj: string;
  email: string;
  password: string;
};

type AuthContextData = {
  company: Company | undefined;
  user: User | undefined;
  isAuthenticated: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
}

export function signOut() {
  destroyCookie(undefined, "rsolve.auth-token", { path: "/" });
  Router.push("/app/login");
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [company, setCompany] = useState<Company>();
  const isAuthenticated = !!user;

  async function signIn({ cnpj, email, password }: SignInCredentials) {
    try {
      const response = await api.post("sessions", {
        cnpj,
        email,
        password,
      });

      const { token, refreshToken, company, user } = response.data;

      setCookie(undefined, "rsolve.auth-token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/"
      });

      // setCookie(undefined, "rsolve.auth-refreshToken", refreshToken, {
      //   maxAge: 60 * 60 * 24 * 30, // 30 dias
      //   path: "/"
      // });

      console.log(company);
      console.log(user);
      console.log(response.data);

      setCompany({
        id: company.id,
        cnpj,
        companyName: company.companyName
      });

      setUser({
        id: user.id,
        email,
        name: user.name,
        isAdmin: user.isAdmin
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push("/app/home");

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const { "rsolve.auth-token": token } = parseCookies();

    if (token) {
      api.get("/companies/mycompany").then(response => {
        const { id, companyName, cnpj } = response.data;
        setCompany({ id, companyName, cnpj });
      }).catch(error => {
        alert("Sua sessão expirou. Faça login novamente!");
        signOut();
      });

      api.get("/users/myuser").then(response => {
        const { id, email, name, isAdmin } = response.data;
        setUser({ id, email, name, isAdmin });
      }).catch(error => {
        signOut();
      });
    } else {
      signOut();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ company, isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}
