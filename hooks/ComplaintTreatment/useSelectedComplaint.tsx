import { useState, createContext, useContext, ReactNode } from 'react';

type SelectedComplaintContextType = {
  selectedComplaint: Complaint | null;
  setSelectedComplaint: (grievance: Complaint | null) => void;
};

type SelectedComplaintProviderProps = {
  children: ReactNode;
};

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

export const SelectedComplaintContext = createContext({} as SelectedComplaintContextType);

export function useSelectedComplaint() {
  const context = useContext(SelectedComplaintContext);
  if (!context) {
    throw new Error('useSelectedComplaint must be used within a SelectedComplaintProvider');
  }
  return context;
}

export function SelectedComplaintProvider({ children }: SelectedComplaintProviderProps) {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  return (
    <SelectedComplaintContext.Provider value={{ selectedComplaint, setSelectedComplaint }}>
      {children}
    </SelectedComplaintContext.Provider>
  );
}
