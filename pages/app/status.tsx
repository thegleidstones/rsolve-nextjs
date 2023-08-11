import React, { useState } from 'react'

import { Input, Label, Button } from '@roketid/windmill-react-ui'
import PageTitle from 'example/components/Typography/PageTitle'
import SectionTitle from 'example/components/Typography/SectionTitle'

import Layout from 'example/containers/Layout'

function Status() {
    const [formValues, setFormValues] = useState({
    name: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3344/statuses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        // Success, do something
        console.log("Status created successfully!");
      } else {
        // Handle error
        console.error("Error creating status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <Layout>
      <PageTitle>Status da Denúncia</PageTitle> 
      <SectionTitle>Cadastro de Status</SectionTitle>
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <Label>
            <span>Status</span>
            <Input           
             name="name"
             value={formValues.name}
             onChange={handleChange} 
             className="mt-1" 
             placeholder="Informe o status no processo de cadastro" 
            /> 
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

export default Status 
