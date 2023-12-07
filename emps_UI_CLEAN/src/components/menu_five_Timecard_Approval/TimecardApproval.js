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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 



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
        title: 'Employee ID',
        attributeDBName: 'receiverID',
        align: 'left'
    },
    {
        title: 'Date Of Message',
        attributeDBName: 'date',
        align: 'left'
    },
    {
        title: 'Hours under Review',
        attributeDBName: 'hours',
        align: 'left'
    },
    {   
        title: 'Approve',
        alight: 'left'
    },
    {
        title: 'Deny',
        alight: 'left'
    }
];


let dummy = [];
const MessageInformation = [
    {
        attributeName: 'receiverName'
    },
    {
        attributeName: 'receiverID'
    },
    {
        attributeName: 'date'
    },
    {
        attributeName: 'messageID'
    },
    {
        attributeName: 'hours'
    }

]

const messageRouteTableAttributes = [
    {
        title: 'Message',
        attributeDBName: 'message',
        align: 'left'
    },
];

function convertMonthToNumberStr(monthName) {
    let month = '';
    //Conver the month name into an integer
    if (monthName === "Jan") {
        month = '01';
    }
    else if (monthName === "Feb") {
        month = '02';
    }
    else if (monthName === "Mar") {
        month = '03';
    }
    else if (monthName === "Apr") {
        month = '04';
    }
    else if (monthName === "May") {
        month = '05';
    }
    else if (monthName === "Jun") {
        month = '06';
    }
    else if (monthName === "Jul") {
        month = '07';
    }
    else if (monthName === "Aug") {
        month = '08';
    }
    else if (monthName === "Sep") {
        month = '09';
    }
    else if (monthName === "Oct") {
        month = '10';
    }
    else if (monthName === "Nov") {
        month = '11';
    }
    else if (monthName === "Dec") {
        month = '12';
    }

    return month;
}

function HandleApprove(employeeID, messageID, setmessages, employeeName) {
    const currentDate = new Date().toDateString();
    //Perform a search to find the correct entry
    //The assumption is that all senderID's are 000000
    let messageNumber = 0;
    for (; messageNumber < dummy.length; messageNumber++) {
        if(dummy[messageNumber].messageID === messageID) {
            //Target location has been found
            break;
        }
    }

    const api = new API();
    //Message cannot be empty
    const message = "Hours have been Approved";

    //console.log(`EmpID: ${employeeID}, mesID: ${dummy[messageNumber].messageID}, message: ${message}`);

    async function updatemessages() {
        let date = `${currentDate.slice(11)}-${convertMonthToNumberStr(currentDate.slice(4,7))}-${currentDate.slice(8, 10)}`
        await api.messagesUpdate(employeeID, dummy[messageNumber].messageID, date, message);
        //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
        updatehours();
    }

    updatemessages();

    async function updatehours() {
        await api.updateTotalHours(dummy[messageNumber].hours, dummy[messageNumber].receiverID);
        //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
        getmessages();
    } 

    async function getmessages() {
        const routesJSONString = await api.messagesWithEmployeeID('000000');
        //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
        setmessages(dataParser(routesJSONString.data, employeeID, employeeName));
    }

    
};

function HandleDeny(employeeID, messageID, setmessages, response, setErrMsg, employeeName) {
    const currentDate = new Date().toDateString();
    //Perform a search to find the correct entry
    //The assumption is that all senderID's are 000000
    let messageNumber = 0;
    for (; messageNumber < dummy.length; messageNumber++) {
        if(dummy[messageNumber].messageID === messageID) {
            //Target location has been found
            break;
        }
    }

    if (response === '') {
        setErrMsg("Response cannot be blank for a deny");
    }
    else {
        const api = new API();
        //Message cannot be empty

        async function updatemessages() {
            let date = `${currentDate.slice(11)}-${convertMonthToNumberStr(currentDate.slice(4,7))}-${currentDate.slice(8, 10)}`
            await api.messagesUpdate(employeeID, dummy[messageNumber].messageID, date, response);
            //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
        }

        updatemessages();

        async function getmessages() {
            const routesJSONString = await api.messagesWithEmployeeID('000000');
            //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
            setmessages(dataParser(routesJSONString.data, employeeID, employeeName));
        }

        getmessages();
    }
};

function dataParser(message, employeeID, employeeName) {
    let arrayToReturn = [];
    let arraySubSection = [];
    let senderName = "";
    let receiverName = "";
    let receiverID = '';

    //Data returned should always be an even number, so this
    //  for loop will extract the names for display
    for (let i = 0; i < message.length; i += 2) {
        let nameOne = message[i].firstName + ` ` + message[i].lastName;
        let nameTwo = message[i + 1].firstName + ` ` + message[i + 1].lastName;
        //console.log(`${message[i].senderID} | ${message[i].receiverID} | ${employeeID}`);
        if (nameOne === employeeName || nameOne === 'System Message') {  
            //console.log("Match Found");
            if (message[i].senderID === employeeID || message[i].senderID === '000000') {
                senderName = message[i].firstName + ` ` + message[i].lastName;
                receiverName = message[i + 1].firstName + ` ` + message[i + 1].lastName;
                receiverID = message[i + 1].receiverID;
            }
            else {
                senderName = message[i + 1].firstName + ` ` + message[i + 1].lastName;
                receiverName = message[i].firstName + ` ` + message[i].lastName;
                receiverID = message[i].receiverID;
            }
        }
        else if (nameTwo === employeeName || nameTwo === 'System Message') {
            //console.log("Match Found");
            if (message[i + 1].senderID === employeeID || message[i].senderID === '000000') {
                senderName = message[i + 1].firstName + ` ` + message[i + 1].lastName;
                receiverName = message[i].firstName + ` ` + message[i].lastName;
                receiverID = message[i].receiverID;
            }
            else {
                senderName = message[i].firstName + ` ` + message[i].lastName;
                receiverName = message[i + 1].firstName + ` ` + message[i + 1].lastName;
                receiverID = message[i + 1].receiverID;
            }
        }

        if (message[i].senderID === '000000' || message[i].receiverID === '000000') {
            //Build out the array
            arraySubSection = {
                senderName: senderName,
                receiverName: receiverName,
                receiverID: receiverID,
                date: message[i].date.slice(0, 10),
                message: message[i].message,
                messageID: message[i].messageID,
                hours: message[i].hours
            }
            arrayToReturn.push(arraySubSection);

            arraySubSection = {
                receiverID: receiverID,
                receiverName: receiverName,
                date: message[i].date.slice(0, 10),
                messageID: message[i].messageID,
                hours: message[i].hours
            }
            dummy.push(arraySubSection)
        }   

    }

    //console.log(arrayToReturn);
    return arrayToReturn;
}

export default function MessageTable(props) {

    const [message, setmessages] = useState([]);
    const [response, setResponse] = useState('');
    const [errMsg, setErrMsg] = useState('');
    //console.log(`in messageTable routes contains is ${JSON.stringify(message)}`);

    const employeeID = props.employeeID;
    const employeeName = props.employeeName;

    const handleResponse = event => {
        setResponse(event.target.value);
    };
    
    useEffect(() => {
        const api = new API();

        async function getmessages() {
                const routesJSONString = await api.messagesWithEmployeeID('000000');
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
                <TableCell align="left" sx={{fontSize: 'large'}}>{routeObject.senderName}</TableCell>
                <TableCell align="left" sx={{fontSize: 'large'}}>{routeObject.receiverName}</TableCell>
                <TableCell align="left" sx={{fontSize: 'large'}}>{routeObject.receiverID}</TableCell>
                <TableCell align="left" sx={{fontSize: 'large'}}>{routeObject.date}</TableCell>
                <TableCell align="left" sx={{fontSize: 'large'}}>{routeObject.hours}</TableCell>
                <TableCell align="left">
                    <Button variant="contained"
                        title="Approve"
                        onClick={() => HandleApprove(employeeID, routeObject.messageID, setmessages, employeeName)}> 
                            Approve
                    </Button>
                </TableCell>

                <TableCell align="left">
                    <Button variant="contained"
                        title="Deny"
                        onClick={() => HandleDeny(employeeID, routeObject.messageID, setmessages, response, setErrMsg, employeeName)}>
                            Deny
                    </Button>
                </TableCell>
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
                                                    scope="row" 
                                                    sx={{fontSize: 'large'}}>      
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
            <Box display="flex" justifyContent="center">
                <Typography component="div" variant='h4'>
                    {errMsg}
                </Typography>
            </Box>
            
            <Box mt={5} display="flex" justifyContent="center">
                <TextField
                    label="Reason for Denying Here"
                    fullWidth
                    value={response}
                    onChange = {handleResponse}
                />
                
            </Box>

            <Box mt={5}>
            </Box>
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
                                                    align={attr.align}
                                                    sx={{fontSize: 'large'}}>
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
