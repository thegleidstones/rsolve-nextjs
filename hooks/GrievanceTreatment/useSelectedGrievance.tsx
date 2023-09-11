import { useState, createContext, useContext, ReactNode } from 'react';

type SelectedGrievanceContextType = {
  selectedGrievance: Grievance | null;
  setSelectedGrievance: (grievance: Grievance | null) => void;
};

type SelectedGrievanceProviderProps = {
  children: ReactNode;
};

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

export const SelectedGrievanceContext = createContext({} as SelectedGrievanceContextType);

export function useSelectedGrievance() {
  const context = useContext(SelectedGrievanceContext);
  if (!context) {
    throw new Error('useSelectedGrievance must be used within a SelectedGrievanceProvider');
  }
  return context;
}

export function SelectedGrievanceProvider({ children }: SelectedGrievanceProviderProps) {
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);

  return (
    <SelectedGrievanceContext.Provider value={{ selectedGrievance, setSelectedGrievance }}>
      {children}
    </SelectedGrievanceContext.Provider>
  );
}
