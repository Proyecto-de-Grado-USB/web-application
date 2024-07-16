import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function UserDetailsDialog({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Detalles del Usuario</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Nombre Completo" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Carnet de Identidad" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Teléfono" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Correo Electrónico" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Docente" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Carrera" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Reg. Univ." variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Notas" variant="outlined" fullWidth />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserDetailsDialog;
