import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbarContainer, GridToolbar, GridToolbarExport } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ImportExport from '@mui/icons-material/ImportExport';
import { skipToken } from '@reduxjs/toolkit/query';
import { useInvoiceRetrieveQuery, useInvoiceCreateMutation, useInvoiceUpdateMutation, useInvoiceDestroyMutation } from '../../store/invoiceApi';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import FullScreenDialog from '../FullScreenDialog/FullScreenDialog'

// test set
//const rows = [
//  { id: 1, question: 'Snow', answer: 'Jon'},
//  { id: 2, question: 'Lannister', answer: 'Cersei'} }
//	Question: string;
//	Answer: string;
//    Nr: string;
//	Buyer: string;
//	IssueDate: string;
//	SaleDate: string;
//	PaymentMethod: string;
//	Description: string;
//	Currency: string;
//	CurrencyRate: string;
//	InvoicePosition: string;

export default function EditableTable() {

const [invoiceCreate] = useInvoiceCreateMutation();
const [invoiceUpdate] = useInvoiceUpdateMutation();
const [invoiceDestroy] = useInvoiceDestroyMutation();

const [error, setError] = useState("");

const [file, setFile] = useState("");

const [datarows, setDatarows] = useState([])

const [selectionModel, setSelectionModel] = React.useState([]);

const tkn = useAppSelector(state=>state.auth.token);
let {data, refetch}  = useInvoiceRetrieveQuery(tkn ? undefined : skipToken, {refetchOnMountOrArgChange:true});
useEffect(()=>{ 
if (data) 
{ setDatarows(data); } 
},[data]);

const [selectedRows, setSelectedRows]= React.useState([]);
console.log(data);

const columns = [
  { field: 'Nr', headerName: 'Nr', width: 90 },
  {
    field: 'Buyer',
    headerName: 'Buyer',
    width: 150,
    editable: true,
  },
  {
    field: 'IssueDate',
    headerName: 'IssueDate',
    width: 150,
    editable: true,
  },
  {
    field: "delete",
    width: 75,
    sortable: false,
    disableColumnMenu: true,
    renderHeader: () => {
      return (
        <IconButton
          onClick={() => {
	    console.log(selectionModel);
            let selectedIDs = new Set(selectedRows);
	    for (const elemId of selectedIDs)
            {
		console.log(elemId);
		invoiceDestroy({ var:elemId});
	    }
	    let rows = datarows.filter(row => !selectedIDs.has(row.id));
	    setDatarows(rows); 
          }}
        >
          <DeleteIcon />
        </IconButton>
      );
    }
  }
];



function processRowUpdate(newRow)
{
	const updatedRow = { ...newRow, isNew: false };
	console.log(updatedRow);
	console.log(newRow.Nr);
	console.log(updatedRow.Buyer);
	console.log(updatedRow.IssueDate);
	invoiceUpdate({var:updatedRow.id,data:{Nr:updatedRow.Nr, Buyer:updatedRow.Buyer, IssueDate:updatedRow.IssueDate, InvoicePosition:'0'}});

    	return updatedRow;
}

function selectCheckbox(element) {
	setSelectedRows(element);
}

const [nr, setNr] = React.useState("");
const [buyer, setBuyer] = React.useState("");
const [issuedate, setIssueDate] = React.useState("");

function handleAddNew(){
	invoiceCreate({data: {Nr: nr, Buyer: buyer, IssueDate: issuedate, InvoicePosition: '0'}});
	setNr("");
	setBuyer("");
	setIssueDate("");
	refetch();
}

  return (
    <Box sx={{ p:2, height: 400, width: '100%' }}>
       {!!tkn ? ( <div>
	<DataGrid
		pageSize={10}
		autoHeight={true}
		onRowSelectionModelChange={selectCheckbox}
        	rows={datarows}
        	columns={columns}
        	initialState={{
          		pagination: {
            			paginationModel: {
              			pageSize: 10 }}
                }}
        	pageSizeOptions={[10]}
        	checkboxSelection
        	disableRowSelectionOnClick
		processRowUpdate={processRowUpdate}
		slots={{ toolbar:GridToolbar }} />

	<Stack>
		<TextField id="nr" value={nr} onChange={(e)=>setNr(e.target.value)} label="Nr" variant="standard" />
		<TextField id="buyer" value={buyer} onChange={(e)=>setBuyer(e.target.value)} label="Buyer" variant="standard" />
		<TextField id="issuedate" value={issuedate} onChange={(e)=>setIssueDate(e.target.value)} label="IssueDate" variant="standard" />
		<Button onClick={handleAddNew}>Add new</Button>
	</Stack>
	<FullScreenDialog reload={refetch} />
	</div>) : (
	<h2>Please login</h2>
	) }
    </Box>
  );
}
