import React, { Fragment, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import API from '../../API_Interface/API_Interface';

export default function Timecard(props) {
    const employeeID = props.employeeID;
    const [isClockedIn, setIsClockedIn] = useState(false);
    const api = new API();

    useEffect(() => {
        const fetchClockedInStatus = async () => {
            const response = await api.clockedInStatus(employeeID);
            if (response.status === 'OK') {
                setIsClockedIn(response.clockedIn);
                //console.log(`CLocked in? ${response.clockedIn}`);
            }
        };

        fetchClockedInStatus();
    }, [employeeID]);

    const handleClockIn = async () => {
        const response = await api.clockIn(employeeID);
        if (response.status === 'OK') {
            setIsClockedIn(true);
        } else {
            //console.error('Clock in failed:', response.error);
            setIsClockedIn(false);
        }
    };

    const handleClockOut = async () => {
        const response = await api.clockOut(employeeID);
        if (response.status === 'OK') {
            setIsClockedIn(false);
        } else {
            //console.error('Clock out failed:', response.error);
            setIsClockedIn(true);
        }
    };

    return (
        <Fragment>
            <Box display="flex" justifyContent="center" gap={2}>
                <Button
                
                    variant="contained"
                    color="primary"
                    onClick={handleClockIn}
                    disabled={isClockedIn}
                    sx={{ minWidth: 400, height: 400, fontSize: "40px" }}
                >
                    Clock In
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClockOut}
                    disabled={!isClockedIn}
                    sx={{ minWidth: 400, height: 400, fontSize: "40px" }}
                >
                    Clock Out
                </Button>
            </Box>
        </Fragment>
    );
}