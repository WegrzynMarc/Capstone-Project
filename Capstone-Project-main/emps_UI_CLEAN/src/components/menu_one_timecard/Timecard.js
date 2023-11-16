import React, { Fragment, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';



export default function Timecard(props) {
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [employeeID, setEmployeeID] = useState(0);

    const handleClockIn = async () => {
        setIsClockedIn(true);
        console.log(employeeID)

        try {
            const endpoint = `http://localhost:3000/:employeeID`;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to clock in');
            }

            const data = await response.json();

            if (data.status !== 'OK') {
                setIsClockedIn(false);
            }
        } catch (error) {
            console.error('Error during clock in:', error);
            setIsClockedIn(false);
        }
    };


    const handleClockOut = () => {
        setIsClockedIn(false);

    };



    return (
        <Fragment>
            <Typography component="div" variant='h3' align='center' gutterBottom>
                Clock in / Clock out here {employeeID}
            </Typography>

            <Box display="flex" justifyContent="center" gap={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClockIn}
                    disabled={isClockedIn}
                    sx={{ minWidth: 120, height: 120 }}
                >
                    Clock In
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClockOut}
                    disabled={!isClockedIn}
                    sx={{ minWidth: 120, height: 120 }}
                >
                    Clock Out
                </Button>
            </Box>
        </Fragment>
    );
}

