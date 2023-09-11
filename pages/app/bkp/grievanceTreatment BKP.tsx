import React, { useEffect, useState } from 'react'

import { Label, Select, Textarea, Button } from '@roketid/windmill-react-ui'
import SectionTitle from 'example/components/Typography/SectionTitle'

import Layout from 'example/containers/Layout'
import { useGrievances } from 'hooks/Grievance/useGrievances'
import { useModals } from 'hooks/Modal/useModals'
import { fetchData } from 'hooks/FetchData/fecthData'
import ActionButtonGroup from 'components/ActionsButtonGroup/ActionBruttonsGroup'
import { useRouter } from 'next/router'
import ModalResolve from 'components/Modal/ModalRsolve'
import { useSelectedGrievance } from 'hooks/GrievanceTreatment/useSelectedGrievance'

type Grievance = {
  id?: string;
  isAnonymous: boolean;
  isOccuredInYourCompany: boolean;
  isHaveAWitness: boolean;
  protocol?: string;
  grievanceDescription: string;
  witness?: string;
  witnessDepartmentId?: string;
  witnessDepartment: string;
  companyId: string;
  tradeName: string
  userId: string;
  userName: string;
  userEmail: string;
  branchId: string;
  departmentId: string;
  departmentName: string;
  factId: string;
  factName: string;
  statusId: string;
  statusName: string;
  reasonId: string;
  reasonName: string;
  createdAt: Date;
}

function GrievanceTreatment() {
  const { selectedGrievance, setSelectedGrievance } = useSelectedGrievance();
  const { grievances, formGrievance, setFormGrievance, handleSubmit, handleInactivate, handleChange } = useGrievances();
  const { isModalOpen, isDeleteModalOpen, modal, openModal, closeModal, openDeleteModal, closeDeleteModal } = useModals();
  const [isFormValid, setIsFormValid] = useState(false);
  // const [departments, setDepartments] = useState([]);
  // const [witnessDepartments, setWitnessDepartments] = useState([]);
  // const [companies, setCompanies] = useState([]);
  // const [facts, setFacts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [reasons, setReasons] = useState([]);
  const router = useRouter();
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Adicione esta variável de estado
  const [isSavedGrievance, setIsSavedGrievance] = useState(false); // Adicione esta variável de estado

  // Preenche o formulário com os dados do registro selecionado apenas na montagem inicial do componente
  useEffect(() => {
    console.log("/************** SELECTED GRIEVANCE VINDA DO CONTEXT ***********************/");
    console.log(selectedGrievance);
    console.log("/*************************************/");
    if (isInitialLoad && selectedGrievance) { // Verifica se é a montagem inicial
      setFormGrievance(selectedGrievance);
      setIsInitialLoad(false); // Define que a montagem inicial foi concluída
    }
  }, [selectedGrievance, setFormGrievance, isInitialLoad]);

  // Preenche o formulário com os dados do registro selecionado
  // useEffect(() => {
  //   console.log("/************** SELECTED GRIEVANCE VINDA DO CONTEXT ***********************/");
  //   console.log(selectedGrievance);
  //   console.log("/*************************************/");
  //   if (selectedGrievance) {
  //     setFormGrievance(selectedGrievance);
  //   console.log("/************** Form Values Preenchido pela Grievance ***********************/");
  //   console.log(formGrievance);
  //   console.log("/*************************************/");
  //   }
  // }, [selectedGrievance, setFormGrievance, formGrievance]);  

  useEffect(() => {
    if (isSavedGrievance) {
      console.log("/** PASSOU NO ISSAVED GRIEVANCE? **/");
      console.log(selectedGrievance);
      console.log("/**********************************/");

      fetchData("grievances/view", setSelectedGrievance, selectedGrievance?.id);

      console.log("/** PASSOU DE NOVO NO ISSAVED GRIEVANCE? **/");
      console.log(selectedGrievance);
      console.log("/******************************************/");
      setIsSavedGrievance(false);
      setIsInitialLoad(true);
    }
  }, [isInitialLoad, isSavedGrievance, selectedGrievance, setSelectedGrievance, selectedGrievance?.id]);


  useEffect(() => {
    fetchData("statuses", setStatuses, "");
  }, []);

  useEffect(() => {
    fetchData("reasons", setReasons, "");
  }, []);

  // useEffect(() => {
  //   fetchData("departments", setDepartments, "");
  // }, []);

  // useEffect(() => {
  //   fetchData("facts", setFacts, "");
  // }, []);

  // useEffect(() => {
  //   fetchData("companies", setCompanies, "");
  // }, []);

  // useEffect(() => {
  //   fetchData("departments", setWitnessDepartments, "");
  // }, []);

  // Realizado a validação do formulário
  useEffect(() => {
    console.log("O QUE TESMOS NO FORM VALUES");
    console.log(formGrievance);
    const isStatusValid = formGrievance.statusId.trim() !== '';
    const isReasonValid = formGrievance.reasonId.trim() !== '';
    setIsFormValid(isStatusValid && isReasonValid);
  }, [formGrievance]);
  
  function openEditForm(grievance: Grievance) {
    setFormGrievance(grievance); // Preenche o formulário com os dados do registro selecionado
  }

  function handleSave(e: any) {
    e.preventDefault();
    if (isFormValid) {
      handleSubmit(e);
      openModal();
      setIsSavedGrievance(true);
    } else {
      console.log("Não validou o form e por isso não enviou a REQ para a API!")
    }
  }

  return (
    <Layout>
      {/* <PageTitle>Tratamento de Reclamação</PageTitle> */}
      <SectionTitle>Informações da Reclamação</SectionTitle>
      
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className='flex flex-row mt-2'>
              <div className='mt-1 basis-1/4'>
                <span className='text-white px-1 py-1'>Protocolo: </span>
                <span className='bg-lime-600 text-white px-1 py-1'>
                  {/* RSLV-45454563 */}
                  {formGrievance.protocol}
                </span>                
              </div>
              <div className='mt-1 basis-1/4'>
                <span className='text-white px-1 py-1'>Status: </span>
                <span className='bg-red-600 text-white px-1 py-1'>
                  {/* Recebido */}
                  {formGrievance.statusName}
                </span>
              </div>
              <div className='mt-1 basis-1/4'>
                <span className='text-white px-1 py-1'>Data: </span>
                <span className='bg-red-600 text-white px-1 py-1'>
                  {/* 29/08/2023 */}
                  {formGrievance.createdAt.toLocaleString()}
                </span>
              </div>
              <div className='mt-1 basis-1/4'>
                <span className='text-white px-1 py-1'>Hora: </span>
                <span className='bg-red-600 text-white px-1 py-1'>
                  19:21                  
                  {/* {formGrievance.hora} */}
                </span>
              </div>
          </div>
          <div className='flex flex-row mt-2'>
              <div className='mt-1 basis-1/4'>
                <Label>
                  <span className='text-gray-400 px-1 py-1'>E-mail: </span>
                </Label>
                  <span className='text-white px-1 py-1'>
                    {/* gleidson@blugger.com.br */}
                    {formGrievance.userEmail}
                  </span>
              </div>
              <div className='mt-1 basis-1/4'>
                <Label>
                  <span className='text-gray-400 px-1 py-1'>Nome: </span>
                </Label>
                <span className='text-white px-1 py-1'>
                  {/* Gleidson Morais Silva */}
                  {formGrievance.userName}
                </span>                
              </div>
              <div className='mt-1 basis-1/4'>
                <Label>
                  <span className='text-gray-400 px-1 py-1'>Empresa: </span>
                </Label>
                <span className='text-white px-1 py-1'>
                  {/* Blugger Hub */}
                  {formGrievance.tradeName}
                </span>
              </div>
              <div className='mt-1 basis-1/4'>
                <Label>
                  <span className='text-gray-400 px-1 py-1'>Departamento: </span>
                </Label>
                <span className='text-white px-1 py-1'>
                  {/* TI */}
                  {formGrievance.departmentName}
                </span>
              </div>
          </div>
          <div className='flex flex-row mt-2'>
              <div className='mt-1 basis-1/4'>
                <Label>
                  <span className='text-gray-400 px-1 py-1'>Testemunha: </span>
                </Label>
                  <span className='text-white px-1 py-1'>
                    {/* Ana Luiza */}
                    {/* {data?.testemunha} */}
                    {formGrievance.witness}
                  </span>
              </div>
              <div className='mt-1 basis-1/4'>
                <Label>
                  <span className='text-gray-400 px-1 py-1'>Departamento Testemunha: </span>
                </Label>
                <span className='text-white px-1 py-1'>
                  {/* Recursos Humanos */}
                  {/* {data?.departamentoTestemunha} */}
                  {formGrievance.witnessDepartment}
                </span>                
              </div>
              <div className='mt-1 basis-2/4'>
                <Label>
                  <span className='text-gray-400 px-1 py-1'>Fato e Recorrência: </span>
                </Label>
                <span className='text-white px-1 py-1'>
                  {/* É um fato novo, ainda não tinha acontecido. */}
                  {formGrievance.factName}
                  {/* {data?.fato} */}
                </span>
              </div>
          </div>
          <div className='flex flex-row mt-2'>
            <div className='mt-1 basis-1/1'>
              <Label>
                <span className='text-gray-400 px-1 py-1'>Descritivo da reclamação: </span>
              </Label>
                <span className='text-white px-1 py-1'>
                  {formGrievance.grievanceDescription}
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nunc orci, pretium ac tellus in, fringilla dignissim dolor. Sed nisl orci, vehicula ac lectus eget, aliquam rutrum turpis. Sed iaculis purus iaculis diam placerat hendrerit. Sed sit amet sollicitudin lectus. Vivamus elementum metus purus, sed consectetur diam cursus non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur a consequat dolor, eu consequat lacus. Praesent feugiat lorem libero, ac semper tortor accumsan id. Sed at faucibus velit. Nunc ex arcu, interdum a felis non, interdum porta dui. Donec in semper metus. Phasellus cursus consequat interdum. Nullam in justo vel leo vestibulum consectetur. Cras aliquam nibh quis sodales aliquet. Cras turpis erat, tempus ac ante consequat, placerat tristique magna. Praesent dictum est ac pellentesque tempor. */}
                  {/* {data?.descritivoReclamacao} */}
                </span>
            </div>
          </div>
          <form>
            <div className='flex flex-row'>
              <div className='mt-2 basis-1/3 px-1 py-1'>
                <Label className="mt-4">
                  <span>Selecione o novo status</span>
                  <Select 
                    className="mt-1"
                    name="statusId"
                    value={formGrievance.statusId}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setFormGrievance({ ...formGrievance, statusId: newValue });
                    }}
                  >
                    <option value="">Selecione uma opção</option>
                    {statuses.map((status) => (
                      <option key={ status.id } value={status.id}>
                        { status.name }
                      </option>
                    ))}            
                  </Select>
                </Label>
              </div>
              <div className='mt-2 basis-1/3 px-1 py-1'>
                <Label className="mt-4">
                  <span>Informe o motivo da reclamação: </span>
                  <Select 
                    className="mt-1"
                    name="reasonId"
                    value={formGrievance.reasonId}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setFormGrievance({ ...formGrievance, reasonId: newValue });
                    }}
                  >
                    <option value="">Selecione uma opção</option>
                    {reasons.map((reason) => (
                      <option key={ reason.id } value={reason.id}>
                        { reason.name }
                      </option>
                    ))}            
                  </Select>
                </Label>
              </div>
              <div className='mt-2 basis-1/3 px-1 py-1'>
                <Label className="mt-4">
                  <Button 
                    className="bg-lime-600 hover:bg-lime-500 mt-6" 
                    size="regular" 
                    disabled={!isFormValid}
                    onClick={handleSave}
                  >
                    Atualizar Reclamação
                  </Button>                
                </Label>
              </div>            
            </div>
          </form>

          {/* <div className='flex flex-row'>
            <div className='basis-1/2'>
              <div className='flex flex-row'>
                <div className='basis-1/2 px-1'>
                  <Label className="mt-2">
                    <span>Nome</span>
                      <Input
                        name="name"
                        // value={formGrievance.name}
                        // onChange={handleChange} 
                        // value={data?.reclamante}
                        readOnly={true}
                        className="mt-1"
                        // disabled={true}
                      />
                  </Label>
                </div>
                <div className='basis-1/2 px-1'>
                  <Label className="mt-2">
                    <span>Email</span>
                      <Input
                        name="email"
                        // value={formGrievance.name}
                        // onChange={handleChange} 
                        // value={data?.email}
                        readOnly={true}
                        className="mt-1"
                        // disabled={true}
                      />
                  </Label>
                </div>
              </div>
              <div className='flex flex-row'>
                <div className='basis-1/2 px-1'>
                  <Label className="mt-2">
                    <span>Empresa</span>
                      <Input
                        name="company"
                        // value={formGrievance.name}
                        // onChange={handleChange} 
                        // value={data?.empresa}
                        readOnly={true}
                        className="mt-1"
                        // disabled={true}
                      />
                  </Label>
                </div>
                <div className='basis-1/2 px-1'>
                  <Label className="mt-2">
                    <span>Departamento</span>
                      <Input
                        name="department"
                        // value={formGrievance.name}
                        // onChange={handleChange}
                        // value={data?.departamento}
                        readOnly={true}
                        className="mt-1 text-lime-600"
                        // disabled={true}
                      />
                  </Label>
                </div>
              </div>
              <div className='flex flex-row'>
                <div className='basis-1/2 px-1'>
                  <Label className="mt-2">
                    <span>Testemunha</span>
                      <Input
                        name="witness"
                        // value={formGrievance.name}
                        // onChange={handleChange} 
                        // value={data?.testemunha}
                        readOnly={true}
                        className="mt-1"
                        // disabled={true}
                      />
                  </Label>
                </div>
                <div className='basis-1/2 px-1'>
                  <Label className="mt-2">
                    <span>Departamento</span>
                      <Input
                        name="witnessDepartment"
                        // value={formGrievance.name}
                        // onChange={handleChange}
                        // value={data?.dptestemunha}
                        readOnly={true}
                        className="mt-1"
                        // disabled={true}
                      />
                  </Label>
                </div>           
              </div>
            </div>              
            <div className='basis-1/2'>
              <Label className="mt-2 px-1">
                <span>Reclamação/Queixa</span>
                <Textarea 
                  className="mt-1" 
                  rows={8}
                  // disabled={true}
                  // value={data?.reclamacao}
                  name="grievanceDescription"
                  readOnly={true}
                  // value={formGrievance.grievanceDescription}
                  // onChange={handleChange} 
                />
              </Label>
            </div>
          </div> */}

          {/* <div className="flex flex-col flex-wrap space-y-4 md:flex-row md:items-end md:space-x-4 px-4 py-3 mb-6">
          </div>
          <ActionButtonGroup
            isFormValid={isFormValid}
            onSave= {handleSave}
            onCancel={() => {
              router.push('/app/home'); // Redirecionamento para a rota /app/home
            }}
          /> */}
        </div>

      <SectionTitle>Tratamento de Reclamação</SectionTitle>      
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form action="">
          <div className='mt-1'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Descreva com detalhes quais os tratamentos para a reclamação: </span>
            </Label>
            <Textarea 
              className="mt-1" 
              rows={4}
              name="grievanceDescription"
              value={formGrievance.grievanceDescription}
              onChange={handleChange} 
              placeholder="Descreva sua reclamação/queixa com o máximo de detalhes possíveis."
              />
          </div>
          <div className="flex flex-col flex-wrap space-y-4 md:flex-row md:items-end md:space-x-4 px-4 mb-6">
          </div>          
          <ActionButtonGroup
            isFormValid={isFormValid}
            onSave= {handleSave}
            onCancel={() => {
              router.push('/app/home'); // Redirecionamento para a rota /app/home
            }}
          />          
        </form>
      </div>

      {isModalOpen && (
        <ModalResolve
          modalHeader="Registro de Reclamações"
          modalBody="Sua reclamação foi registrada com sucesso! Acompanhe seu protocolo para os demais andamentos!"
          onClose={closeModal}
          successMessage={true}
        />
      )};
    </Layout>
  )
}

export default GrievanceTreatment
