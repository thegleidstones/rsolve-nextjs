import { AuthContext } from 'context/AuthContext';
import { useContext, useState } from 'react';

type ComplaintTreatment = {
  id?: string;
  treatmentDescription: string
  isAnonymous: boolean;
  isOccuredInYourCompany: boolean;
  isHaveAWitness: boolean;
  protocol?: string;
  complaintId?: string;
  complaintDescription: string;
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

export function useComplaintTreatment() {
  const { user, company } = useContext(AuthContext);
  const [complaintsTreatments, setComplaintsTreatments] = useState<ComplaintTreatment[]>([]);
  const [formComplaintTreatment, setFormComplaintTreatment] = useState({
    treatmentDescription: "",
    complaintId: "",
    companyId: company?.id,
    userId: user?.id,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // const handleChangeComplaintTreatment = (field, value) => {
  //   setFormComplaintTreatment({
  //     ...formComplaintTreatment,
  //     [field]: value,
  //   });
  // };

  const handleSubmitComplaintTreatment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Aqui você pode fazer a chamada à API externa
      const response = await fetch('http://localhost:3344/complaints-treatments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formComplaintTreatment),
      });

      if (response.ok) {
        setIsSuccess(true);
        console.log('Complaint Treatment created successfully!');
        // Pode adicionar lógica adicional aqui, como atualizar a lista de reclamações tratadas
      } else {
        console.log('Error on Complaint Treatment create!');
      }
    } catch (err) {
      console.log('Error on Complaint Treatment create!');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    complaintsTreatments,
    setComplaintsTreatments,
    formComplaintTreatment,
    setFormComplaintTreatment,
    isLoading,
    error,
    isSuccess,
    // handleChangeComplaintTreatment,
    handleSubmitComplaintTreatment,
  };
}
