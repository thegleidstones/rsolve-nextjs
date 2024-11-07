import axios from 'axios';
import { AuthContext } from 'context/AuthContext';
import { fetchData } from 'hooks/FetchData/fecthData';
import { useCallback, useContext, useEffect, useState } from 'react';

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

export function useGrievances() {
  const { user, company } = useContext(AuthContext);
  const [reasons, setReasons] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [defaultValuesSet, setDefaultValuesSet] = useState(false);
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [formGrievance, setFormGrievance] = useState<Grievance>({
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
    branchId: "c18f69df-7ed8-480d-9f25-1bb19e2df2ba",
    departmentId: "",
    departmentName: "",
    factId: "",
    factName: "",
    createdAt: new Date(),
    statusId: "",
    statusName: "",
  });

  useEffect(() => {
    fetchData("departments", setDepartments, "");
  }, []);

  useEffect(() => {
    fetchData("reasons", setReasons, "");
  }, []);

  useEffect(() => {
    fetchData("statuses", setStatuses, "");
  }, []);

  // Preenche o formulário com os dados do registro selecionado apenas na montagem inicial do componente
  useEffect(() => {
    if (statuses.length > 0 && reasons.length > 0 && !defaultValuesSet) {
      console.log("PAssou aki depois do sAVE????")
      const defaultDepartment = departments.find((department) => department.name === "Anônimo");
      const defaultReason = reasons.find((reason) => reason.name === "Não categorizado");
      const defaultStatus = statuses.find((status) => status.name === "Recebido");

      if (defaultStatus && defaultReason && defaultDepartment) {
        // Preencha o formGrievanceTreatment com os dados necessários
        setFormGrievance({
          id: "",
          isAnonymous: true,
          isOccuredInYourCompany: true,
          isHaveAWitness: false,
          protocol: "",
          grievanceDescription: "",
          witness: "",
          witnessDepartmentId: defaultDepartment.id,
          witnessDepartment: "",
          companyId: company?.id,
          tradeName: "",
          reasonName: "",
          userId: user?.id,
          userName: "",
          userEmail: "",
          branchId: "c18f69df-7ed8-480d-9f25-1bb19e2df2ba",
          departmentId: "",
          departmentName: "",
          factId: "",
          factName: "",
          createdAt: new Date(),
          statusName: "",
          statusId: defaultStatus.id,
          reasonId: defaultReason.id,
        });

        console.log("Passou nesse useEffect do useGrievances?");
        console.log(formGrievance);

        // Defina o estado para evitar que este código seja executado novamente
        setDefaultValuesSet(true);
      }
    }
  }, [formGrievance, departments, reasons, statuses, user, company, defaultValuesSet]);

  useEffect(() => {
    fetchData("grievances/view", setGrievances, "");
  }, []);

  async function handleSubmitOld(e: React.FormEvent<HTMLFormElement>) {
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

      console.log("Analisando o RESPONSE!");
      console.log(response);

      if (response.ok) {
        console.log("Analisando o RESPONSE!");
        console.log(response);
        console.log(response.body);
        console.log(response.formData);
        console.log(response.status);
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
          branchId: "c18f69df-7ed8-480d-9f25-1bb19e2df2ba",
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, setProtocol: any) {
    e.preventDefault();

    try {
      let url = "http://localhost:3344/grievances";
      let method = "POST";

      if (formGrievance.id) {
        url += `/${formGrievance.id}`;
        method = "PUT";
      }

      const formJson = JSON.stringify(formGrievance);

      const response = await axios.post(url, formJson, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setProtocol(response.data.protocol);

      if (response.status === 201) {
        setDefaultValuesSet(false);

        // setFormGrievance({
        //   id: "",
        //   isAnonymous: true,
        //   isOccuredInYourCompany: true,
        //   isHaveAWitness: false,
        //   protocol: "",
        //   grievanceDescription: "",
        //   witness: "",
        //   witnessDepartmentId: "",
        //   witnessDepartment: "",
        //   companyId: company?.id,
        //   tradeName: "",
        //   reasonId: "",
        //   reasonName: "",
        //   userId: user?.id,
        //   userName: "",
        //   userEmail: "",
        //   branchId: "c18f69df-7ed8-480d-9f25-1bb19e2df2ba",
        //   departmentId: "",
        //   departmentName: "",
        //   factId: "",
        //   factName: "",
        //   createdAt: new Date(),
        //   statusId: "",
        //   statusName: "",
        // });
      } else {
        console.error("Error creating grievance");
      }
    } catch (error) {
      console.error("Error:", error);
      setProtocol("error");
    }
  }

  const handleInactivate = useCallback(async (grievanceId) => {
    try {
      const response = await fetch(`http://localhost:3344/grievances/inactivate/${grievanceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Grievance inactivated successfully!');
        // fetchData("grievances", setGrievances, "");
        // Aqui você pode atualizar o estado de grievances após a inativação
      } else {
        console.error('Error inactivating grievance');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormGrievance((prevValues) => ({ ...prevValues, [name]: value }));
  }

  return {
    grievances,
    setGrievances,
    formGrievance,
    setFormGrievance,
    handleSubmit,
    handleInactivate,
    handleChange,
  };
}
