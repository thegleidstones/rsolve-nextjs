import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Select, Textarea, Input } from '@roketid/windmill-react-ui';
import { useGrievanceTreatment } from 'hooks/GrievanceTreatment/useGrievanceTreament';

type ModalResolveProps = {
  data: any;
  formData: any;
  modalHeader: string;
  onClose: () => void;
  onConfirm?: () => void; // O onConfirm é opcional
  successMessage?: boolean; // Adicionamos um flag para identificar se é uma mensagem de sucesso
};

const ModalRsolveForm: React.FC<ModalResolveProps> = ({ data, formData, modalHeader, onConfirm, onClose }) => {
  const { handleChange } = useGrievanceTreatment();

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalHeader>{modalHeader}</ModalHeader>
      <ModalBody inputMode='text'>
        <div className='flex flex-row mt-2'>
          <div className='basis-1/2'>
            <span className='text-white px-1 py-1'>Protocolo: </span>
            <span className='bg-lime-600 text-white px-1 py-1'>
              {data?.protocol}
            </span>
          </div>
          <div className='basis-1/2'>
            <span className='text-white px-1 py-1'>Status: </span>
            <span className='bg-red-600 text-white px-1 py-1'>
              {data?.statusName}
            </span>
            <span className='text-white px-1 py-1'>Data: </span>
            <span className='bg-red-600 text-white px-1 py-1'>
              {data?.createdAt}
            </span>
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='basis-2/4 px-1'>
            <Label className="mt-2">
              <span>Nome</span>
              <Input
                name="name"
                // value={formValues.name}
                // onChange={handleChange} 
                value={data?.userName}
                readOnly={true}
                className="mt-1"
              // disabled={true}
              />
            </Label>
          </div>
          <div className='basis-2/4 px-1'>
            <Label className="mt-2">
              <span>Email</span>
              <Input
                name="email"
                // value={formValues.name}
                // onChange={handleChange} 
                value={data?.userEmail}
                readOnly={true}
                className="mt-1"
              // disabled={true}
              />
            </Label>
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='basis-2/4 px-1'>
            <Label className="mt-2">
              <span>Empresa</span>
              <Input
                name="company"
                // value={formValues.name}
                // onChange={handleChange} 
                value={data?.tradeName}
                readOnly={true}
                className="mt-1"
              // disabled={true}
              />
            </Label>
          </div>
          <div className='basis-2/4 px-1'>
            <Label className="mt-2">
              <span>Departamento</span>
              <Input
                name="department"
                // value={formValues.name}
                // onChange={handleChange}
                value={data?.departmentName}
                readOnly={true}
                className="mt-1 text-lime-600"
              // disabled={true}
              />
            </Label>
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='basis-2/4 px-1'>
            <Label className="mt-2">
              <span>Testemunha</span>
              <Input
                name="witness"
                // value={formValues.name}
                // onChange={handleChange} 
                value={data?.witness}
                readOnly={true}
                className="mt-1"
              // disabled={true}
              />
            </Label>
          </div>
          <div className='basis-2/4 px-1'>
            <Label className="mt-2">
              <span>Departamento</span>
              <Input
                name="witnessDepartment"
                // value={formValues.name}
                // onChange={handleChange}
                value={data?.witnessDepartment}
                readOnly={true}
                className="mt-1"
              // disabled={true}
              />
            </Label>
          </div>
        </div>
        <Label className="mt-2 px-1">
          <span>{data?.grievanceDescription ? "Reclamação/Queixa" : "Denúncia"}</span>
          {/* <span>Reclamação/Queixa</span> */}
          <Textarea
            className="mt-1"
            rows={6}
            // disabled={true}
            value={data?.grievanceDescription || data?.complaintDescription}
            name="grievanceDescription"
            readOnly={true}
          // value={formValues.grievanceDescription}
          // onChange={handleChange} 
          />
        </Label>
      </ModalBody>
      <ModalFooter>
        <Button className="bg-lime-600 hover:bg-lime-500" onClick={onClose}>
          Ok!
        </Button>
        {/* ) : (
          // Mostra os botões "Cancelar" e "Confirmar" para modal de exclusão/inativação
          <>
            <div className="hidden sm:block">
              <Button className="bg-red-600 hover:bg-red-500" onClick={onClose}>
                Cancelar
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button className="bg-lime-600 hover:bg-lime-500" onClick={onConfirm}>
                Confirmar
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button className="bg-red-600 hover:bg-red-500" block size="large" onClick={onClose}>
                Cancelar
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button className="bg-lime-600 hover:bg-lime-500" block size="large" onClick={onConfirm}>
                Confirmar
              </Button>
            </div>
          </>
        )} */}
      </ModalFooter>
    </Modal>
  );
};

export default ModalRsolveForm;
