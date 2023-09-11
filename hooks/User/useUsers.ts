import { fetchData } from 'hooks/FetchData/fecthData';
import { useCallback, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  company_id: string,
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [formValues, setFormValues] = useState<User>({
    id: "",
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    company_id: "",
  });

  // async function fetchCategories() {
  //   try {
  //     const response = await fetch("http://localhost:3344/users");
  //     const data = await response.json();

  //     setUsers(data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // }

  useEffect(() => {
    fetchData("users", setUsers, "");
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      let url = "http://localhost:3344/users";
      let method = "POST";

      if (formValues.id) {
        url += `/${formValues.id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });      

      if (response.ok) {
        console.log("User created successfully!");
        fetchData("users", setUsers, "");
        setFormValues({
          id: "",
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          company_id: "",
        });
      } else {
        console.error("Error creating user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleInactivate = useCallback(async (userId) => {
    try {
      const response = await fetch(`http://localhost:3344/users/inactivate/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('User inactivated successfully!');
        fetchData("users", setUsers, "");
        // Aqui você pode atualizar o estado de users após a inativação
      } else {
        console.error('Error inactivating user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  return {
    users,
    setUsers,
    formValues,
    setFormValues,
    handleSubmit,
    handleInactivate,
    handleChange,
  };
}
