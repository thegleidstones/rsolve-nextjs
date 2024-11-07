import { AuthContext, signOut } from 'context/AuthContext';
import { fetchData, fetchDataStatus } from 'hooks/FetchData/fecthData';
import { useCallback, useContext, useEffect, useState } from 'react';
import { api } from 'services/api';

type Status = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export function useStatuses() {
  const { user, company } = useContext(AuthContext);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    companyId: company?.id
  });

  // async function fetchCategories() {
  //   try {
  //     const response = await fetch("http://localhost:3344/statuses");
  //     const data = await response.json();

  //     setStatuses(data);
  //   } catch (error) {
  //     console.error("Error fetching statuses:", error);
  //   }
  // }

  useEffect(() => {
    fetchDataStatus("statuses", setStatuses, "");
  }, []);

  async function handleSubmitOld(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      let url = "http://localhost:3344/statuses";
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
        console.log("Status created successfully!");
        fetchDataStatus("statuses", setStatuses, "");
        setFormValues({ id: "", name: "", companyId: company?.id });
      } else {
        console.error("Error creating status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleSubmitOldV2(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      let url = "http://localhost:3344/statuses";
      let method = "POST";

      if (formValues.id) {
        url += `/${formValues.id}`;
        method = "PUT";
      }

      const formJson = JSON.stringify(formValues);

      const response = await api.post(url, formJson, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status === 201) {
        console.log("Status created successfully!");
        fetchDataStatus("statuses", setStatuses, "");
        setFormValues({ id: "", name: "", companyId: company?.id });
      } else {
        console.error("Error creating status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      let url = "http://localhost:3344/statuses";
      let method = "POST";

      if (formValues.id) {
        url += `/${formValues.id}`;
        method = "PUT";
      }

      const formJson = JSON.stringify(formValues);

      api.post(url, formJson, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        }
      }).then(response => {
        if (response.status === 201) {
          console.log("Status created successfully!");
          console.error(response.status);
          console.error(response.statusText);
          fetchDataStatus("statuses", setStatuses, "");
          setFormValues({ id: "", name: "", companyId: company?.id });
        } else {
          console.error(response.status);
          console.error(response.data);
          console.error("Error creating status");
        }
      }).catch(error => {
        alert(error);
        console.error(error);
        // signOut();
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleInactivate = useCallback(async (statusId) => {
    try {
      const response = await fetch(`http://localhost:3344/statuses/inactivate/${statusId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Status inactivated successfully!');
        fetchData("statuses", setStatuses, "");
        // Aqui você pode atualizar o estado de statuses após a inativação
      } else {
        console.error('Error inactivating status');
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
    statuses,
    setStatuses,
    formValues,
    setFormValues,
    handleSubmit,
    handleInactivate,
    handleChange,
  };
}
