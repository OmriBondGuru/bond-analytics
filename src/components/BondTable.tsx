import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Bond } from '../types/Bond';

interface Props {
  bonds: Bond[];
}

const BondTable: React.FC<Props> = ({ bonds }) => {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Bond Name', flex: 1 },
    { 
      field: 'price', 
      headerName: 'Price', 
      flex: 1,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    { 
      field: 'yield', 
      headerName: 'Yield', 
      flex: 1,
      valueFormatter: (params) => `${params.value.toFixed(2)}%`,
    },
    { 
      field: 'duration', 
      headerName: 'Duration', 
      flex: 1,
      valueFormatter: (params) => params.value.toFixed(2),
    },
    { field: 'rating', headerName: 'Rating', flex: 1 },
    { field: 'maturity', headerName: 'Maturity', flex: 1 },
    { 
      field: 'weeklyYieldChange', 
      headerName: 'Weekly Yield Change', 
      flex: 1,
      valueFormatter: (params) => `${(params.value * 100).toFixed(2)}bp`,
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={bonds}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default BondTable; 