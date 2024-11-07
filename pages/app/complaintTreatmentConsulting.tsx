import React, { useState } from 'react'

import PageTitle from 'example/components/Typography/PageTitle'
import Layout from 'example/containers/Layout'

import TableRsolve from 'components/Table/TableRsolve'
import { useComplaints } from 'hooks/Complaint/useComplaints'
import { useTables } from 'hooks/Table/useTable'
import { useSelectedComplaint } from 'hooks/ComplaintTreatment/useSelectedComplaint'
import { useRouter } from 'next/router'

function ComplaintTreatmentConsulting() {
  const { selectedComplaint, setSelectedComplaint } = useSelectedComplaint();
  const { complaints } = useComplaints();

  const router = useRouter();

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);
  const resultsPerPage = 5;
  const totalResults = complaints.length;

  const {
    displayedGrievances: displayedTableGrievances,
  } = useTables({
    data: complaints,
    pageTable,
    resultsPerPage,
  });

  // pagination change control
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  return (
    <Layout>
      <PageTitle>Tratar Denúncias</PageTitle>
      <TableRsolve
        data={complaints}
        columns={[
          // { label: 'ID', key: 'id' },
          { label: 'Data', key: 'createdAt' },
          { label: 'Protocolo', key: 'protocol' },
          { label: 'Situação', key: 'statusName' },
          { label: 'Denunciante', key: 'userName' },
          { label: 'Departamento', key: 'departmentName' },
        ]}
        currentPage={pageTable}
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        onPageChangeTable={onPageChangeTable}
        formButtons={false}
        onEdit={(complaint) => {
          setSelectedComplaint(complaint); // Define a reclamação selecionada para edição
          console.log("/** clicou no edit **/");
          console.log(complaint);
          router.push('/app/complaintTreatment'); // Substitua pelo caminho correto
        }}
        onDelete={(complaint) => {
          setSelectedComplaint(complaint); // Define a reclamação selecionada para edição
          router.push('/app/complaintTreatment'); // Substitua pelo caminho correto
        }}
      />
    </Layout>
  )
}

export default ComplaintTreatmentConsulting
