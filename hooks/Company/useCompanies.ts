import { fetchData } from 'hooks/FetchData/fecthData';
import { useCallback, useEffect, useState } from 'react';

type Company = {
  id: string;
  cnpj: string,
  companyName: string,
  tradeName: string,
  address: string,
  neighborhood: string,
  zipCode: string,
  phone: string ,
  city: string,
  state: string,
}

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [formValues, setFormValues] = useState<Company>({
    id: "",
    cnpj: "",
    companyName: "",
    tradeName: "",
    address: "",
    neighborhood: "",
    zipCode: "",
    phone: "" ,
    city: "",
    state: "",
  });

  // async function fetchCategories() {
  //   try {
  //     const response = await fetch("http://localhost:3344/companies");
  //     const data = await response.json();

  //     setCompanies(data);
  //   } catch (error) {
  //     console.error("Error fetching companies:", error);
  //   }
  // }

  useEffect(() => {
    fetchData("companies", setCompanies, "");
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      let url = "http://localhost:3344/companies";
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
        console.log("Company created successfully!");
        fetchData("companies", setCompanies, "");
        setFormValues({
          id: "",
          cnpj: "",
          companyName: "",
          tradeName: "",
          address: "",
          neighborhood: "",
          zipCode: "",
          phone: "" ,
          city: "",
          state: "", 
        });
      } else {
        console.error("Error creating company");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleInactivate = useCallback(async (companyId) => {
    try {
      const response = await fetch(`http://localhost:3344/companies/inactivate/${companyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Company inactivated successfully!');
        fetchData("companies", setCompanies, "");
        // Aqui você pode atualizar o estado de companies após a inativação
      } else {
        console.error('Error inactivating company');
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
    companies,
    setCompanies,
    formValues,
    setFormValues,
    handleSubmit,
    handleInactivate,
    handleChange,
  };
}
