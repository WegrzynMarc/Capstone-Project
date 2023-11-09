import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';

export default function UpdateHours(props) {

    const [employeeID, setEmployeeID] = useState(0o000000);
    const [hours, setHours] = useState(0);
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);


    const handleInputEmployee = event => {
        //console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setEmployeeID(event.target.value);
        //setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            //setVerifyUser(true);
        }
    };

    const handleInputHours = event => {
        //console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setHours(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            //setVerifyUser(true);
        }
    };

    return (
        <Fragment>
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>
 
                 <TextField
                     error={authFailed}
                     id="outlined-error-helper-text"
                     label="Employee ID"
                     placeholder=""
                     value={employeeID}
                     onChange={handleInputEmployee}
                 />
                 <Divider />
            </Box>
 
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={5}>
 
                 <TextField
                     error={authFailed}
                     id="outlined-error-helper-text"
                     label="Hours for Add/Remove"
                     placeholder=""
                     value={hours}
                     onChange={handleInputHours}
                 />
                 <Divider />
            </Box>

            <Grid container display="flex" justifyContent="center" alignItems="center" width="102%" mt={12} spacing={0}>
                <Grid xs={4}>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => {setVerifyUser(true)}}
                    >ADD</Button>
                </Grid>
                <Grid xs={0}>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => {setVerifyUser(true)}}
                    >REMOVE</Button>
                </Grid>
            </Grid>
        </Fragment>
     );
}
