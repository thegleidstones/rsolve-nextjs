import { AuthContext } from 'context/AuthContext';
import { useContext, useState } from 'react';

type GrievanceTreatment = {
  id?: string;
  treatmentDescription: string
  isAnonymous: boolean;
  isOccuredInYourCompany: boolean;
  isHaveAWitness: boolean;
  protocol?: string;
  grievanceId?: string;
  grievanceDescription: string;
  witness?: string;
  witnessDepartmentId?: string;
  witnessDepartment: string;
  companyId: string;
  tradeName: string
  userId: string;
  userName: string;
  userEmail: string;
  userTreatmentId: string;
  userTreatmentName: string;
  userTreatmentEmail: string;
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

export function useGrievanceTreatment() {
  const { user, company } = useContext(AuthContext);
  const [grievancesTreatments, setGrievancesTreatments] = useState<GrievanceTreatment[]>([]);
  const [formGrievanceTreatment, setFormGrievanceTreatment] = useState({
    treatmentDescription: "",
    grievanceId: "",
    companyId: company?.id,
    userId: user?.id,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // const handleChangeGrievanceTreatment = (field, value) => {
  //   setFormGrievanceTreatment({
  //     ...formGrievanceTreatment,
  //     [field]: value,
  //   });
  // };

  const handleSubmitGrievanceTreatment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Aqui você pode fazer a chamada à API externa
      const response = await fetch('http://localhost:3344/grievances-treatments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formGrievanceTreatment),
      });

      if (response.ok) {
        setIsSuccess(true);
        console.log('Grievance Treatment created successfully!');
        // Pode adicionar lógica adicional aqui, como atualizar a lista de reclamações tratadas
      } else {
        console.log('Error on Grievance Treatment create!');
      }
    } catch (err) {
      console.log('Error on Grievance Treatment create!');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    grievancesTreatments,
    setGrievancesTreatments,
    formGrievanceTreatment,
    setFormGrievanceTreatment,
    isLoading,
    error,
    isSuccess,
    // handleChangeGrievanceTreatment,
    handleSubmitGrievanceTreatment,
  };
}
