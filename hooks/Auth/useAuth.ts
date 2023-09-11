import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // Função para verificar se o usuário está autenticado
    const isAuthenticated = () => {
      // Recupera os cookies
      const cookies = parse(document.cookie);

      // Verifica se o token JWT está presente nos cookies
      if (cookies && cookies.token) {
        // Decodifica o token JWT para obter os dados
        const decodedToken = decodeToken(cookies.token);
        console.log("Token Decodificado, antes de validar!")
        console.log(decodeToken)

        // Verifica se o token ainda é válido (por exemplo, se a data de expiração é futura)
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp > currentTime) {
          console.log("Token decodificado e não expirado!")
          return true; // O usuário está autenticado
        }
      }

      return false; // O usuário não está autenticado
    };

    if (!isAuthenticated()) {
      console.log("O usuário não está autenticado")
      router.push('/app/login'); // Redireciona para a página de login se não estiver autenticado
    }
  }, []);

  return;
};

// Função para decodificar o token JWT
const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU="); // Substitua 'seuSegredoAqui' pelo seu segredo do JWT
    return decoded;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
};

export default useAuth;
