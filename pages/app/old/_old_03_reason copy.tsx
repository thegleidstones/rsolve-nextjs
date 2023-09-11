import React, { useEffect, useState } from 'react'

import { Input, Label, Button, TableContainer, Table, TableHeader, TableCell, TableBody, TableRow, Avatar, Badge, TableFooter, Pagination, Modal, ModalHeader, ModalBody, ModalFooter } from '@roketid/windmill-react-ui'
import PageTitle from 'example/components/Typography/PageTitle'
import SectionTitle from 'example/components/Typography/SectionTitle'

import Layout from 'example/containers/Layout'
import { EditIcon, TrashIcon } from 'icons'
import ModalResolve from 'components/Modal/ModalRsolve'
import TableRsolve from 'components/Table/TableRsolve'

type reasonForm = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

function Reason() {
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reasons, setReasons] = useState([]);
  const [displayedReasons, setDisplayedReasons] = useState([]); 
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
  });

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }
  
function openEditForm(reason: reasonForm) {
  setFormValues(reason); // Preenche o formulário com os dados do registro selecionado
}  

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // const response = await fetch("http://localhost:3344/reasons", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formValues),
      // });

      let url = "http://localhost:3344/reasons";
      let method = "POST";

      if (formValues.id) {
        // Se o ID estiver definido, estamos em modo de edição
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
        // Success, do something
        console.log("Reason created successfully!");
        openModal();
        // Fetch updated reasons from the API
        const updatedResponse = await fetch("http://localhost:3344/reasons");
        const updatedData = await updatedResponse.json();

        // Update reasons and displayedReasons states with new data
        setReasons(updatedData);
        setDisplayedReasons(updatedData.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage));

        setFormValues({id: "", name: "" }); // Limpa o formulário
        
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3344/reasons");
        const data = await response.json();

        setReasons(data);
        setDisplayedReasons(data.slice(0, resultsPerPage)); // Initialize displayedReasons
      } catch (error) {
        console.error("Error fetching reasons:", error);
      }
    };

    fetchData();
  }, []);

  
  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = reasons.length;

  // pagination change control
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  useEffect(() => {
    const startIndex = (pageTable - 1) * resultsPerPage;
    const endIndex = pageTable * resultsPerPage;

    setDisplayedReasons(reasons.slice(startIndex, endIndex));
  }, [pageTable, reasons]);

  return (
    <Layout>
      <PageTitle>Motivo da Reclamação</PageTitle>
      <SectionTitle>Cadastro de motivos</SectionTitle>
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <Label>
            <span>Motivo</span>
            <Input             
              name="name"
              value={formValues.name}
              onChange={handleChange} 
              className="mt-1" 
              placeholder="Informe o motivo da reclamação"
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

      <TableContainer className="mb-8">
        <TableRsolve
          data={reasons}
          columns={[
            { label: 'ID', key: 'id' },
            { label: 'Name', key: 'name' },
            { label: 'Created At', key: 'createdAt' },
            { label: 'Updated At', key: 'updatedAt' },
          ]}
          currentPage={pageTable}
          resultsPerPage={resultsPerPage}
          onPageChange={onPageChangeTable}          
          onEdit={openEditForm}
          onDelete={openEditForm}
        />        
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      {isModalOpen && (
        <ModalResolve
          modalHeader="Cadastro de Motivos"
          modalBody="Motivo de reclamação cadastrado com sucesso!"
          onClose={closeModal}
        />
      )}      
    </Layout>
  )
}

export default Reason 
