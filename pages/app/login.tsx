import React, { useContext } from "react"
import Link from "next/link"
import Image from "next/image"

import { Label, Input, Button, WindmillContext } from "@roketid/windmill-react-ui"
import useSessions from "hooks/Login/useSessions"
import useSessionsRocketseat from "hooks/Login/useSessionsRocketseat"

type TSessions = {
  email: string;
  password: string;
  cnpj: string;
}

function LoginPage() {
  const { mode } = useContext(WindmillContext)
  const imgSource = mode === "dark" ? "/assets/img/login-office-dark.jpeg" : "/assets/img/login-office.jpeg"
    // Use o hook personalizado useSessions
  const {
    cnpj,
    setCnpj,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  } = useSessionsRocketseat();

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="relative h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="hidden object-cover w-full h-full"
              src={imgSource}
              alt="Office"
              layout="fill"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <form onSubmit={handleSubmit}>
                <Label>
                  <span>CNPJ</span>
                  <Input
                    name="cnpj"
                    className="mt-1"
                    type="text"
                    placeholder="00.000.000/0000-00"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </Label>              
                <Label>
                  <span>Email</span>
                  <Input
                    name="email"
                    className="mt-1"
                    type="email"
                    placeholder="email@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Label>
                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    name="password"
                    className="mt-1"
                    type="password"
                    placeholder="***************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}                  
                  />
                </Label>

                {/* Mostrar mensagem de erro, se houver */}
                {/* {error && <p className="text-red-500 mt-2">{error}</p>}               */}

                {/* <Link href="/example" passHref={true}> */}
                  <Button type="submit" className="mt-4 bg-lime-600 hover:bg-lime-500" block>
                    Log in
                    {/* {isLoading ? "Loading..." : "Log in"} */}
                  </Button>
                {/* </Link> */}
              </form>              

              {/* <p className="mt-4">
                <Link href="/example/forgot-password">
                  <a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Forgot your password?
                  </a>
                </Link>
              </p>
              <p className="mt-1">
                <Link href="/example/create-account">
                  <a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Create account
                  </a>
                </Link>
              </p> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LoginPage
