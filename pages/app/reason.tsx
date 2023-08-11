import React, { useEffect, useState } from 'react'

import { Input, Label, Button, TableContainer, Table, TableHeader, TableCell, TableBody, TableRow, Avatar, Badge, TableFooter, Pagination } from '@roketid/windmill-react-ui'
import PageTitle from 'example/components/Typography/PageTitle'
import SectionTitle from 'example/components/Typography/SectionTitle'

import Layout from 'example/containers/Layout'
import { EditIcon, TrashIcon } from 'icons'

function Reason() {
  
  const [reasons, setReasons] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3344/reasons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        // Success, do something
        console.log("Reason created successfully!");
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
        console.log(reasons);
      } catch (error) {
        console.error("Error fetching reasons:", error);
      }
    };

    fetchData();
  });

  
  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = reasons.length;

  // pagination change control
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setReasons(reasons.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage));
  }, [pageTable]);

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
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Reason</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              {/* <TableCell>Date</TableCell> */}
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {reasons.map((reason) => (
              <TableRow key={reason.id}>
                <TableCell>
                  <span className="text-sm">{reason.name}</span>
                </TableCell>
                {/* <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell> */}
                <TableCell>
                  <span className="text-sm">{new Date(reason.createdAt).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(reason.updatedAt).toLocaleDateString()}</span>
                </TableCell>                
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="small" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="small" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>      
    </Layout>
  )
}

export default Reason 
