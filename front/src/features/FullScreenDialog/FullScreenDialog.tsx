import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useInvoiceRetrieveQuery, useInvoiceCreateMutation, useInvoiceUpdateMutation, useInvoiceDestroyMutation } from '../../store/invoiceApi';

interface FullScreenDialogProps {
  reload: (data:any) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ reload } : FullScreenDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [invoiceCreate] = useInvoiceCreateMutation();
  const [datarows, setDatarows] = useState([])
  const tkn = useAppSelector(state=>state.auth.token);
  let {data, refetch}  = useInvoiceRetrieveQuery(tkn ? undefined : skipToken, {refetchOnMountOrArgChange:true}) || [];
  useEffect(()=>{ 
  if (data) 
  { reload(data); }  // setDatarows(data)
  },[data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [nr, setNr] = React.useState("");
  const [buyer, setBuyer] = React.useState("");
  const [issuedate, setIssueDate] = React.useState("");
  
  const handleClose = () => {
    invoiceCreate({data: {
      Nr: nr, Buyer: buyer, IssueDate: issuedate, InvoicePosition: '0',
      Question: '',
      Answer: '',
      SaleDate: '',
      PaymentMethod: '',
      Description: '',
      Currency: '',
      CurrencyRate: ''
    }});
    setNr("");
    setBuyer("");
    setIssueDate("");
    setOpen(false);
    // TODO: check refetch if we need
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Invoice
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <TextField id="nr" value={nr} onChange={(e)=>setNr(e.target.value)} label="Nr" variant="standard" />
		    <TextField id="buyer" value={buyer} onChange={(e)=>setBuyer(e.target.value)} label="Buyer" variant="standard" />
		    <TextField id="issuedate" value={issuedate} onChange={(e)=>setIssueDate(e.target.value)} label="IssueDate" variant="standard" />
		  </Dialog>
    </React.Fragment>
  );
}