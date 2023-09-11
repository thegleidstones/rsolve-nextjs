import { AuthContext } from 'context/AuthContext';
import { fetchData } from 'hooks/FetchData/fecthData';
import { useCallback, useContext, useEffect, useState } from 'react';

type Reason = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export function useReasons() {
  const { user, company} = useContext(AuthContext);
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    companyId: company?.id,
  });

  useEffect(() => {
    fetchData("reasons", setReasons, "");
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      let url = "http://localhost:3344/reasons";
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
        console.log("Reason created successfully!");
        fetchData("reasons", setReasons, "");
        setFormValues({id: "", name: "", companyId: company?.id, });
      } else {
        console.error("Error creating reason");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleInactivate = useCallback(async (reasonId) => {
    try {
      const response = await fetch(`http://localhost:3344/reasons/inactivate/${reasonId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Reason inactivated successfully!');
        fetchData("reasons", setReasons, "");
        // Aqui você pode atualizar o estado de reasons após a inativação
      } else {
        console.error('Error inactivating reason');
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
    reasons,
    setReasons,
    formValues,
    setFormValues,
    handleSubmit,
    handleInactivate,
    handleChange,
  };
}
