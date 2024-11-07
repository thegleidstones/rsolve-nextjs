import axios from 'axios';
import { AuthContext } from 'context/AuthContext';
import { fetchData } from 'hooks/FetchData/fecthData';
import { useCallback, useContext, useEffect, useState } from 'react';

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

export function useComplaints() {
  const { user, company } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [defaultValuesSet, setDefaultValuesSet] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [formComplaint, setFormComplaint] = useState<Complaint>({
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

  useEffect(() => {
    fetchData("departments", setDepartments, "");
  }, []);

  useEffect(() => {
    fetchData("categories", setCategories, "");
  }, []);

  useEffect(() => {
    fetchData("statuses", setStatuses, "");
  }, []);

  // Preenche o formulário com os dados do registro selecionado apenas na montagem inicial do componente
  useEffect(() => {
    if (statuses.length > 0 && categories.length > 0 && !defaultValuesSet) {
      console.log("PAssou aki depois do sAVE????")
      const defaultDepartment = departments.find((department) => department.name === "Anônimo");
      const defaultCategory = categories.find((category) => category.name === "Não categorizado");
      const defaultStatus = statuses.find((status) => status.name === "Recebido");

      if (defaultStatus && defaultCategory && defaultDepartment) {
        // Preencha o formComplaintTreatment com os dados necessários
        setFormComplaint({
          id: "",
          isAnonymous: true,
          isOccuredInYourCompany: true,
          isHaveAWitness: false,
          protocol: "",
          complaintDescription: "",
          witness: "",
          witnessDepartmentId: defaultDepartment.id,
          witnessDepartment: "",
          companyId: company?.id,
          tradeName: "",
          categoryName: "",
          userId: user?.id,
          userName: "",
          userEmail: "",
          departmentId: "",
          departmentName: "",
          factId: "",
          factName: "",
          createdAt: new Date(),
          statusName: "",
          statusId: defaultStatus.id,
          categoryId: defaultCategory.id,
        });

        console.log("Passou nesse useEffect do useComplaints?");
        console.log(formComplaint);

        // Defina o estado para evitar que este código seja executado novamente
        setDefaultValuesSet(true);
      }
    }
  }, [formComplaint, departments, categories, statuses, user, company, defaultValuesSet]);

  useEffect(() => {
    fetchData("complaints/view", setComplaints, "");
  }, []);

  async function handleSubmitOld(e: React.FormEvent<HTMLFormElement>) {
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

      console.log("Analisando o RESPONSE!");
      console.log(response);

      if (response.ok) {
        console.log("Analisando o RESPONSE!");
        console.log(response);
        console.log(response.body);
        console.log(response.formData);
        console.log(response.status);
        console.log("Complaint created successfully!");
        // fetchData("Complaints", setComplaints, "");
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
        console.error("Error creating Complaint");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, setProtocol: any) {
    e.preventDefault();

    try {
      let url = "http://localhost:3344/complaints";
      let method = "POST";

      if (formComplaint.id) {
        url += `/${formComplaint.id}`;
        method = "PUT";
      }

      const formJson = JSON.stringify(formComplaint);

      const response = await axios.post(url, formJson, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setProtocol(response.data.protocol);

      if (response.status === 201) {
        setDefaultValuesSet(false);

        // setFormComplaint({
        //   id: "",
        //   isAnonymous: true,
        //   isOccuredInYourCompany: true,
        //   isHaveAWitness: false,
        //   protocol: "",
        //   complaintDescription: "",
        //   witness: "",
        //   witnessDepartmentId: "",
        //   witnessDepartment: "",
        //   companyId: company?.id,
        //   tradeName: "",
        //   categoryId: "",
        //   categoryName: "",
        //   userId: user?.id,
        //   userName: "",
        //   userEmail: "",
        //   departmentId: "",
        //   departmentName: "",
        //   factId: "",
        //   factName: "",
        //   createdAt: new Date(),
        //   statusId: "",
        //   statusName: "",
        // });
      } else {
        console.error("Error creating Complaint");
      }
    } catch (error) {
      console.error("Error:", error);
      setProtocol("error");
    }
  }

  const handleInactivate = useCallback(async (complaintId) => {
    try {
      const response = await fetch(`http://localhost:3344/complaints/inactivate/${complaintId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Complaint inactivated successfully!');
        // fetchData("Complaints", setComplaints, "");
        // Aqui você pode atualizar o estado de Complaints após a inativação
      } else {
        console.error('Error inactivating Complaint');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormComplaint((prevValues) => ({ ...prevValues, [name]: value }));
  }

  return {
    complaints,
    setComplaints,
    formComplaint,
    setFormComplaint,
    handleSubmit,
    handleInactivate,
    handleChange,
  };
}
