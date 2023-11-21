import React, {useState, useEffect, Fragment} from 'react';
import API from './API_Interface/API_Interface';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';


export default function Login({setUser, setPerms, setUserID, setName}) {
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);


    const handleInputChangeFirstName = event => {
        console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserFirstName(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    const handleInputChangeLastName = event => {
        console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserLastName(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    useEffect(() => {

        if( ! verifyUser || userFirstName === "" || userLastName === "")
            return;


        const api = new API();
        async function getUserInfo() {
            api.getUserInfo(userFirstName, userLastName)
                .then( userInfo => {
                console.log(`api returns user info and it is: ${JSON.stringify(userFirstName)} , ${JSON.stringify(userLastName)}, ${JSON.stringify(userInfo)}`)
                const employeeID = userInfo.employeeID;
                const permLevel = userInfo.permLevel;
                //TODO: hook in permissionLevel into the login screen
                //This 1 is a temporary value

                if( userInfo.status === "OK" ) {
                    setUserID(employeeID);
                    setName(userFirstName + " " + userLastName);
                    setPerms(permLevel);
                    
                } else  {
                    setVerifyUser(false);
                    setAuthFailed(true);
                }
            });
        }

        getUserInfo();
    }, [verifyUser, setUser, userFirstName, userLastName]);


    return (
       <Fragment>
           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="First name"
                    placeholder=""
                    value={userFirstName}
                    onChange={handleInputChangeFirstName}
                />
                <Divider />
           </Box>

           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={5}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Last name"
                    placeholder=""
                    value={userLastName}
                    helperText="Only for existing users!"
                    onChange={handleInputChangeLastName}
                />
                <Divider />
           </Box>

           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
           <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {setVerifyUser(true)}}
                >Proceed</Button>
           </Box>
       </Fragment>

    );
}