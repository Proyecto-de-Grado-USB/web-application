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
import { useInsertLoan } from '@/hooks/firebase/useLoansInsert';
import { Loan } from '@/hooks/firebase/interfaceLoans';

function UserDetailsDialog({ open, onClose, selectedRow}) {
    const { insertLoan, isLoading, error, success } = useInsertLoan();

    const [userId, setUserId] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [teacher, setTeacher] = useState('');
    const [career, setCareer] = useState('');
    const [regUniv, setRegUniv] = useState('');

    const handleInsertLoan = () => {
        const loan: Loan = {
          document_id: selectedRow.isbn,
          user_id: userId,
          expiration_date: expirationDate,
          state: "standby",
          user_name: userName,
          phone: phone,
          email: email,
          teacher: teacher,
          career: career,
          reg_univ: regUniv,
        };
      
        insertLoan(loan).then(() => {
          if (!error && success) {
            onClose();
          }
        }).catch((error) => {
          console.error("Error inserting loan:", error);
        });
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
                        <TextField label="Nombre Completo" variant="outlined" fullWidth value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Carnet de Identidad" variant="outlined" fullWidth value={userId} onChange={(e) => setUserId(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Teléfono" variant="outlined" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Correo Electrónico" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Docente" variant="outlined" fullWidth value={teacher} onChange={(e) => setTeacher(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Carrera" variant="outlined" fullWidth value={career} onChange={(e) => setCareer(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Reg. Univ." variant="outlined" fullWidth value={regUniv} onChange={(e) => setRegUniv(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Fecha de Devolución" variant="outlined" fullWidth value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
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
