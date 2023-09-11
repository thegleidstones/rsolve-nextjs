import React, { useEffect, useState } from 'react'

import { Input, Label, Button, HelperText } from '@roketid/windmill-react-ui'
import PageTitle from 'example/components/Typography/PageTitle'
import SectionTitle from 'example/components/Typography/SectionTitle'

import Layout from 'example/containers/Layout'
import { useCompanies } from 'hooks/Company/useCompanies'
import { useModals } from 'hooks/Modal/useModals'
import { useRouter } from 'next/router'
import { useTables } from 'hooks/Table/useTable'
import ActionButtonGroup from 'components/ActionsButtonGroup/ActionBruttonsGroup'
import ModalResolve from 'components/Modal/ModalRsolve'
import TableRsolve from 'components/Table/TableRsolve'

type Company = {
  id: string;
  cnpj: string,
  companyName: string,
  tradeName: string,
  address: string,
  neighborhood: string,
  zipCode: string,
  phone: string ,
  city: string,
  state: string,
}

function Company() {
  const { companies, formValues, setFormValues, handleSubmit, handleInactivate, handleChange } = useCompanies();
  const { isModalOpen, isDeleteModalOpen, modal, openModal, closeModal, openDeleteModal, closeDeleteModal } = useModals();
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // pagination setup
  const resultsPerPage = 5;
  const totalResults = companies.length;

  const {
    displayedcompanies: displayedTablecompanies,
    // ... outras funções e estados do useTables
  } = useTables({
    data: companies,
    pageTable,
    resultsPerPage,
  });

  // pagination change control
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  function openEditForm(company: Company) {
    setFormValues(company); // Preenche o formulário com os dados do registro selecionado
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
    const isCnpjValid = formValues.cnpj.trim() !== '' && formValues.cnpj.length >= 2;
    const isCompanyNameValid = formValues.companyName.trim() !== '' && formValues.companyName.length >= 4;
    const isTradeNameValid = formValues.tradeName.trim() !== '' && formValues.tradeName.length >= 4;
    const isAddressValid = formValues.address.trim() !== '' && formValues.address.length >= 4;
    const isCityValid = formValues.city.trim() !== '' && formValues.city.length >= 4;
    const isStateValid = formValues.state.trim() !== '' && formValues.state.length >= 2;
    const isZipCodeValid = formValues.zipCode.trim() !== '' && formValues.zipCode.length >= 4;
    const isPhoneValid = formValues.phone.trim() !== '' && formValues.phone.length >= 4;
    const isNeighborhoodValid = formValues.neighborhood.trim() !== '' && formValues.neighborhood.length >= 4;
   
    setIsFormValid(
        isCnpjValid && 
        isCompanyNameValid && 
        isTradeNameValid &&
        isAddressValid &&
        isCityValid &&
        isStateValid &&
        isZipCodeValid &&
        isPhoneValid &&
        isNeighborhoodValid);
  }, 
  [
    formValues.cnpj, 
    formValues.companyName, 
    formValues.tradeName, 
    formValues.address,
    formValues.city,
    formValues.state,
    formValues.zipCode,
    formValues.neighborhood,
    formValues.phone,
  ]);


  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:3344/companies", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formValues),
  //     });

  //     if (response.ok) {
  //       // Success, do something
  //       console.log("Company created successfully!");
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
      <PageTitle>Empresa</PageTitle>
      <SectionTitle>Cadastro de Empresa</SectionTitle>
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className='flex flex-row py-2'>
            <div className='basis-1/4 pr-3'>
              <Label>
                <span>CNPJ</span>
                <Input 
                  name="cnpj"
                  value={formValues.cnpj}
                  onChange={handleChange}  
                  className="mt-1" 
                  placeholder="00.000.000/0000-00" />
                {!isFormValid && (
                  <HelperText>CNPJ não pode ser vazio.</HelperText>
                )}                  
              </Label>
            </div>
            <div className='basis-3/4 pr-3'>
              <Label>
                <span>Razão Social</span>
                <Input 
                  name="companyName" 
                  value={formValues.companyName}
                  onChange={handleChange}
                  className="mt-1" 
                  placeholder="Informe o nome razão social da empresa" />
                {!isFormValid && (
                  <HelperText>O nome razão social deve ter pelo menos 4 caracteres.</HelperText>
                )}                  
              </Label>
            </div>
          </div>          
          <div className='flex flex-row py-2'>
            <div className='basis-1/3 pr-3'>
              <Label>
                <span>Nome Fantasia</span>
                <Input 
                  name="tradeName"
                  value={formValues.tradeName}
                  onChange={handleChange} 
                  className="mt-1" 
                  placeholder="Informe o nome fantasia para a empresa" />
                {!isFormValid && (
                  <HelperText>O nome fantasia deve ter pelo menos 4 caracteres.</HelperText>
                )}                  
              </Label>
            </div>
            <div className='basis-2/3 pr-3'>
              <Label>
                <span>Endereço</span>
                <Input 
                  name="address" 
                  value={formValues.address}
                  onChange={handleChange}                    
                  className="mt-1" 
                  placeholder="Informe o endereço da empresa" />
                {!isFormValid && (
                  <HelperText>O endereço deve ter pelo menos 4 caracteres.</HelperText>
                )}                  
              </Label>
            </div>
          </div>
          <div className='flex flex-row py-2'>
            <div className='basis-1/3 pr-3'>
              <Label>
                <span>Bairro</span>
                <Input 
                  name="neighborhood"
                  value={formValues.neighborhood}  
                  onChange={handleChange}                   
                  className="mt-1" 
                  placeholder="Informe o bairro" />
                {!isFormValid && (
                  <HelperText>O bairro deve ter pelo menos 4 caracteres.</HelperText>
                )}                  
              </Label>
            </div>
            <div className='basis-1/3 pr-3'>
              <Label>
                <span>CEP</span>
                <Input 
                  name="zipCode"
                  value={formValues.zipCode}  
                  onChange={handleChange}                   
                  className="mt-1" 
                  placeholder="Informe o CEP" />
                {!isFormValid && (
                  <HelperText>O CEP deve ser informado .</HelperText>
                )}                  
              </Label>
            </div>
            <div className='basis-1/3 pr-3'>
              <Label>
                <span>Telefone</span>
                <Input 
                  name="phone" 
                  value={formValues.phone}  
                  onChange={handleChange}                   
                  className="mt-1" 
                  placeholder="Informe o telefone" />
                {!isFormValid && (
                  <HelperText>Informe o telefone.</HelperText>
                )}                  
              </Label>
            </div>            
          </div>
          <div className='flex flex-row py-2'>
            <div className='basis-1/2 pr-3'>
              <Label>
                <span>Cidade</span>
                <Input 
                  name="city" 
                  value={formValues.city}  
                  onChange={handleChange}                   
                  className="mt-1" 
                  placeholder="Informe a cidade" />
                {!isFormValid && (
                  <HelperText>O nome cidade deve ter pelo menos 3 caracteres.</HelperText>
                )}                  
              </Label>
            </div>
            <div className='basis-1/2 pr-3'>
              <Label>
                <span>Estado</span>
                <Input 
                  name="state" 
                  value={formValues.state}  
                  onChange={handleChange}                   
                  className="mt-1" 
                  placeholder="Informe o estado" />
                {!isFormValid && (
                  <HelperText>O nome do estado deve ter pelo menos 2 caracteres.</HelperText>
                )}                  
              </Label>
            </div>
          </div>
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
        data={companies}
        columns={[
          { label: 'CNPJ', key: 'cnpj' },
          { label: 'Nome Fantasia', key: 'tradeName' },
          { label: 'Cidade', key: 'city' },
          { label: 'Estado', key: 'state' },
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
          modalHeader="Cadastro de Empresas"
          modalBody="Empresa cadastro com sucesso!"
          onClose={closeModal}
          successMessage={true}
        />
      )};

      {isDeleteModalOpen && (
        <ModalResolve
          modalHeader="Excluir Empresa"
          modalBody={`Deseja realmente excluir o Empresa: ${modal?.name}?`}
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

export default Company
