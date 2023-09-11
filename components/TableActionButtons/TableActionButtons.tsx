import React from 'react';
import PropTypes from 'prop-types';
import { EditIcon, OutlinePersonIcon, SearchIcon, TrashIcon } from 'icons';
import { Button } from '@roketid/windmill-react-ui';

interface TableActionButtonsProps<T> {
  item: T;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  formButtons: boolean;
}


function TableActionButtons<T>({ item, onEdit, onDelete, formButtons }: TableActionButtonsProps<T>) {
  return (
    <div className="flex items-center space-x-4">
      {formButtons ? (
        <>
          <Button layout="link" size="small" aria-label="Edit" onClick={() => onEdit(item)}>
            <SearchIcon className="w-5 h-5" aria-hidden="true"/>
          </Button>
        </>
      ) : (
        <>
          <Button layout="link" size="small" aria-label="Edit" onClick={() => onEdit(item)}>
            <EditIcon className="w-5 h-5" aria-hidden="true"/>
          </Button>
          <Button layout="link" size="small" aria-label="Delete" onClick={() => onDelete(item)}>
            <TrashIcon className="w-5 h-5" aria-hidden="true"/>
          </Button>
        </>
      )}
    </div>
  );
}


TableActionButtons.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TableActionButtons;
