import React, {Fragment, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import API from '../../API_Interface/API_Interface';



export default function Timecard(props) {
    //const {employeeID} = props;
    const employeeID = props.employeeID;
    console.log(`Props! ${employeeID}`);
    const [isClockedIn, setIsClockedIn] = useState(false);
    //const [employeeID, setEmployeeID] = useState(0);
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');

    const handleClockIn = async () => {
        setIsClockedIn(true);

        const api = new API();

        const response = await api.clockIn(employeeID);
        console.log('Response received:', response);
        if (response.status !== 'OK') {
            console.error('Clock in failed!!:', response.error);
            setIsClockedIn(false);
        }

    };


    const handleClockOut = async () => {
        setIsClockedIn(false);

        const api = new API();

        const response = await api.clockOut(employeeID);
        console.log('Response for clock-out received:', response);
        if (response.status !== 'OK') {
            console.error('Clock out failed!!:', response.error);
            setIsClockedIn(true);
        }

    };

    // useEffect(() => {
    //
    //     if( ! isClockedIn )
    //         return;
    //
    //     const api = new API();
    //     async function getUserInfo() {
    //         api.getUserInfo(userFirstName, userLastName)
    //             .then( userInfo => {
    //                 console.log(`api returns user info and it is: ${JSON.stringify(userFirstName)} , ${JSON.stringify(userLastName)}, ${JSON.stringify(userInfo)}`)
    //                 const employeeID = userInfo.employeeID;
    //                 console.log(`Employee ID is ${employeeID}`)
    //                // const permLevel = userInfo.permLevel;
    //                 //TODO: hook in permissionLevel into the login screen
    //                 //This 1 is a temporary value
    //
    //                 setEmployeeID(employeeID);
    //
    //             });
    //     }
    //
    //     getUserInfo();
    // }, [isClockedIn, employeeID, userFirstName, userLastName]);



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

