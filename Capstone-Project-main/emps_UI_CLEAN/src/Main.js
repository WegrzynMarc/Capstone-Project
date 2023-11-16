
import React, { useState, Fragment } from 'react';
import Login from './Login';
import App from './App';

const logout = (setUserID) => {
    return () => {
        setUserID(undefined);
    }
};

export default function Main() {

    const [userFullName, setUserFullName] = useState(undefined);
    const [userID, setUserID] = useState(undefined);
    const [permissionLevel, setPermissionLevel] = useState(undefined)

    return (
        <Fragment>
            {
                (userID !== undefined && (permissionLevel === 0 || permissionLevel === 1)) ? (
                    <App userFullName={userFullName} userID={userID} permissionLevel={permissionLevel} logoutAction={logout(setUserID)} />
                ) : (
                    <Login userID={userID} userFullName={userFullName} setUserID={setUserID} setName={setUserFullName} setPerms={setPermissionLevel} />
                )
            }
        </Fragment>
    )

}