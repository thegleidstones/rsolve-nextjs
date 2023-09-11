import React, { useState } from 'react'

import PageTitle from 'example/components/Typography/PageTitle'
import Layout from 'example/containers/Layout'

import TableRsolve from 'components/Table/TableRsolve'
import { useGrievances } from 'hooks/Grievance/useGrievances'
import { useTables } from 'hooks/Table/useTable'
import { useSelectedGrievance } from 'hooks/GrievanceTreatment/useSelectedGrievance'
import { useRouter } from 'next/router'

function GrievanceTreatmentConsulting() {
  const { selectedGrievance, setSelectedGrievance } = useSelectedGrievance();
  const { grievances } = useGrievances();

  const router = useRouter();

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);
  const resultsPerPage = 5;
  const totalResults = grievances.length;

  const {
    displayedGrievances: displayedTableGrievances,
  } = useTables({
    data: grievances,
    pageTable,
    resultsPerPage,
  });

  // pagination change control
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  return (
    <Layout>
      <PageTitle>Tratar Reclamações</PageTitle>
      <TableRsolve
        data={grievances}
        columns={[
          // { label: 'ID', key: 'id' },
          { label: 'Data', key: 'createdAt' },
          { label: 'Protocolo', key: 'protocol' },
          { label: 'Situação', key: 'statusName' },
          { label: 'Reclamante', key: 'userName' },
          { label: 'Departamento', key: 'departmentName' },
        ]}
        currentPage={pageTable}
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        onPageChangeTable={onPageChangeTable}
        formButtons={false}
        onEdit={(grievance) => {
          setSelectedGrievance(grievance); // Define a reclamação selecionada para edição
          console.log("/** clicou no edit **/");
          console.log(grievance);
          router.push('/app/grievanceTreatment'); // Substitua pelo caminho correto
        }}
        onDelete={(grievance) => {
          setSelectedGrievance(grievance); // Define a reclamação selecionada para edição
          router.push('/app/grievanceTreatment'); // Substitua pelo caminho correto
        }}
      />
    </Layout>
  )
}

export default GrievanceTreatmentConsulting
