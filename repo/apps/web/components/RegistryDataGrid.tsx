import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { RegistryDataGridProps } from "./RegistryInterfaces";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import React from "react";

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
  { field: "format", headerName: "Formato", width: 120 },
  { field: "isbn", headerName: "ISBN", width: 150 },
  { field: "language", headerName: "Idioma", width: 120 },
  { field: "pages", headerName: "Páginas", width: 100 },
  { field: "dimensions", headerName: "Dimensiones", width: 150 },
  { field: "subject", headerName: "Tema", width: 180 },
  { field: "notes", headerName: "Notas", width: 200 },
];

const headerMap = columns.reduce((acc, column) => {
  acc[column.field] = column.headerName;
  return acc;
}, {});

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
  toolbar,
}: Readonly<RegistryDataGridProps>) {
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderRowDetails = (row) => {
    return Object.entries(row)
      .filter(([key]) => key !== "id" && key !== "number")
      .map(([key, value]) => (
        <DialogContentText key={key} component="div">
          <strong>{`${headerMap[key]}:`}</strong> {value}
        </DialogContentText>
      ));
  };

  const rowsWithNumbers = rows.map((row, index) => ({
    ...row,
    number: index + 1,
  }));

  return (
    <Box sx={{ ...sx, backgroundColor: "white" }}>
      <DataGrid
        rows={rowsWithNumbers}
        columns={columns}
        onRowClick={handleRowClick}
        rowSelectionModel={[]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20, 50, 100]}
        slots={toolbar ? { toolbar: CustomToolbar } : {}}
        localeText={localeText}
        sx={{
          "& .MuiDataGrid-root": {
            fontSize: "1.2rem",
          },
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { minWidth: "400px" } }}
      >
        <DialogTitle>Detalles del Documento</DialogTitle>
        <DialogContent>
          {selectedRow && renderRowDetails(selectedRow)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
