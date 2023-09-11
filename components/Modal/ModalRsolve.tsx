import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@roketid/windmill-react-ui';

type ModalResolveProps = {
  modalHeader: string;
  modalBody: string;
  onClose: () => void;
  onConfirm?: () => void; // O onConfirm é opcional
  successMessage?: boolean; // Adicionamos um flag para identificar se é uma mensagem de sucesso
};

const ModalResolve: React.FC<ModalResolveProps> = ({ modalHeader, modalBody, onConfirm, onClose, successMessage }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalHeader>{modalHeader}</ModalHeader>
      <ModalBody>{modalBody}</ModalBody>
      <ModalFooter>
        {successMessage ? (
          // Mostra apenas o botão "Ok!" para mensagens de sucesso
          <Button className="bg-lime-600 hover:bg-lime-500" onClick={onClose}>
            Ok!
          </Button>
        ) : (
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
        )}
      </ModalFooter>
    </Modal>
  );
};

export default ModalResolve;
