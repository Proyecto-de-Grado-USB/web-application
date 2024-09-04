import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { RegistryDataGridProps } from "./RegistryInterfaces";
import DocumentDetailsDialog from "./DocumentDetailsDialog";
import UserDetailsDialog from "./UserDetailsDialog";
import UpdateDocumentDialog from './UpdateDocumentDialog';

const columns: GridColDef[] = [
  { field: "number", headerName: "#", width: 80 },
  { field: "location", headerName: "Ubicación", width: 120 },
  { field: "title", headerName: "Título", width: 180 },
  { field: "author", headerName: "Autor", width: 150 },
  { field: "publisher", headerName: "Editorial", width: 150 },
  { field: "year", headerName: "Año", width: 100 },
  { field: "city", headerName: "Ciudad", width: 120 },
  { field: "country", headerName: "País", width: 120 },
  { field: "edition", headerName: "Edición", width: 120 },
  //{ field: "format", headerName: "Formato", width: 120 },
  //{ field: "isbn", headerName: "ISBN", width: 150 },
  //{ field: "language", headerName: "Idioma", width: 120 },
  //{ field: "pages", headerName: "Páginas", width: 100 },
  //{ field: "dimensions", headerName: "Dimensiones", width: 150 },
  //{ field: "subject", headerName: "Tema", width: 180 },
  { field: "notes", headerName: "Notas", flex: 1 },
];

function CustomToolbar() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <GridToolbarFilterButton />
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </div>
  );
}

const localeText = {
  toolbarFilters: "Filtros",
  toolbarExport: "Exportar",
  MuiTablePagination: {
    labelRowsPerPage: "Filas por Página",
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`,
  },
};

export default function RegistryDataGrid({
  rows,
  sx,
  isSearch,
}: Readonly<RegistryDataGridProps>) {
  const [docDetailsOpen, setDocDetailsOpen] = useState(false);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDetails = (params) => {
    setSelectedRow(params.row);
    setDocDetailsOpen(true);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  const handleCloseDocDetails = () => {
    setDocDetailsOpen(false);
  };

  const handleOpenUserDetails = () => {
    setUserDetailsOpen(true);
  };

  const rowsWithNumbers = rows.map((row, index) => ({
    ...row,
    number: index + 1,
  }));

  return (
    <>
      <Box sx={{ ...sx, backgroundColor: "white", position: "relative" }}>
        <DataGrid
          rows={rowsWithNumbers}
          columns={columns}
          onRowClick={isSearch ? handleDetails : handleRowClick}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[20, 50, 100]}
          slots={isSearch ? { toolbar: CustomToolbar } : {}}
          localeText={localeText}
          sx={{
            "& .MuiDataGrid-root": {
              fontSize: "1.2rem",
            },
          }}
        />
        <DocumentDetailsDialog
          open={docDetailsOpen}
          onClose={handleCloseDocDetails}
          selectedRow={selectedRow}
          onOpenUserDetails={handleOpenUserDetails}
        />
        <UserDetailsDialog
          open={userDetailsOpen}
          onClose={() => setUserDetailsOpen(false)}
          selectedRow={selectedRow}
        />
        <UpdateDocumentDialog
          open={updateDialogOpen}
          onClose={handleCloseUpdateDialog}
          selectedRow={selectedRow}
        />
      </Box>
    </>
  );
}
