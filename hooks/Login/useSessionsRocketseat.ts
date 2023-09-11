import { FormEvent, useContext, useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { AuthContext } from "context/AuthContext";

const useSessionsRocketseat = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnpj, setCnpj] = useState("");

  const { signIn } = useContext(AuthContext);
  const { user, company} = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      cnpj,
      email,
      password,
    }

    await signIn(data);
  }

  return {
    user,
    company,
    cnpj,
    setCnpj,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  }
}

export default useSessionsRocketseat


  