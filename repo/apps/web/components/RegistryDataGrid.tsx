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
import UpdateDocumentDialog from "./UpdateDocumentDialog";

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
  noRowsLabel: "No se encontraron resultados que cumplan con los criterios de búsqueda.",
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

  const rowsWithNumbers = rows
    .filter(
      (row) =>
        !isSearch ||
        (row.property !== "Archivado" && row.property !== "Eliminado")
    )
    .map((row, index) => ({
      ...row,
      number: index + 1,
    }));

    const columns: GridColDef[] = [
      {
        field: "number",
        headerName: "#",
        width: 80,
        renderHeader: () => <strong># 🏆</strong>,
      },
      {
        field: "title",
        headerName: "Título",
        width: 360,
        renderHeader: () => <strong>Título</strong>,
      },
      {
        field: "author",
        headerName: "Autor",
        width: 200,
        renderHeader: () => <strong>Autor</strong>,
      },
      {
        field: "year",
        headerName: "Año",
        width: 100,
        renderHeader: () => <strong>Año</strong>,
      },
      {
        field: "city",
        headerName: "Ciudad",
        width: 120,
        renderHeader: () => <strong>Ciudad</strong>,
      },
      {
        field: "country",
        headerName: "País",
        width: 120,
        renderHeader: () => <strong>País</strong>,
      },
      {
        field: "subject",
        headerName: "Tema",
        width: 220,
        renderHeader: () => <strong>Tema</strong>,
      },
      {
        field: "notes",
        headerName: "Notas",
        width: isSearch ? undefined : 120,
        flex: isSearch ? 1 : undefined,
        renderHeader: () => <strong>Notas</strong>,
      },
      ...(!isSearch
        ? [
            {
              field: "location",
              headerName: "Ubicación",
              width: 120,
              renderHeader: () => <strong>Ubicación</strong>,
            },
            {
              field: "edition",
              headerName: "Edición",
              width: 120,
              renderHeader: () => <strong>Edición</strong>,
            },
            {
              field: "format",
              headerName: "Formato",
              width: 120,
              renderHeader: () => <strong>Formato</strong>,
            },
            {
              field: "publisher",
              headerName: "Editorial",
              width: 120,
              renderHeader: () => <strong>Editorial</strong>,
            },
            {
              field: "isbn",
              headerName: "ISBN",
              width: 160,
              renderHeader: () => <strong>ISBN</strong>,
            },
            {
              field: "language",
              headerName: "Idioma",
              width: 120,
              renderHeader: () => <strong>Idioma</strong>,
            },
            {
              field: "pages",
              headerName: "Páginas",
              width: 100,
              renderHeader: () => <strong>Páginas</strong>,
            },
            {
              field: "dimensions",
              headerName: "Dimensiones",
              width: 160,
              renderHeader: () => <strong>Dimensiones</strong>,
            },
            {
              field: "property",
              headerName: "Estado",
              width: 180,
              renderHeader: () => <strong>Estado</strong>,
            },
          ]
        : []),
    ];    

  return (
    <>
      <Box sx={{ ...sx, backgroundColor: "rgba(255, 255, 255, 0.90)", position: "relative" }}>
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
