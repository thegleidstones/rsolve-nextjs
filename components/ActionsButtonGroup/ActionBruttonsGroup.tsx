import React from 'react';
import { Button } from '@roketid/windmill-react-ui';

interface ActionButtonGroupProps {
  isFormValid: boolean;
  onSave: (e: any) => void;
  onCancel: (e: any) => void;
}

const ActionButtonGroup: React.FC<ActionButtonGroupProps> = ({ isFormValid, onSave, onCancel }) => {
  return (
    <>
      <div className="flex space-x-4">
        <Button 
          className="bg-lime-600 hover:bg-lime-500" 
          size="regular" 
          disabled={!isFormValid}
          onClick={onSave}
        >
          Salvar
        </Button>
        <Button className="bg-red-700 hover:bg-red-600" size="regular" onClick={onCancel}>
          Cancelar
        </Button>
      </div>    
    </>
  );
}

export default ActionButtonGroup;
