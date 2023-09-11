import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Input, Label, HelperText } from '@roketid/windmill-react-ui';
import PageTitle from 'example/components/Typography/PageTitle';
import SectionTitle from 'example/components/Typography/SectionTitle';

import Layout from 'example/containers/Layout';
import ActionButtonGroup from 'components/ActionsButtonGroup/ActionBruttonsGroup';
import ModalResolve from 'components/Modal/ModalRsolve';
import TableRsolve from 'components/Table/TableRsolve';

import { useReasons } from 'hooks/Reason/useReasons';
import { useTables } from 'hooks/Table/useTable';
import { useModals } from 'hooks/Modal/useModals';

type Reason = {
  id: string;
  name: string;
  companyId: string;
}

function Reason() {
  const { reasons, formValues, setFormValues, handleSubmit, handleInactivate, handleChange } = useReasons();
  const { isModalOpen, isDeleteModalOpen, modal, openModal, closeModal, openDeleteModal, closeDeleteModal } = useModals();
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // pagination setup
  const resultsPerPage = 5;
  const totalResults = reasons.length;

  const {
    displayedReasons: displayedTableReasons,
    // ... outras funções e estados do useReasonsTables
  } = useTables({
    data: reasons,
    pageTable,
    resultsPerPage,
  });
  
  function openEditForm(reason: Reason) {
    setFormValues(reason); // Preenche o formulário com os dados do registro selecionado
  }  

  // pagination change control
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  function handleSave(e: any) {
    e.preventDefault();
    if (isFormValid) {
      handleSubmit(e);
      openModal();
    }
  }

  useEffect(() => {
    setIsFormValid(formValues.name.trim() !== '' && formValues.name.length >= 4);
  }, [formValues.name]);  

  return (
    <Layout>
      <PageTitle>Motivo da Reclamação</PageTitle>
      <SectionTitle>Cadastro de motivos</SectionTitle>
      <form>
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
            {!isFormValid && (
              <HelperText>O nome do motivo deve ter pelo menos 4 caracteres.</HelperText>
            )}            
          </Label>

            <div className="flex flex-col flex-wrap space-y-4 md:flex-row md:items-end md:space-x-4 px-4 py-3 mb-6">
            </div>

            <ActionButtonGroup
              isFormValid={isFormValid} 
              onSave= {handleSave}
              onCancel={() => {
                router.push('/app/home'); // Redirecionamento para a rota /app/home
              }}
            />
        </div>
      </form>

      <TableRsolve
        data={reasons}
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Name', key: 'name' },
        ]}
        currentPage={pageTable}
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        onPageChangeTable={onPageChangeTable}
        onEdit={openEditForm}
        onDelete={openDeleteModal}
      />

      {isModalOpen && (
        <ModalResolve
          modalHeader="Cadastro de Motivos"
          modalBody="Motivo de reclamação cadastrado com sucesso!"
          onClose={closeModal}
          successMessage={true}
        />
      )};

    {isDeleteModalOpen && (
      <ModalResolve
        modalHeader="Excluir Motivo"
        modalBody={`Deseja realmente excluir o motivo: ${modal?.name}?`}
        onClose={closeDeleteModal}
        onConfirm={() => {
          if (modal) {
            handleInactivate(modal.id);
          }
          closeDeleteModal();
        }}
        successMessage={false}
      />
    )}
    </Layout>
  )
}

export default Reason 
