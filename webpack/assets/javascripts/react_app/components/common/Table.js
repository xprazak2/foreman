import React from 'react';
import { Table as PfTable } from 'patternfly-react';

const Table = ({ columns, rows, rowKey }) => {
  console.log(rows)
  return(
    <PfTable.PfProvider striped bordered hover columns={columns}>
      <PfTable.Header />
      <PfTable.Body rows={rows} rowKey={rowKey} />
    </PfTable.PfProvider>
  )
}

export default Table;
