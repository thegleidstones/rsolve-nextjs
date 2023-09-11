import React from 'react';
import { Button, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow } from '@roketid/windmill-react-ui';
import TableActionButtons from 'components/TableActionButtons/TableActionButtons';

interface TableColumn {
  label: string;
  key: string;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn[];
  currentPage: number;
  resultsPerPage: number;
  totalResults: number;
  onPageChangeTable: (activePage: number) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  formButtons?: boolean;
}

function TableRsolve<T>({
  data,
  columns,
  currentPage,
  resultsPerPage,
  totalResults,
  onPageChangeTable,
  onEdit,
  onDelete,
  formButtons
}: TableProps<T>) {
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = currentPage * resultsPerPage;

  const displayedData = data.slice(startIndex, endIndex);
  return (
  <TableContainer className="mb-8">
    <Table className="min-w-full">
      <TableHeader>
        <tr>
          {columns.map((column) => (
            <TableCell key={column.key}>{column.label}</TableCell>
          ))}
          <TableCell>Actions</TableCell>
        </tr>
      </TableHeader>
      <TableBody>
        {displayedData.map((item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell key={column.key}>{item[column.key]}</TableCell>
            ))}
          <TableCell>
            <TableActionButtons
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              formButtons={formButtons}
            />
          </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <TableFooter>
      <Pagination
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        onChange={onPageChangeTable}
        label="Table navigation"
      />
    </TableFooter>
  </TableContainer>        
  );
}

export default TableRsolve;
