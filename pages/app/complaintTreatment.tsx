import React, { useContext, useEffect, useState } from 'react';

import { Label, Select, Textarea, Button } from '@roketid/windmill-react-ui';
import SectionTitle from 'example/components/Typography/SectionTitle';

import Layout from 'example/containers/Layout';
import { useGrievances } from 'hooks/Grievance/useGrievances';
import { useModals } from 'hooks/Modal/useModals';
import { fetchData } from 'hooks/FetchData/fecthData';
import ActionButtonGroup from 'components/ActionsButtonGroup/ActionBruttonsGroup';
import { useRouter } from 'next/router';
import ModalResolve from 'components/Modal/ModalRsolve';
import { useSelectedComplaint } from 'hooks/ComplaintTreatment/useSelectedComplaint';
import { useComplaintTreatment } from 'hooks/ComplaintTreatment/useComplaintTreament';
import TableRsolve from 'components/Table/TableRsolve';
import { useTables } from 'hooks/Table/useTable';
import { AuthContext } from 'context/AuthContext';

type Complaint = {
  id?: string;
  isAnonymous: boolean;
  isOccuredInYourCompany: boolean;
  isHaveAWitness: boolean;
  protocol?: string;
  complaintDescription: string;
  witness?: string;
  witnessDepartmentId?: string;
  witnessDepartment: string;
  companyId: string;
  tradeName: string
  userId: string;
  userName: string;
  userEmail: string;
  departmentId: string;
  departmentName: string;
  factId: string;
  factName: string;
  statusId: string;
  statusName: string;
  categoryId: string;
  categoryName: string;
  createdAt: Date;
}

function ComplaintTreatment() {
  const { user, company } = useContext(AuthContext);
  const { selectedComplaint } = useSelectedComplaint();
  // const { handleSubmit } = useGrievances();
  const { complaintsTreatments, setComplaintsTreatments, formComplaintTreatment, setFormComplaintTreatment, handleSubmitComplaintTreatment } = useComplaintTreatment();
  const { isModalOpen, openModal, closeModal, openDeleteModal } = useModals();
  const [isFormValid, setIsFormValid] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Adicione esta variável de estado
  const [isLoadedFormComplaintTreatment, setIsLoadedFormComplaintTreatment] = useState(true); // Adicione esta variável de estado
  const [isSavedGrievance, setIsSavedComplaint] = useState(false); // Adicione esta variável de estado
  const [formComplaint, setFormComplaint] = useState<Complaint>({
    id: "",
    isAnonymous: false,
    isOccuredInYourCompany: false,
    isHaveAWitness: false,
    protocol: "",
    complaintDescription: "",
    witness: "",
    witnessDepartmentId: "",
    witnessDepartment: "",
    companyId: "",
    tradeName: "",
    categoryId: "",
    categoryName: "",
    userId: "",
    userName: "",
    userEmail: "",
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
  const totalResults = complaintsTreatments.length;

  // pagination change control
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  const {
    displayedcategories: displayedTablecategories,
    // ... outras funções e estados do useTables
  } = useTables({
    data: complaintsTreatments,
    pageTable,
    resultsPerPage,
  });

  // Preenche o formulário com os dados do registro selecionado apenas na montagem inicial do componente
  useEffect(() => {
    if (isInitialLoad && selectedComplaint) { // Verifica se é a montagem inicial
      setFormComplaint(selectedComplaint);

      console.log("/** Complaint Selecionada na tabela **/");
      console.log(selectedComplaint);

      setIsInitialLoad(false); // Define que a montagem inicial foi concluída
    }
  }, [selectedComplaint, formComplaint, setFormComplaint, formComplaintTreatment, setFormComplaintTreatment, isInitialLoad]);

  console.log("/** Form Complaint  **/");
  console.log(formComplaint);

  useEffect(() => {
    if (isLoadedFormComplaintTreatment && selectedComplaint) {
      setFormComplaintTreatment({
        treatmentDescription: "",
        complaintId: selectedComplaint.id,
        companyId: company?.id,
        userId: user?.id,
      });


      setIsLoadedFormComplaintTreatment(false);
    }
  }, [company, user, formComplaintTreatment, setFormComplaintTreatment, selectedComplaint, isLoadedFormComplaintTreatment]);

  console.log("O que temos nesse form Complaint Treatment?");
  console.log(formComplaintTreatment);

  // useEffect(() => {
  //   if (isSavedGrievance) {
  //     fetchData("grievances/view", setSelectedGrievance, selectedComplaint?.id);
  //     setIsSavedComplaint(false);
  //     setIsInitialLoad(true);
  //   }
  // }, [isInitialLoad, isSavedGrievance, selectedComplaint, setSelectedGrievance, selectedComplaint?.id]);

  useEffect(() => {
    if (formComplaintTreatment) {
      fetchData("complaints-treatments/view/id", setComplaintsTreatments, formComplaintTreatment.complaintId);
      console.log("Deu erro aki???");
    }

  }, [setComplaintsTreatments, formComplaintTreatment]);

  useEffect(() => {
    fetchData("statuses", setStatuses, "");
  }, []);

  useEffect(() => {
    fetchData("categories", setCategories, "");
  }, []);

  // Realizado a validação do formulário
  useEffect(() => {
    const isStatusValid = formComplaint.statusId.trim() !== '';
    const isReasonValid = formComplaint.categoryId.trim() !== '';
    const isTreatmentDescriptionValid = formComplaintTreatment.treatmentDescription.trim() !== '' && formComplaintTreatment.treatmentDescription.length >= 20
    setIsFormValid(isStatusValid && isReasonValid && isTreatmentDescriptionValid);
  }, [formComplaint, formComplaintTreatment]);

  function openEditForm(complaint: Complaint) {
    setFormComplaint(complaint); // Preenche o formulário com os dados do registro selecionado
  }

  async function handleSubmitComplaint(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      let url = "http://localhost:3344/complaints";
      let method = "POST";

      if (formComplaint.id) {
        url += `/${formComplaint.id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formComplaint),
      });

      if (response.ok) {
        console.log("Analisando o RESPONSE!");
        console.log(response);
        console.log("Complaint created successfully!");
        // fetchData("grievances", setGrievances, "");
        setFormComplaint({
          id: "",
          isAnonymous: true,
          isOccuredInYourCompany: true,
          isHaveAWitness: false,
          protocol: "",
          complaintDescription: "",
          witness: "",
          witnessDepartmentId: "",
          witnessDepartment: "",
          companyId: company?.id,
          tradeName: "",
          categoryId: "",
          categoryName: "",
          userId: user?.id,
          userName: "",
          userEmail: "",
          departmentId: "",
          departmentName: "",
          factId: "",
          factName: "",
          createdAt: new Date(),
          statusId: "",
          statusName: "",
        });
      } else {
        console.error("Error creating complaint");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleSave(e: any) {
    e.preventDefault();
    if (isFormValid) {
      handleSubmitComplaint(e);
      handleSubmitComplaintTreatment();
      console.log("Enviando GT");
      console.log()
      openModal();
      setIsSavedComplaint(true);
    } else {
      console.log("Não validou o form e por isso não enviou a REQ para a API!")
    }
  }

  return (
    <Layout>
      {/* <PageTitle>Tratamento de Reclamação</PageTitle> */}
      <SectionTitle>Informações da Denúncia</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className='flex flex-row mt-2'>
          <div className='mt-1 basis-1/4'>
            <span className='text-white px-1 py-1'>Protocolo: </span>
            <span className='bg-lime-600 text-white px-1 py-1'>
              {formComplaint.protocol}
            </span>
          </div>
          <div className='mt-1 basis-1/4'>
            <span className='text-white px-1 py-1'>Status: </span>
            <span className='bg-red-600 text-white px-1 py-1'>
              {formComplaint.statusName}
            </span>
          </div>
          <div className='mt-1 basis-1/4'>
            <span className='text-white px-1 py-1'>Data: </span>
            <span className='bg-red-600 text-white px-1 py-1'>
              {formComplaint.createdAt.toLocaleString()}
            </span>
          </div>
          <div className='mt-1 basis-1/4'>
            <span className='text-white px-1 py-1'>Hora: </span>
            <span className='bg-red-600 text-white px-1 py-1'>
              19:21
              {/* {formComplaint.hora} */}
            </span>
          </div>
        </div>
        <div className='flex flex-row mt-2'>
          <div className='mt-1 basis-1/4'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>E-mail: </span>
            </Label>
            <span className='text-white px-1 py-1'>
              {formComplaint.userEmail}
            </span>
          </div>
          <div className='mt-1 basis-1/4'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Nome: </span>
            </Label>
            <span className='text-white px-1 py-1'>
              {formComplaint.userName}
            </span>
          </div>
          <div className='mt-1 basis-1/4'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Empresa: </span>
            </Label>
            <span className='text-white px-1 py-1'>
              {formComplaint.tradeName}
            </span>
          </div>
          <div className='mt-1 basis-1/4'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Departamento: </span>
            </Label>
            <span className='text-white px-1 py-1'>
              {formComplaint.departmentName}
            </span>
          </div>
        </div>
        <div className='flex flex-row mt-2'>
          <div className='mt-1 basis-1/4'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Testemunha: </span>
            </Label>
            <span className='text-white px-1 py-1'>
              {formComplaint.witness}
            </span>
          </div>
          <div className='mt-1 basis-1/4'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Departamento Testemunha: </span>
            </Label>
            <span className='text-white px-1 py-1'>
              {formComplaint.witnessDepartment}
            </span>
          </div>
          <div className='mt-1 basis-2/4'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Fato e Recorrência: </span>
            </Label>
            <span className='text-white px-1 py-1'>
              {formComplaint.factName}
            </span>
          </div>
        </div>
        <div className='flex flex-row mt-2'>
          <div className='mt-1 basis-1/1'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Descritivo da reclamação: </span>
            </Label>
            <span className='text-white px-1 py-1'>
              {formComplaint.complaintDescription}
            </span>
          </div>
        </div>
      </div>

      <SectionTitle>Tratamento de Denúncia</SectionTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form>
          <div className='mt-1'>
            <Label>
              <span className='text-gray-400 px-1 py-1'>Descreva com detalhes quais os tratamentos para a denúncia: </span>
            </Label>
            <Textarea
              className="mt-1"
              rows={4}
              name="treatmentDescription"
              value={formComplaintTreatment.treatmentDescription}
              onChange={(e) => {
                const newValue = e.target.value;
                setFormComplaintTreatment({ ...formComplaintTreatment, treatmentDescription: newValue });
              }}
              placeholder="Descreva sua denúncia com o máximo de detalhes possíveis."
            />
          </div>
          <div className='flex flex-row'>
            <div className='mt-2 basis-1/3 px-1 py-1'>
              <Label className="mt-4">
                <span>Selecione o novo status</span>
                <Select
                  className="mt-1"
                  name="statusId"
                  value={formComplaint.statusId}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFormComplaint({ ...formComplaint, statusId: newValue });
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
                <span>Informe a categoria da denúncia: </span>
                <Select
                  className="mt-1"
                  name="categoryId"
                  value={formComplaint.categoryId}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFormComplaint({ ...formComplaint, categoryId: newValue });
                  }}
                >
                  <option value="">Selecione uma opção</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
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
                  Atualizar Denúncia
                </Button>
              </Label>
            </div>
          </div>
        </form>
      </div>

      <SectionTitle>Tratamentos Já Realizados</SectionTitle>
      <TableRsolve
        data={complaintsTreatments}
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
          modalHeader="Tratamento de Denúncias"
          modalBody="Denúncia encaminhada para tratamento"
          onClose={closeModal}
          successMessage={true}
          protocolMessage={false}
        />
      )};
    </Layout>
  )
}

export default ComplaintTreatment
