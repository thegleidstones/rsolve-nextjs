import React, { useContext, useEffect, useState } from 'react'

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
import { useGrievanceTreatment } from 'hooks/GrievanceTreatment/useGrievanceTreament'
import TableRsolve from 'components/Table/TableRsolve'
import { useTables } from 'hooks/Table/useTable'
import { AuthContext } from 'context/AuthContext'

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
  const { user, company } = useContext(AuthContext);
  const { selectedGrievance } = useSelectedGrievance();
  // const { handleSubmit } = useGrievances();
  const { grievancesTreatments, setGrievancesTreatments, formGrievanceTreatment, setFormGrievanceTreatment, handleSubmitGrievanceTreatment } = useGrievanceTreatment();
  const { isModalOpen, openModal, closeModal, openDeleteModal } = useModals();
  const [isFormValid, setIsFormValid] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Adicione esta variável de estado
  const [isLoadedFormGrievanceTreatment, setIsLoadedFormGrievanceTreatment] = useState(true); // Adicione esta variável de estado
  const [isSavedGrievance, setIsSavedGrievance] = useState(false); // Adicione esta variável de estado
  const [formGrievance, setFormGrievance] = useState<Grievance>({
    id: "",
    isAnonymous: false,
    isOccuredInYourCompany: false,
    isHaveAWitness: false,
    protocol: "",
    grievanceDescription: "",
    witness: "",
    witnessDepartmentId: "",
    witnessDepartment: "",
    companyId: "",
    tradeName: "",
    reasonId: "",
    reasonName: "",
    userId: "",
    userName: "",
    userEmail: "",
    branchId: "62cf61af-23a7-4236-9eb9-69e297fd15dc",
    departmentId: "",
    departmentName: "",
    factId: "",
    factName: "",
    createdAt: new Date(),
    statusId: "",
    statusName: "",
  });

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // pagination setup
  const resultsPerPage = 5;
  const totalResults = grievancesTreatments.length;

  // pagination change control
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  const {
    displayedcategories: displayedTablecategories,
    // ... outras funções e estados do useTables
  } = useTables({
    data: grievancesTreatments,
    pageTable,
    resultsPerPage,
  });


  // Preenche o formulário com os dados do registro selecionado apenas na montagem inicial do componente
  useEffect(() => {
    if (isInitialLoad && selectedGrievance) { // Verifica se é a montagem inicial
      setFormGrievance(selectedGrievance);

      console.log("/** Grievance Selecionada na tabela **/");
      console.log(selectedGrievance);


      setIsInitialLoad(false); // Define que a montagem inicial foi concluída
    }
  }, [selectedGrievance, formGrievance, setFormGrievance, formGrievanceTreatment, setFormGrievanceTreatment, isInitialLoad]);

  console.log("/** Form Grievance  **/");
  console.log(formGrievance);

  useEffect(() => {
    if (isLoadedFormGrievanceTreatment && selectedGrievance) {
      setFormGrievanceTreatment({
        treatmentDescription: "",
        grievanceId: selectedGrievance.id,
        companyId: company?.id,
        userId: user?.id,
      });


      setIsLoadedFormGrievanceTreatment(false);
    }
  }, [company, user, formGrievanceTreatment, setFormGrievanceTreatment, selectedGrievance, isLoadedFormGrievanceTreatment]);

  console.log("O que temos nesse form Grievance Treatment?");
  console.log(formGrievanceTreatment);

  // useEffect(() => {
  //   if (isSavedGrievance) {
  //     fetchData("grievances/view", setSelectedGrievance, selectedGrievance?.id);
  //     setIsSavedGrievance(false);
  //     setIsInitialLoad(true);
  //   }
  // }, [isInitialLoad, isSavedGrievance, selectedGrievance, setSelectedGrievance, selectedGrievance?.id]);

  useEffect(() => {
    if (formGrievanceTreatment) {
      fetchData("grievances-treatments/view/id", setGrievancesTreatments, formGrievanceTreatment.grievanceId);
      console.log("Deu erro aki???");
    }

  }, [setGrievancesTreatments, formGrievanceTreatment]);

  useEffect(() => {
    fetchData("statuses", setStatuses, "");
  }, []);

  useEffect(() => {
    fetchData("reasons", setReasons, "");
  }, []);

  // Realizado a validação do formulário
  useEffect(() => {
    const isStatusValid = formGrievance.statusId.trim() !== '';
    const isReasonValid = formGrievance.reasonId.trim() !== '';
    const isTreatmentDescriptionValid = formGrievanceTreatment.treatmentDescription.trim() !== '' && formGrievanceTreatment.treatmentDescription.length >= 20
    setIsFormValid(isStatusValid && isReasonValid && isTreatmentDescriptionValid);
  }, [formGrievance, formGrievanceTreatment]);

  function openEditForm(grievance: Grievance) {
    setFormGrievance(grievance); // Preenche o formulário com os dados do registro selecionado
  }

  async function handleSubmitGrievance(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      let url = "http://localhost:3344/grievances";
      let method = "POST";

      if (formGrievance.id) {
        url += `/${formGrievance.id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formGrievance),
      });

      if (response.ok) {
        console.log("Analisando o RESPONSE!");
        console.log(response);
        console.log("Grievance created successfully!");
        // fetchData("grievances", setGrievances, "");
        setFormGrievance({
          id: "",
          isAnonymous: true,
          isOccuredInYourCompany: true,
          isHaveAWitness: false,
          protocol: "",
          grievanceDescription: "",
          witness: "",
          witnessDepartmentId: "",
          witnessDepartment: "",
          companyId: company?.id,
          tradeName: "",
          reasonId: "",
          reasonName: "",
          userId: user?.id,
          userName: "",
          userEmail: "",
          branchId: "62cf61af-23a7-4236-9eb9-69e297fd15dc",
          departmentId: "",
          departmentName: "",
          factId: "",
          factName: "",
          createdAt: new Date(),
          statusId: "",
          statusName: "",
        });
      } else {
        console.error("Error creating grievance");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleSave(e: any) {
    e.preventDefault();
    if (isFormValid) {
      handleSubmitGrievance(e);
      handleSubmitGrievanceTreatment();
      console.log("Enviando GT");
      console.log()
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
              {formGrievance.protocol}
            </span>
          </div>
          <div className='mt-1 basis-1/4'>
            <span className='text-white px-1 py-1'>Status: </span>
            <span className='bg-red-600 text-white px-1 py-1'>
              {formGrievance.statusName}
            </span>
          </div>
          <div className='mt-1 basis-1/4'>
            <span className='text-white px-1 py-1'>Data: </span>
            <span className='bg-red-600 text-white px-1 py-1'>
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
              {formGrievance.userEmail}
            </span>
          </div>
          <div className='mt-1 basis-1/4'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Nome: </span>
            </Label>
            <span className='text-white px-1 py-1'>
              {formGrievance.userName}
            </span>
          </div>
          <div className='mt-1 basis-1/4'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Empresa: </span>
            </Label>
            <span className='text-white px-1 py-1'>
              {formGrievance.tradeName}
            </span>
          </div>
          <div className='mt-1 basis-1/4'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Departamento: </span>
            </Label>
            <span className='text-white px-1 py-1'>
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
              {formGrievance.witness}
            </span>
          </div>
          <div className='mt-1 basis-1/4'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Departamento Testemunha: </span>
            </Label>
            <span className='text-white px-1 py-1'>
              {formGrievance.witnessDepartment}
            </span>
          </div>
          <div className='mt-1 basis-2/4'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Fato e Recorrência: </span>
            </Label>
            <span className='text-white px-1 py-1'>
              {formGrievance.factName}
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
            </span>
          </div>
        </div>
      </div>

      <SectionTitle>Tratamento de Reclamação</SectionTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form>
          <div className='mt-1'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Descreva com detalhes quais os tratamentos para a reclamação: </span>
            </Label>
            <Textarea
              className="mt-1"
              rows={4}
              name="treatmentDescription"
              value={formGrievanceTreatment.treatmentDescription}
              onChange={(e) => {
                const newValue = e.target.value;
                setFormGrievanceTreatment({ ...formGrievanceTreatment, treatmentDescription: newValue });
              }}
              placeholder="Descreva sua reclamação/queixa com o máximo de detalhes possíveis."
            />
          </div>
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
                    <option key={status.id} value={status.id}>
                      {status.name}
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
                    <option key={reason.id} value={reason.id}>
                      {reason.name}
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
      </div>

      <SectionTitle>Tratamentos Já Realizados</SectionTitle>
      <TableRsolve
        data={grievancesTreatments}
        columns={[
          { label: 'Protocolo', key: 'protocol' },
          { label: 'Data', key: 'treatmentCreatedAt' },
          { label: 'Tratamento', key: 'treatmentDescription' },
        ]}
        currentPage={pageTable}
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        onPageChangeTable={onPageChangeTable}
        onEdit={openEditForm}
        onDelete={openDeleteModal}
        formButtons={true}
      />

      {/* <form action="">
          <div className="flex flex-col flex-wrap space-y-4 md:flex-row md:items-end md:space-x-4 px-4 mb-6">
          </div>          
          <ActionButtonGroup
            isFormValid={isFormValid}
            onSave= {handleSave}
            onCancel={() => {
              router.push('/app/home'); // Redirecionamento para a rota /app/home
            }}
          />          
        </form> */}

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
