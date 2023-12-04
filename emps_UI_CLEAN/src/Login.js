import React, {useState, useEffect, Fragment} from 'react';
import API from './API_Interface/API_Interface';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';


export default function Login({setUser, setPerms, setUserID, setName}) {
    const [userUsername, setUserUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);


    const handleInputChangeUsername = event => {
        //console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserUsername(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    const handleInputChangePassword = event => {
        //console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserPassword(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            //console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    useEffect(() => {

        if( ! verifyUser || userUsername === "" || userPassword === "")
            return;


        const api = new API();
        async function getUserInfo() {
            api.getUserInfo(userUsername, userPassword)
                .then( userInfo => {
                //console.log(userInfo);
                //console.log(`api returns user info and it is: ${JSON.stringify(userFirstName)} , ${JSON.stringify(userLastName)}`);
                const employeeID = userInfo.employeeID;
                const firstName = userInfo.firstname;
                const lastName = userInfo.lastname;
                const permLevel = userInfo.permLevel;

                if( userInfo.status === "OK" ) {
                    setUserID(employeeID);
                    setName(firstName + " " + lastName);
                    setPerms(permLevel);
                    
                } else  {
                    setVerifyUser(false);
                    setAuthFailed(true);
                }
            });
        }

        getUserInfo();
    }, [verifyUser, setUser]);


    return (
       <Fragment>
           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Username"
                    placeholder=""
                    value={userUsername}
                    onChange={handleInputChangeUsername}
                />
                <Divider />
           </Box>

           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={5}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Password"
                    type="password"
                    placeholder=""
                    value={userPassword}
                    helperText="Only for existing users!"
                    onChange={handleInputChangePassword}
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