import { useState } from 'react';

export function useModals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modal, setModal] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = (data: any) => {
    setModal(data);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModal(null);
    setIsDeleteModalOpen(false);
  };

  return {
    isModalOpen,
    isDeleteModalOpen,
    modal,
    openModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
  };
}
