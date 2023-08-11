import React, { useEffect, useState } from 'react'

import { Input, Label, Select, Textarea, Button } from '@roketid/windmill-react-ui'
import PageTitle from 'example/components/Typography/PageTitle'
import SectionTitle from 'example/components/Typography/SectionTitle'

import Layout from 'example/containers/Layout'
import { MailIcon } from 'icons'

function Grievance() {
  const [formValues, setFormValues] = useState({
    name: "",
    departmentId: "",
    isAnonimous: "" 
  });
  const [departments, setDepartments] = useState([]);
  const [facts, setFacts] = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3344/grievances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        // Success, do something
        console.log("Grievance created successfully!");
      } else {
        // Handle error
        console.error("Error creating status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
     // If the field is a radio button, use the checked value
    const fieldValue = type === "radio" ? (e.target.checked ? value : "") : value;

    setFormValues((prevValues) => ({ ...prevValues, [name]: fieldValue }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDepartments = await fetch("http://localhost:3344/departments");
        
        const dataDepartments = await responseDepartments.json();

        setDepartments(dataDepartments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFacts = await fetch("http://localhost:3344/facts");

        const dataFacts = await responseFacts.json();

        setFacts(dataFacts);
      } catch (error) {
        console.error("Error fetching facts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <PageTitle>Reclamação/Queixa</PageTitle>
      <SectionTitle>Registre sua reclamação/queixa</SectionTitle>
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

          {/* <Label>
            <span>Título</span>
            <Input className="mt-1" placeholder="Informe um título para a reclamação/queixa" />
          </Label> */}
          <div className="mt-4 pb-3">
            {/* TODO: Check if this label is accessible, or fallback */}
            {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
            <Label>Prefere manter o anonimato ao enviar a reclamação?</Label>
            <div className="mt-2">
              <Label radio>
                <Input
                  type="radio"
                  name="isAnonimous"
                  value="true"
                  onChange={handleChange}
                />
                <span className="ml-2">Sim</span>
              </Label>
              <Label className="ml-6" radio>
                <Input                   
                  type="radio"
                  name="isAnonimous"
                  value="true"
                  onChange={handleChange}
                />
                <span className="ml-2">Não</span>
              </Label>
            </div>
          </div>

          <Label className="mt-4">
            <span>Nos ajude a identificar o início do problema informando a empresa e o departamento envolvido nessa reclamação</span>
            <Label className="mt-4">
              <div className='flex flex-row'>
                <div className='basis-1/2 pr-3'>
                  <span>Empresa</span>
                  <Select 
                    className="mt-1"
                    name="departmentId"
                    value={formValues.departmentId}
                    onChange={handleChange}
                  >
                    <option value="">Selecione um departamento</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className='basis-1/2 pl-3'>
                  <span>Departamento</span>
                  <Select className="mt-1">
                  {departments.map((department) => (
                    <option key={ department.id }>{ department.name }</option>
                  ))}            
                  </Select>
                </div>
              </div>
            </Label>
          </Label>

          <Label className="mt-4">
            <span>Essa reclamação é um fato isolado ou um fato recorrente?</span>
            <Select className="mt-1">
            {facts.map((fact) => (
              <option key={ fact.id }>{ fact.name }</option>
            ))}            
            </Select>
          </Label>        

          <Label className="mt-4">
            <span>Reclamação/Queixa</span>
            <Textarea className="mt-1" rows={10} placeholder="Descreva sua reclamação/queixa com o máximo de detalhes possíveis." />
          </Label>

          <Label className="mt-6" check>
            <Input type="checkbox" />
            <span className="ml-2">
              Manter o anonimato na Reclamação/Queixa? <span className="underline">políticas de privacidade</span>
            </span>
          </Label>

            <div className="flex flex-col flex-wrap space-y-4 md:flex-row md:items-end md:space-x-4 px-4 py-3 mb-6">
            {/* <div className="flex flex-col flex-wrap mb-8 space-y-4 md:flex-row md:items-end md:space-x-4"> */}
              <div>
                <Button 
                  type="submit" 
                  className="bg-lime-600 hover:bg-lime-500" 
                  size="larger"
                >
                  Registrar
                </Button>
              </div>
              <div>
                <Button className="bg-red-700 hover:bg-red-600" size="larger">Cancelar</Button>
              </div>           
            </div>

        </div>
      </form>
    </Layout>
  )
}

export default Grievance
