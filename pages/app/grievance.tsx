import React, { useEffect, useState } from 'react'

import { Input, Label, Select, Textarea, Button } from '@roketid/windmill-react-ui'
import PageTitle from 'example/components/Typography/PageTitle'
import SectionTitle from 'example/components/Typography/SectionTitle'

import Layout from 'example/containers/Layout'
import { MailIcon } from 'icons'
import { useGrievances } from 'hooks/Grievance/useGrievances'
import { useModals } from 'hooks/Modal/useModals'
import { fetchData } from 'hooks/FetchData/fecthData'
import ActionButtonGroup from 'components/ActionsButtonGroup/ActionBruttonsGroup'
import { useRouter } from 'next/router'
import ModalResolve from 'components/Modal/ModalRsolve'

type Grievance = {
  id?: string;
  isAnonymous: number;
  isOccuredInYourCompany: number;
  isHaveAWitness: number;
  protocol?: string;
  grievanceDescription: string;
  witness?: string;
  witnessDepartmentId?: string;
  companyId: string;
  userId: string;
  branchId: string;
  departmentId: string;
  factId: string;
  statusId: string;
  reasonId: string;
}

function Grievance() {
  const { grievances, formGrievance, setFormGrievance, handleSubmit, handleInactivate, handleChange } = useGrievances();
  const { isModalOpen, isDeleteModalOpen, modal, openModal, closeModal, openDeleteModal, closeDeleteModal } = useModals();
  const [isFormValid, setIsFormValid] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [protocol, setProtocol] = useState([]);
  const [witnessDepartments, setWitnessDepartments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [facts, setFacts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const router = useRouter();

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:3344/grievances", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formGrievance),
  //     });

  //     if (response.ok) {
  //       // Success, do something
  //       console.log("Grievance created successfully!");
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

  //   setFormGrievance((prevValues) => ({ ...prevValues, [name]: fieldValue }));
  // };

  useEffect(() => {
    fetchData("statuses", setStatuses, "");
  }, []);

  useEffect(() => {
    fetchData("departments", setDepartments, "");
  }, []);

  useEffect(() => {
    fetchData("facts", setFacts, "");
  }, []);

  useEffect(() => {
    fetchData("companies", setCompanies, "");
  }, []);

  useEffect(() => {
    fetchData("departments", setWitnessDepartments, "");
  }, []);

  // Realizado a validação do formulário
  useEffect(() => {
    const isGrievanceDescriptionValid = formGrievance.grievanceDescription.trim() !== '' && formGrievance.grievanceDescription.length >= 20;
    setIsFormValid(isGrievanceDescriptionValid);
  }, [formGrievance.grievanceDescription]);

  function openEditForm(grievance: Grievance) {
    setFormGrievance(grievance); // Preenche o formulário com os dados do registro selecionado
  }

  function handleSave(e: any) {
    e.preventDefault();
    if (isFormValid) {
      handleSubmit(e, setProtocol);
      openModal();
    } else {
      console.log("Não validou o form e por isso não enviou a REQ para a API!")
    }
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const responseFacts = await fetch("http://localhost:3344/facts");

  //       const dataFacts = await responseFacts.json();

  //       setFacts(dataFacts);
  //     } catch (error) {
  //       console.error("Error fetching facts:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <Layout>
      <PageTitle>Reclamação/Queixa</PageTitle>
      <SectionTitle>Registre sua reclamação/queixa</SectionTitle>
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

          {/* <Label>
            <span>Título</span>
            <Input className="mt-1" placeholder="Informe um título para a reclamação/queixa" />
          </Label> */}
          <div className="mt-4 pb-3">
            {/* TODO: Check if this label is accessible, or fallback */}
            {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
            <Label>Prefere manter o anonimato ao enviar a reclamação?</Label>
            <div className="mt-2">
              <Label radio>
                <Input
                  type="radio"
                  name="isAnonymous"
                  value="true"
                  checked={formGrievance.isAnonymous === "true"}
                  onChange={handleChange}
                />
                <span className="ml-2">Sim</span>
              </Label>
              <Label className="ml-6" radio>
                <Input
                  type="radio"
                  name="isAnonymous"
                  value="false"
                  checked={formGrievance.isAnonymous === "false"}
                  onChange={handleChange}
                />
                <span className="ml-2">Não</span>
              </Label>
            </div>
          </div>

          <div className="mt-4 pb-3">
            {/* TODO: Check if this label is accessible, or fallback */}
            {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
            <Label>O fato ocorrido aconteceu na empresa em que trabalha?</Label>
            <div className="mt-2">
              <Label radio>
                <Input
                  type="radio"
                  name="isOccuredInYourCompany"
                  value="true"
                  checked={formGrievance.isOccuredInYourCompany === "true"}
                  onChange={handleChange}
                />
                <span className="ml-2">Sim</span>
              </Label>
              <Label className="ml-6" radio>
                <Input
                  type="radio"
                  name="isOccuredInYourCompany"
                  value="false"
                  checked={formGrievance.isOccuredInYourCompany === "false"}
                  onChange={handleChange}
                />
                <span className="ml-2">Não</span>
              </Label>
            </div>
          </div>

          <Label className="mt-4">
            <span>Nos ajude a identificar o início do problema informando a empresa e o departamento envolvido nessa reclamação</span>
            <Label className="mt-4">
              <span>Empresa</span>
              <Select
                className="mt-1"
                name="companyId"
                disabled={formGrievance.isOccuredInYourCompany === "true"}
                value={formGrievance.companyId}
                onChange={handleChange}
              >
                <option value="">Selecione uma empresa</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.companyName}
                  </option>
                ))}
              </Select>
            </Label>
            <Label className="mt-4">
              <span>Departamento</span>
              <Select
                className="mt-1"
                name="departmentId"
                value={formGrievance.departmentId}
                onChange={handleChange}
              >
                <option value="">Selecione um departamento</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </Select>
            </Label>
          </Label>

          <Label className="mt-4">
            <span>Essa reclamação é um fato isolado ou um fato recorrente?</span>
            <Select
              className="mt-1"
              name="factId"
              value={formGrievance.factId}
              onChange={handleChange}
            >
              <option value="">Selecione uma opção</option>
              {facts.map((fact) => (
                <option key={fact.id} value={fact.id}>
                  {fact.name}
                </option>
              ))}
            </Select>
          </Label>

          <Label className="mt-4">
            <span>Status da Reclamação</span>
            <Select
              disabled={true}
              className="mt-1"
              name="statusId"
              value={formGrievance.statusId}
              onChange={handleChange}
            >
              <option value="">Selecione uma opção</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </Select>
          </Label>

          <div className="mt-4 pb-3">
            {/* TODO: Check if this label is accessible, or fallback */}
            {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
            <Label>Existe alguma testemunha para essa reclamação/queixa?</Label>
            <div className="mt-2">
              <Label radio>
                <Input
                  type="radio"
                  name="isHaveAWitness"
                  value="true"
                  checked={formGrievance.isHaveAWitness === "true"}
                  onChange={handleChange}
                />
                <span className="ml-2">Sim</span>
              </Label>
              <Label className="ml-6" radio>
                <Input
                  type="radio"
                  name="isHaveAWitness"
                  value="false"
                  checked={formGrievance.isHaveAWitness === "false"}
                  onChange={handleChange}
                />
                <span className="ml-2">Não</span>
              </Label>
            </div>
          </div>
          <Label>
            <span>Nome da Testemunha</span>
            <Input
              className="mt-1"
              disabled={formGrievance.isHaveAWitness === "false"}
              name="witness"
              value={formGrievance.witness}
              onChange={handleChange}
              placeholder="Informe a testemunha para esse cadastro"
            />
          </Label>
          <Label>
            <span>Departamento em que a testemunha trabalha</span>
            <Select
              className="mt-1"
              disabled={formGrievance.isHaveAWitness === "false"}
              name="witnessDepartmentId"
              value={formGrievance.witnessDepartmentId}
              onChange={handleChange}
            >
              <option value="">Selecione um departamento</option>
              {witnessDepartments.map((witnessDepartment) => (
                <option key={witnessDepartment.id} value={witnessDepartment.id}>
                  {witnessDepartment.name}
                </option>
              ))}
            </Select>
          </Label>


          <Label className="mt-4">
            <span>Reclamação/Queixa</span>
            <Textarea
              className="mt-1"
              rows={10}
              name="grievanceDescription"
              value={formGrievance.grievanceDescription}
              onChange={handleChange}
              placeholder="Descreva sua reclamação/queixa com o máximo de detalhes possíveis." />
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
            onSave={handleSave}
            onCancel={() => {
              router.push('/app/home'); // Redirecionamento para a rota /app/home
            }}
          />

        </div>
      </form>

      {isModalOpen && (
        <ModalResolve
          modalHeader="Registro de Reclamações"
          modalBody={protocol}
          onClose={closeModal}
          successMessage={true}
        />
      )};
    </Layout>
  )
}

export default Grievance
