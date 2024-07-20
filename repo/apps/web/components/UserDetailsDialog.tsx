import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useInsertLoan } from '../hooks/useInsertLoan';

function UserDetailsDialog({ open, onClose }) {
    const { insertLoan, isLoading, error, success } = useInsertLoan();

    const [documentId, setDocumentId] = useState('');
    const [userId, setUserId] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [state, setState] = useState('');

    const handleInsertLoan = () => {
        insertLoan({ document_id: documentId, user_id: userId, expiration_date: expirationDate, state });
        if (!error && success) {
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Detalles del Usuario
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: '1px' }}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Document ID" variant="outlined" fullWidth value={documentId} onChange={(e) => setDocumentId(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="User ID" variant="outlined" fullWidth value={userId} onChange={(e) => setUserId(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Expiration Date" variant="outlined" fullWidth value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="State" variant="outlined" fullWidth value={state} onChange={(e) => setState(e.target.value)} />
                    </Grid>
                </Grid>
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                {success && <p style={{ color: 'green' }}>Se envió la solicitud.</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleInsertLoan} disabled={isLoading}>Enviar Solicitud</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserDetailsDialog;
