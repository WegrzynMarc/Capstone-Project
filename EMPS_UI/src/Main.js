
import React, { useState, Fragment } from 'react';
import Login from './Login';
import App from './App';

const logout = (setUser) => {
    return () => {
        setUser(undefined);
    }
};

export default function Main() {

    const [user, setUser] = useState("Demo");
    const [permissionLevel, setPermissionLevel] = useState(1)

    return (
        <Fragment>
            {
                (user !== undefined && (permissionLevel === 1 || permissionLevel === 2)) ? (
                    <App user={user} permissionLevel={permissionLevel} logoutAction={logout(setUser)} />
                ) : (
                    <Login user={user} setUser={setUser} setPerms={setPermissionLevel} />
                )
            }
        </Fragment>
    )

}