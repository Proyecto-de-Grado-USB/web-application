import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
import { RegistryDataGridProps } from './RegistryInterfaces';

const columns: GridColDef[] = [
    { field: 'number', headerName: '#', width: 80 },
    { field: 'location', headerName: 'Ubicación', width: 120 },
    { field: 'title', headerName: 'Título', width: 180 },
    { field: 'author', headerName: 'Autor', width: 150 },
    { field: 'publisher', headerName: 'Editorial', width: 150 },
    { field: 'year', headerName: 'Año', width: 100 },
    { field: 'city', headerName: 'Ciudad', width: 120 },
    { field: 'country', headerName: 'País', width: 120 },
];

function CustomToolbar() {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <GridToolbarFilterButton />
            <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
        </div>
    );
}

export default function RegistryDataGrid({ rows }: Readonly<RegistryDataGridProps>) {
    const rowsWithNumbers = rows.map((row, index) => ({
        ...row,
        number: index + 1,
    }));

    return (
        <Box sx={{ height: 600, width: '100%', maxWidth: '1050px', margin: '0 auto' }}>
            <DataGrid
                rows={rowsWithNumbers}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                pageSizeOptions={[20]}
                slots={{ toolbar: CustomToolbar }}
            />
        </Box>
    );
}
