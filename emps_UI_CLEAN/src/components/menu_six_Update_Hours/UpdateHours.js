import React, {Fragment, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import API from '../../API_Interface/API_Interface';

export default function UpdateHours(props) {
    const employeeID = props.employeeID;
    console.log(`Props! ${employeeID} ${hoursWTD}`);
    const [targetID, setTargetID] = useState ("");
    const [hoursChange, setHoursChange] = usestate (0.00);
    
    const handleAddHours = async () => {
        //Get Employee by ID entered into text box, get hours from that get and add input from second text box, try update hours with ID and result and return a message with either success or failure.
        console.log(`Attempting to add ${hoursChange} hours from ${targetID}.`);
    };

    const handleSubtractHours = async () => {
        //Get Employee by ID entered into text box, get hours from that get and subtract input from second text box, try update hours with ID and result and return a message with either success or failure.
        //Ensure that hours does not fall below zero
        console.log(`Attempting to subtract ${hoursChange} hours from ${targetID}.`);
    };
    
    return (
        <Fragment>
            <Typography component="div" variant='h3'>
                Manual Adding / Subtracting of hours here
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
                    +
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubtractHours}
                    disabled={}
                    sx={{ minWidth: 120, height: 120 }}
                >
                    -
                </Button>
            </Box>
        </Fragment>
    )
}
