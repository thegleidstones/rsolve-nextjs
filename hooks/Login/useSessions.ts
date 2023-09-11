import { useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/router";

type TSessions = {
  email: string;
  password: string;
  cnpj: string;
}

const useSessions = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const router = useRouter();

  const handleLogin = async ({ email, password, cnpj } : TSessions) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3344/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, cnpj }),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login. Verifique suas credenciais.");
      }

      const data = await response.json();

      // Armazenar o token usando nookies
      setCookie(null, "jwtToken", data.token, {
        maxAge: 60 * 2, // 120 segundos
        //maxAge: 60 * 60 * 24 * 1, // 1 dia
        path: "/", // cookie disponível em toda a aplicação
      });

      console.log(`Token: ${data.token }`);
      console.log(`User: ${data.user.name} - ${data.user.email}`);
      console.log(`Company: ${data.company.companyName} - ${data.company.cnpj}`);

      router.push('/app/home');

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    cnpj,
    setCnpj,
    isLoading,
    error,
    handleLogin,
  };
};

export default useSessions;
