import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';

interface Registry {
    id: string;
    location: string;
    title: string;
    author: string;
    publisher: string;
    year: string;
    city: string;
    country: string;
}

interface RegistryDataGridProps {
    rows: Registry[];
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'location', headerName: 'Location', width: 120 },
    { field: 'title', headerName: 'Title', width: 180 },
    { field: 'author', headerName: 'Author', width: 150 },
    { field: 'publisher', headerName: 'Publisher', width: 150 },
    { field: 'year', headerName: 'Year', width: 100 },
    { field: 'city', headerName: 'City', width: 120 },
    { field: 'country', headerName: 'Country', width: 120 },
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
    return (
        <Box sx={{ height: 600, width: '100%', maxWidth: '1050px', margin: '0 auto' }}>
            <DataGrid
                rows={rows}
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
