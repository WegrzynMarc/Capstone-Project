import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';

const messageTableAttributes = [
    
    {
        title: 'From',
        attributeDBName: 'senderName',
        align: 'left'
    },
    {
        title: 'To',
        attributeDBName: 'receiverName',
        align: 'left'
    },
    {
        title: 'Date Of Message',
        attributeDBName: 'date',
        align: 'left'
    },
];

const messageRouteTableAttributes = [
    {
        title: 'Message',
        attributeDBName: 'message',
        align: 'left'
    },
];


function dataParser(message, employeeID, employeeName) {
    let arrayToReturn = [];
    let arraySubSection = [];
    let senderName = "";
    let receiverName = "";

    //Data returned should always be an even number, so this
    //  for loop will extract the names for display
    for (let i = 0; i < message.length; i += 2) {
        let nameOne = `${message[i].firstName}` + ` ` + `${message[i].lastName}`;
        let nameTwo = `${message[i + 1].firstName}` + ` ` + `${message[i + 1].lastName}`;
        //console.log(`${message[i].senderID} | ${message[i].receiverID} | ${employeeID}`);
        if (nameOne === employeeName) {  
            //console.log("Match Found");
            if (message[i].senderID === employeeID) {
                senderName = `${message[i].firstName}` + ` ` + `${message[i].lastName}`;
                receiverName = `${message[i + 1].firstName}` + ` ` + `${message[i + 1].lastName}`;
            }
            else {
                senderName = `${message[i + 1].firstName}` + ` ` + `${message[i + 1].lastName}`;
                receiverName = `${message[i].firstName}` + ` ` + `${message[i].lastName}`;
            }
        }
        else if (nameTwo === employeeName) {
            //console.log("Match Found");
            if (message[i + 1].senderID === employeeID) {
                senderName = `${message[i + 1].firstName}` + ` ` + `${message[i + 1].lastName}`;
                receiverName = `${message[i].firstName}` + ` ` + `${message[i].lastName}`;
            }
            else {
                senderName = `${message[i].firstName}` + ` ` + `${message[i].lastName}`;
                receiverName = `${message[i + 1].firstName}` + ` ` + `${message[i + 1].lastName}`;
            }
        }

        //Check if it is an automated system message
        //  If so, do not display
        if (message[i].senderID !== '000000' && message[i].receiverID !== '000000') {
            //Build out the array
            arraySubSection = {
                senderName: senderName,
                receiverName: receiverName,
                date: message[i].date,
                message: message[i].message
            }
            arrayToReturn.push(arraySubSection);
        }

    }

    //console.log(arrayToReturn);
    return arrayToReturn;
}

export default function MessageTable(props) {


    const [message, setmessages] = useState([]);
    //console.log(`in messageTable routes contains is ${JSON.stringify(message)}`);

    const employeeID = props.employeeID;
    const employeeName = props.employeeName;
    
    useEffect(() => {
        const api = new API();

        async function getmessages() {
                const routesJSONString = await api.messagesWithEmployeeID(employeeID);
                //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
                setmessages(dataParser(routesJSONString.data, employeeID, employeeName));
        }

        getmessages();
    }, []);
    

    const TRow = ({routeObject}) => {

        const [open, setOpen] = React.useState(false);
        
        return (
        <Fragment>
            <TableRow
                sx={{ '& > *': { borderBottom: 'unset' } }}
                >
                <TableCell>
                    <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left">{routeObject.senderName}</TableCell>
                <TableCell align="left">{routeObject.receiverName}</TableCell>
                <TableCell align="left">{routeObject.date}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                            </Typography>
                            <Table size="small" aria-label="Message Information">
                                <TableBody>
                                {
                                    messageRouteTableAttributes.map((attr, idx) => (
                                        <TableCell key={idx}
                                                    align={attr.align}
                                                    component="th" 
                                                    scope="row">      
                                            {
                                                routeObject[attr.attributeDBName]
                                            }
                                        </TableCell>
                                ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
        );
    }

    return <Fragment>
        {
            message.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="message table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                {
                                    messageTableAttributes.map((attr, idx) =>
                                        <TableCell  key={idx}
                                                    align={attr.align}>
                                            {attr.title}
                                        </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                message.map((message, idx) => (
                                    <TRow routeObject={message} key={idx}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}
