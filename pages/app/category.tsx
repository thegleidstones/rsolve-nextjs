import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Input, Label, HelperText } from '@roketid/windmill-react-ui';
import PageTitle from 'example/components/Typography/PageTitle';
import SectionTitle from 'example/components/Typography/SectionTitle';

import Layout from 'example/containers/Layout';
import ActionButtonGroup from 'components/ActionsButtonGroup/ActionBruttonsGroup';
import ModalResolve from 'components/Modal/ModalRsolve';
import TableRsolve from 'components/Table/TableRsolve';

import { useTables } from 'hooks/Table/useTable';
import { useModals } from 'hooks/Modal/useModals';
import { useCategories } from 'hooks/Category/useCategories';

type Category = {
  id: string;
  name: string;
  companyId: string;
}

function Category() {
  const { categories, formValues, setFormValues, handleSubmit, handleInactivate, handleChange } = useCategories();
  const { isModalOpen, isDeleteModalOpen, modal, openModal, closeModal, openDeleteModal, closeDeleteModal } = useModals();
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // pagination setup
  const resultsPerPage = 5;
  const totalResults = categories.length;

  const {
    displayedcategories: displayedTablecategories,
    // ... outras funções e estados do useTables
  } = useTables({
    data: categories,
    pageTable,
    resultsPerPage,
  });
  
  function openEditForm(category: Category) {
    setFormValues(category); // Preenche o formulário com os dados do registro selecionado
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
      <PageTitle>Categorias de Denúncias</PageTitle>
      <SectionTitle>Cadastro de Categorias</SectionTitle>
      <form>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <Label>
            <span>nome</span>
            <Input             
              name="name"
              value={formValues.name}
              onChange={handleChange} 
              className="mt-1" 
              placeholder="Informe a categoria da denúncia"
            />
            {!isFormValid && (
              <HelperText>O nome da categoria deve ter pelo menos 4 caracteres.</HelperText>
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
        data={categories}
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
          modalHeader="Cadastro de Categorias"
          modalBody="Categorias de denúncia cadastradas com sucesso!"
          onClose={closeModal}
          successMessage={true}
        />
      )};

    {isDeleteModalOpen && (
      <ModalResolve
        modalHeader="Excluir Categoria"
        modalBody={`Deseja realmente excluir a categoria: ${modal?.name}?`}
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

export default Category 
