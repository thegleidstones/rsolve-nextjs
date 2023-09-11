import { AuthContext } from 'context/AuthContext';
import { fetchData } from 'hooks/FetchData/fecthData';
import { useCallback, useContext, useEffect, useState } from 'react';

type Fact = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export function useFacts() {
  const { user, company } = useContext(AuthContext);
  const [facts, setFacts] = useState<Fact[]>([]);
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    companyId: company?.id
  });

  useEffect(() => {
    fetchData("facts", setFacts, "");
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      let url = "http://localhost:3344/facts";
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
        console.log("Fact created successfully!");
        fetchData("facts", setFacts, "");
        setFormValues({ id: "", name: "", companyId: company?.id });
      } else {
        console.error("Error creating fact");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleInactivate = useCallback(async (factId) => {
    try {
      const response = await fetch(`http://localhost:3344/facts/inactivate/${factId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Fact inactivated successfully!');
        fetchData("facts", setFacts, "");
        // Aqui você pode atualizar o estado de facts após a inativação
      } else {
        console.error('Error inactivating fact');
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
    facts,
    setFacts,
    formValues,
    setFormValues,
    handleSubmit,
    handleInactivate,
    handleChange,
  };
}
