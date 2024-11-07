import React, { useState } from 'react'

import PageTitle from 'example/components/Typography/PageTitle'
import Layout from 'example/containers/Layout'

import ModalRsolveForm from 'components/Modal/ModalRsolveForm'
import TableRsolve from 'components/Table/TableRsolve'
import { useTables } from 'hooks/Table/useTable'
import { useModals } from 'hooks/Modal/useModals'
import { useComplaints } from 'hooks/Complaint/useComplaints'
import { useComplaintTreatment } from 'hooks/ComplaintTreatment/useComplaintTreament'

function ComplaintConsulting() {
  const { formData, handleSubmit, isSuccess } = useComplaintTreatment();
  const { isModalOpen, isDeleteModalOpen, modal, openModal, closeModal, openDeleteModal, closeDeleteModal } = useModals();
  const { complaints } = useComplaints();

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // pagination setup
  const resultsPerPage = 5;
  const totalResults = complaints.length;

  const {
    displayedComplaints: displayedTablecomplaints,
    // ... outras funções e estados do useTables
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
      <PageTitle>Consultar Denúncias</PageTitle>
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
        formButtons={true}
        onEdit={openDeleteModal}
        onDelete={openDeleteModal}
      />

      {isDeleteModalOpen && (
        <ModalRsolveForm
          data={modal}
          formData={formData}
          modalHeader="Denúncia"
          onClose={closeDeleteModal}
          onConfirm={handleSubmit}
          successMessage={isSuccess}
        />
      )}
    </Layout>
  )
}

export default ComplaintConsulting
