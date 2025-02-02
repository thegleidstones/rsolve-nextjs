import { AuthContext } from 'context/AuthContext';
import { fetchData } from 'hooks/FetchData/fecthData';
import { useCallback, useContext, useEffect, useState } from 'react';

type Category = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export function useCategories() {
  const { user, company } = useContext(AuthContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    companyId: company?.id,
  });

  useEffect(() => {
    fetchData("categories", setCategories, "");
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      let url = "http://localhost:3344/categories";
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
        console.log("Category created successfully!");
        fetchData("categories", setCategories, "");
        setFormValues({ id: "", name: "", companyId: company?.id });
      } else {
        console.error("Error creating category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleInactivate = useCallback(async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:3344/categories/inactivate/${categoryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Category inactivated successfully!');
        fetchData("categories", setCategories, "");
        // Aqui você pode atualizar o estado de categories após a inativação
      } else {
        console.error('Error inactivating category');
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
    categories,
    setCategories,
    formValues,
    setFormValues,
    handleSubmit,
    handleInactivate,
    handleChange,
  };
}
