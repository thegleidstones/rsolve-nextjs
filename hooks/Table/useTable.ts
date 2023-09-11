import { useState, useEffect } from 'react';

export function useTables({ data, pageTable, resultsPerPage }) {
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    const startIndex = (pageTable - 1) * resultsPerPage;
    const endIndex = pageTable * resultsPerPage;

    setDisplayedData(data.slice(startIndex, endIndex));
  }, [pageTable, data, resultsPerPage]);

  return {
    displayedData,
    setDisplayedData,
  };
}
