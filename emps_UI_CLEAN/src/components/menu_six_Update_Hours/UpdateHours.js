import React, {Fragment, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import API from '../../API_Interface/API_Interface';

export default function UpdateHours(props) {
    const employeeID = props.employeeID;
    const [currentMessage, setMessage] = useState ("");
    const [targetID, setTargetID] = useState ("");
    const [changeHours, setChangeHours] = useState (0.00);

    console.log(employeeID);
    
    const api = new API();

    const handleChangeTargetID = event => {
        setTargetID(event.target.value);
    };

    const handleChangeHours = event => {
        setChangeHours(event.target.value);
    };
    
    const handleAddHours = async () => {
        //Get Employee by ID entered into text box, get hours from that get and add input from second text box, try update hours with ID and result and return a message with either success or failure.
        console.log(`Attempting to add ${changeHours} hours from ${targetID}.`);
        if ((changeHours == '0' || changeHours.length > 3) || (targetID.length < 6 || targetID.length > 7)) {
            console.log("Error, unable to execute");
            if (targetID == '' || (targetID.length < 6 || targetID.length > 7)) {
                setMessage("Please Enter a valid Employee ID");
            }
            else if(changeHours == '0') {
                setMessage("Please Enter an amount of hours");
            }
            else {
                setMessage("An error has occured");
            }
        }
        else {
            await api.updateTotalHours(changeHours, targetID);
            setMessage("Hours have been added");
            setTargetID('');
            setChangeHours(0);
        }
    };

    const handleSubtractHours = async () => {
        //Get Employee by ID entered into text box, get hours from that get and subtract input from second text box, try update hours with ID and result and return a message with either success or failure.
        //Ensure that hours does not fall below zero
        console.log(`Attempting to subtract ${changeHours} hours from ${targetID}.`);
        if ((changeHours == '0' || changeHours.length > 3 ) || (targetID.length < 6 || targetID.length > 7) ) {
            console.log("Error, unable to execute");
            if (targetID == '' || (targetID.length < 6 || targetID.length > 7)) {
                setMessage("Please Enter a valid Employee ID");
            }
            else if(changeHours == '0') {
                setMessage("Please Enter an amount of hours");
            }
            else {
                setMessage("An error has occured");
            }
        }
        else {
            await api.updateTotalHours((-1 * changeHours), targetID);
            let response = await api.employeeUnpaidWithID(targetID);
            if (response.data[0].unpaid_hours < 0) {
                await api.setTotalHours(0, targetID);
                setMessage("Removed hours exceeded worked hours, hours have been set to 0");
            }
            else {
                setMessage("Hours have been removed");
            }
            setTargetID('');
            setChangeHours(0);
        }
    };
    
    return (
        <Fragment>
            <Box display="flex" justifyContent="center">
                <Typography component="div" variant='h3'>
                    Update Employee Hours
                </Typography>
            </Box>

            <Box display="flex" justifyContent="center" mt={10}>
                <TextField
                    label="Employee ID"
                    value={targetID}
                    onChange = {handleChangeTargetID}
                />
            </Box>

            <Box display="flex" justifyContent="center" mt={2}>
                <TextField
                    label="Hour to Update"
                    value={changeHours}
                    onChange = {handleChangeHours}
                />
            </Box>

            <Box display="flex" justifyContent="center" mt={10} gap={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddHours}
                    sx={{ minWidth: 120, height: 120 }}
                >
                    ADD
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubtractHours}
                    sx={{ minWidth: 120, height: 120 }}
                >
                    RMV
                </Button>
            </Box>

            <Box display="flex" justifyContent="center" mt={2}>
                <Typography component="div" variant='h6'>
                    {currentMessage}
                </Typography>
            </Box>
        </Fragment>
    )
}
