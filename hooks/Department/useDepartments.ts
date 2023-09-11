import { AuthContext } from 'context/AuthContext';
import { fetchData } from 'hooks/FetchData/fecthData';
import { useCallback, useContext, useEffect, useState } from 'react';

type Department = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export function useDepartments() {
  const { user, company } = useContext(AuthContext);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    companyId: company?.id,
  });

  useEffect(() => {
    fetchData("departments", setDepartments, "");
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      let url = "http://localhost:3344/departments";
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
        console.log("Department created successfully!");
        fetchData("departments", setDepartments, "");
        setFormValues({ id: "", name: "", companyId: company?.id });
      } else {
        console.error("Error creating department");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleInactivate = useCallback(async (departmentId) => {
    try {
      const response = await fetch(`http://localhost:3344/departments/inactivate/${departmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Department inactivated successfully!');
        fetchData("departments", setDepartments, "");
        // Aqui você pode atualizar o estado de departments após a inativação
      } else {
        console.error('Error inactivating department');
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
    departments,
    setDepartments,
    formValues,
    setFormValues,
    handleSubmit,
    handleInactivate,
    handleChange,
  };
}
