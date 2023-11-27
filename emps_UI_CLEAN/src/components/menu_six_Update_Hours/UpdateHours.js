import React, {Fragment, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import API from '../../API_Interface/API_Interface';

export default function UpdateHours(props) {
    const employeeID = props.employeeID;
    console.log(`Props! ${employeeID}`);
    const [currentMessage, setMessage] = useState ("Manual Adding / Removing of hours here");
    const [targetID, setTargetID] = useState ("");
    const [targetHours, setTargetHours] = useState (0.00);
    const [hoursChange, setHoursChange] = usestate (0.00);
    const api = new API();

    const handleChangeTargetID = event => {
        setTargetID(event.target.value);
    };

    const handleChangeHoursChange = event => {
        setHoursChange(event.target.value);
    };
    
    const handleAddHours = async () => {
        //Get Employee by ID entered into text box, get hours from that get and add input from second text box, try update hours with ID and result and return a message with either success or failure.
        console.log(`Attempting to add ${hoursChange} hours from ${targetID}.`);
        const dataFromID = await api.employeeWithID(targetID);
        if(dataFromID.status === 'OK') {
            setTargetHours(dataFromID.hoursWTD);
            const response = await api.updateTotalHours(targetHours + hoursChange, targetID);
            if (response.status === 'OK') {
                console.log(`Adding ${hoursChange} hours from ${targetID}.`);
                setMessage("Adding of Hours Successful");
            } else {
                console.error('Adding of Hours Failed:', response.error);
                setMessage("Something Went Wrong with Adding Hours");
            }
        }
        else {
            console.error('Retrieval of Hours Failed:', dataFromID.error);
            setMessage("Something Went Wrong with Retrieving Hours");
        }
    };

    const handleSubtractHours = async () => {
        //Get Employee by ID entered into text box, get hours from that get and subtract input from second text box, try update hours with ID and result and return a message with either success or failure.
        //Ensure that hours does not fall below zero
        console.log(`Attempting to subtract ${hoursChange} hours from ${targetID}.`);
        const dataFromID = await api.employeeWithID(targetID);
        if(dataFromID.status === 'OK') {
            setTargetHours(dataFromID.hoursWTD);
            const response = await api.updateTotalHours(targetHours - hoursChange, targetID);
            if (response.status === 'OK') {
                console.log(`Subtracting ${hoursChange} hours from ${targetID}.`);
                setMessage("Removal of Hours Successful");
            } else {
                console.error('Removal of Hours Failed:', response.error);
                setMessage("Something Went Wrong with Removing Hours");
            }
        }
        else {
            console.error('Retrieval of Hours Failed:', dataFromID.error);
            setMessage("Something Went Wrong with Retrieving Hours");
        }
    };
    
    return (
        <Fragment>
            <Typography component="div" variant='h3'>
                {currentMessage}
            </Typography>

            <TextField
                value={targetID}
                onChange = {handleChangeTargetID}
            />

            <TextField
                value={hoursChange}
                onChange = {handleChangeHoursChange}
            />

            <Box display="flex" justifyContent="center" gap={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddHours}
                    disabled={}
                    sx={{ minWidth: 120, height: 120 }}
                >
                    ADD
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubtractHours}
                    disabled={}
                    sx={{ minWidth: 120, height: 120 }}
                >
                    RMV
                </Button>
            </Box>
        </Fragment>
    )
}
