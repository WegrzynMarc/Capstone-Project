import React, {useState, useEffect, Fragment, component} from 'react';
import API from '../../API_Interface/API_Interface'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Input } from '@mui/icons-material';
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
        let nameOne = message[i].firstName + ` ` + message[i].lastName;
        let nameTwo = message[i + 1].firstName + ` ` + message[i + 1].lastName;
        //console.log(`${message[i].senderID} | ${message[i].receiverID} | ${employeeID}`);
        if (nameOne === employeeName) {  
            //console.log("Match Found");
            if (message[i].senderID === employeeID) {
                senderName = message[i].firstName + ` ` + message[i].lastName;
                receiverName = message[i + 1].firstName + ` ` + message[i + 1].lastName;
            }
            else {
                senderName = message[i + 1].firstName + ` ` + message[i + 1].lastName;
                receiverName = message[i].firstName + ` ` + message[i].lastName;
            }
        }
        else if (nameTwo === employeeName) {
            //console.log("Match Found");
            if (message[i + 1].senderID === employeeID) {
                senderName = message[i + 1].firstName + ` ` + message[i + 1].lastName;
                receiverName = message[i].firstName + ` ` + message[i].lastName;
            }
            else {
                senderName = message[i].firstName + ` ` + message[i].lastName;
                receiverName = message[i + 1].firstName + ` ` + message[i + 1].lastName;
            }
        }

        //Check if it is an automated system message
        //  If so, do not display
        if (message[i].senderID !== '000000' && message[i].receiverID !== '000000') {
            //Build out the array
            arraySubSection = {
                senderName: senderName,
                receiverName: receiverName,
                date: message[i].date.slice(0, 10),
                message: message[i].message
            }
            arrayToReturn.push(arraySubSection);
        }
    }

    //console.log(arrayToReturn);
    return arrayToReturn;
}

function dataParserDropTable(message) {
    let array = []
    for (let i = 1; i < message.length; i++) {
        array.push({
            name: message[i].firstName + ` ` + message[i].lastName,
            employeeID: message[i].employeeID
        })
    }

    console.log(array);
    return array;
}

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

function updateMessageList(employeeID, employeeName, setmessages) {
    const api = new API();

    async function getmessages() {
            const routesJSONString = await api.messagesWithEmployeeID(employeeID);
            //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
            setmessages(dataParser(routesJSONString.data, employeeID, employeeName));
    }

    getmessages();
};

export default function MessageTable(props) {
    const currentDate = new Date().toDateString();
    const [message, setmessages] = useState([]);
    const [contents, setContents] = useState('');
    const [dropDownTable, setdropDownTable] = useState([]);
    const [receiverID, setReceiverID] = useState('000001');
    //console.log(`in messageTable routes contains is ${JSON.stringify(message)}`);

    const employeeID = props.employeeID;
    const employeeName = props.employeeName;

    const handleMessageContent = event => {
        setContents(event.target.value);
    };

    const createSelectItems = () => {
        let items = [];
        //console.log(dropDownTable.length)
        for (let i = 0; i < dropDownTable.length; i++) {             
             items.push(<option key={i} value={dropDownTable[i].employeeID}>{dropDownTable[i].name}</option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    }  

    const onDropdownSelected = (e) => {
        setReceiverID(e.target.value);
        //console.log("THE VAL", receiverID);
        //here you will see the current selected value of the select input
    }

    const sendMessage = () => {
        let date = `${currentDate.slice(11)}-${convertMonthToNumberStr(currentDate.slice(4,7))}-${currentDate.slice(8, 10)}`
        const api = new API();

        if (receiverID === employeeID) {
            //Error message
        }
        else {
            api.messagesCreate(employeeID, receiverID, date, 0, contents);
            updateMessageList(employeeID, employeeName, setmessages);
        }

        //console.log(`messageContent: ${contents} | recID: ${empID} | senderID: ${employeeID}`)
        setContents('');
    }
    
    useEffect(() => {
        const api = new API();

        async function getmessages() {
                const routesJSONString = await api.messagesWithEmployeeID(employeeID);
                //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
                setmessages(dataParser(routesJSONString.data, employeeID, employeeName));
        }

        getmessages();

        async function getDropDown() {
            const routesJSONStringTwo = await api.allEmployees();
            //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
            setdropDownTable(dataParserDropTable(routesJSONStringTwo.data));
        }
        
        getDropDown()
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
                <TableCell align="left" sx={{fontSize: 'large'}}>{routeObject.date}</TableCell>
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
            <Box>
            </Box>
            
            <Box mt={5} display="flex" justifyContent="center" gap={3}>
                <TextField
                    label="Message Here"
                    fullWidth
                    value={contents}
                    onChange = {handleMessageContent}
                />
                {
                    //Update to a drop-down table for easier use
                }
                <select onChange={onDropdownSelected}>
                    {createSelectItems()}
                </select>
                
                <Button
                    variant="contained"
                    color="primary"
                    onClick={sendMessage}
                    sx={{ minWidth: 20, height: 60 }}
                >
                    Send Message
                </Button>
                
            </Box>

            <Box mt={5}>
            </Box>
            
        {
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650,
                            height: 75,
                            maxHeight: 100,
                            overflow: "scroll"}} 
                            aria-label="message table"
                    >
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