import React, { useEffect, useState } from 'react'

import { Input, Label, Button, TableContainer, Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, Pagination } from '@roketid/windmill-react-ui'
import PageTitle from 'example/components/Typography/PageTitle'
import SectionTitle from 'example/components/Typography/SectionTitle'

import Layout from 'example/containers/Layout'
import { EditIcon, TrashIcon } from 'icons'

function Status() {
  const [statuses, setStatuses] = useState([]);
  const [displayedStatuses, setDisplayedStatuses] = useState([]); 
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

        // Fetch updated reasons from the API
        const updatedResponse = await fetch("http://localhost:3344/statuses");
        const updatedData = await updatedResponse.json();

        // Update reasons and displayedReasons states with new data
        setStatuses(updatedData);
        setDisplayedStatuses(updatedData.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage));
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
        const response = await fetch("http://localhost:3344/statuses");
        const data = await response.json();

        setStatuses(data);
        setDisplayedStatuses(data.slice(0, resultsPerPage)); // Initialize displayedReasons
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
  const totalResults = statuses.length;

  // pagination change control
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  useEffect(() => {
    const startIndex = (pageTable - 1) * resultsPerPage;
    const endIndex = pageTable * resultsPerPage;

    setDisplayedStatuses(statuses.slice(startIndex, endIndex));
  }, [pageTable, statuses]);

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
            {displayedStatuses.map((status) => (
              <TableRow key={status.id}>
                <TableCell>
                  <span className="text-sm">{status.name}</span>
                </TableCell>
                {/* <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell> */}
                <TableCell>
                  <span className="text-sm">{new Date(status.createdAt).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(status.updatedAt).toLocaleDateString()}</span>
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

export default Status 
