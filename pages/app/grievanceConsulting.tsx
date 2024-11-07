import React, { useState } from 'react'

import PageTitle from 'example/components/Typography/PageTitle'
import Layout from 'example/containers/Layout'

import ModalRsolveForm from 'components/Modal/ModalRsolveForm'
import TableRsolve from 'components/Table/TableRsolve'
import { useGrievances } from 'hooks/Grievance/useGrievances'
import { useTables } from 'hooks/Table/useTable'
import { useModals } from 'hooks/Modal/useModals'
import { useGrievanceTreatment } from 'hooks/GrievanceTreatment/useGrievanceTreament'

function GrievanceConsulting() {
  const { formData, handleSubmit, isSuccess } = useGrievanceTreatment();
  const { isModalOpen, isDeleteModalOpen, modal, openModal, closeModal, openDeleteModal, closeDeleteModal } = useModals();
  const { grievances } = useGrievances();

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // pagination setup
  const resultsPerPage = 5;
  const totalResults = grievances.length;

  const {
    displayedGrievances: displayedTableGrievances,
    // ... outras funções e estados do useTables
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
      <PageTitle>Consultar Reclamações</PageTitle>
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
        formButtons={true}
        onEdit={openDeleteModal}
        onDelete={openDeleteModal}
      />

      {isDeleteModalOpen && (
        <ModalRsolveForm
          data={modal}
          formData={formData}
          modalHeader="Reclamação"
          onClose={closeDeleteModal}
          onConfirm={handleSubmit}
          successMessage={isSuccess}
        />
      )}
    </Layout>
  )
}

export default GrievanceConsulting
