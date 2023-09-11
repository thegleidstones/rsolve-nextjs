import React, { useEffect, useState } from 'react'

import { Input, Label, HelperText } from '@roketid/windmill-react-ui'
import PageTitle from 'example/components/Typography/PageTitle'
import SectionTitle from 'example/components/Typography/SectionTitle'

import Layout from 'example/containers/Layout'
import { useUsers } from 'hooks/User/useUsers'
import { useModals } from 'hooks/Modal/useModals'
import { useRouter } from 'next/router'
import { useTables } from 'hooks/Table/useTable'
import ActionButtonGroup from 'components/ActionsButtonGroup/ActionBruttonsGroup'
import ModalResolve from 'components/Modal/ModalRsolve'
import TableRsolve from 'components/Table/TableRsolve'

type User = {
  id: string;
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  company_id: string,
}

function User() {

  // const [users, setcompanies] = useState([]);
  // const [facts, setFacts] = useState([]);

  const { users, formValues, setFormValues, handleSubmit, handleInactivate, handleChange } = useUsers();
  const { isModalOpen, isDeleteModalOpen, modal, openModal, closeModal, openDeleteModal, closeDeleteModal } = useModals();
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // pagination setup
  const resultsPerPage = 5;
  const totalResults = users.length;

  const {
    displayedcompanies: displayedTablecompanies,
    // ... outras funções e estados do useTables
  } = useTables({
    data: users,
    pageTable,
    resultsPerPage,
  });
  
  function openEditForm(user: User) {
    setFormValues(user); // Preenche o formulário com os dados do registro selecionado
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

  // Realizado a validação do formulário
  useEffect(() => {
    const isNameValid = formValues.name.trim() !== '' && formValues.name.length >= 2;
    const isEmailValid = formValues.email.trim() !== '' && formValues.email.length >= 4;
    const isPasswordValid = formValues.password.trim() !== '' && formValues.password.length >= 8;
    const isPasswordConfirmValid = formValues.password.trim() !== '' && formValues.passwordConfirm.length >= 8;
    const isCompanyIdValid = formValues.company_id.trim() !== '' && formValues.company_id.length >= 4;
    const isTwoPasswordsValids = formValues.password === formValues.passwordConfirm;
   
    setIsFormValid(
        isNameValid && 
        isEmailValid && 
        isPasswordValid &&
        isPasswordConfirmValid &&
        isCompanyIdValid);
  }, 
  [
    formValues.name, 
    formValues.email, 
    formValues.password, 
    formValues.passwordConfirm, 
    formValues.company_id,
  ]);


  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:3344/users", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formValues),
  //     });

  //     if (response.ok) {
  //       // Success, do something
  //       console.log("User created successfully!");
  //     } else {
  //       // Handle error
  //       console.error("Error creating status");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const handleChange = (e: any) => {
  //   const { name, value, type } = e.target;
  //    // If the field is a radio button, use the checked value
  //   const fieldValue = type === "radio" ? (e.target.checked ? value : "") : value;

  //   setFormValues((prevValues) => ({ ...prevValues, [name]: fieldValue }));
  // };

  return (
    <Layout>
      <PageTitle>Usuário</PageTitle>
      <SectionTitle>Cadastro de Usuários</SectionTitle>
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <Label className="py-2" >
            <span>Nome</span>
            <Input 
              name="name"
              value={formValues.name}
              onChange={handleChange}  
              className="mt-1" 
              placeholder="Informe o nome do completo do funcionário" />
            {!isFormValid && (
              <HelperText>O nome deve possuir pelo menos 4 caracteres.</HelperText>
            )}                  
          </Label>

          <Label className="py-2" >
            <span>E-mail</span>
            <Input
              type="email"
              name="email" 
              value={formValues.email}
              onChange={handleChange}
              className="mt-1" 
              placeholder="email@email.com" />
            {!isFormValid && (
              <HelperText>Informe o email.</HelperText>
            )}                  
          </Label>

          <Label className="py-2" >
            <span>Senha</span>
            <Input 
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange} 
              className="mt-1" 
              placeholder="**********************" />
            {!isFormValid && (
              <HelperText>A senha deve possuir no mínimo 6 caractesres alfa numéricos.</HelperText>
            )}                  
          </Label>

          <Label className="py-2" >
            <span>Confirmação da Senha</span>
            <Input 
              type="password"
              name="passwordConfirm"
              value={formValues.passwordConfirm}
              onChange={handleChange} 
              className="mt-1" 
              placeholder="**********************" />
            {!isFormValid && (
              <HelperText>A senha deve possuir no mínimo 6 caractesres alfa numéricos.</HelperText>
            )}                  
          </Label>

          <Label className="py-2" >
            <span>Empresa</span>
            <Input 
              name="company_id" 
              value={formValues.company_id}
              onChange={handleChange}                    
              className="mt-1" 
              placeholder="Informe o ID da empresa" />
            {!isFormValid && (
              <HelperText>O endereço deve ter pelo menos 4 caracteres.</HelperText>
            )}                  
          </Label>

          {/* <div className="flex flex-col flex-wrap space-y-4 md:flex-row md:items-end md:space-x-4 px-4 py-3 mb-6">
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
          </div> */}
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
        data={users}
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Nome', key: 'name' },
          { label: 'E-mail', key: 'email' },
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
          modalHeader="Cadastro de Usuários"
          modalBody="Usuário cadastrado com sucesso!"
          onClose={closeModal}
          successMessage={true}
        />
      )};

    {isDeleteModalOpen && (
      <ModalResolve
        modalHeader="Excluir Usuário"
        modalBody={`Deseja realmente excluir o usuário: ${modal?.name}?`}
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

export default User
