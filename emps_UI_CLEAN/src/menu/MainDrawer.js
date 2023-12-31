import React, {Fragment, useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import {presentationComponentsEmployee, presentationComponentsManager, containerComponents}  from './MenuPresentationComponents';
import Button from "@mui/material/Button";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' })(
    ({theme, open}) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    })
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const TopBar = ({open, handleDrawerOpen, title, user, userID, logoutAction}) => {
    // This component is responsible for rendering the Toolbar that is drawn
    // at the top of the drawer.

    return (
        <Fragment>
            <AppBar position="fixed" open={open} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                    <Box width="100%" justifyContent="center" flex={1}>
                        <Typography variant="h6" noWrap component="div" align="center">
                            {user}
                        </Typography>
                    </Box>
                    <Box width="100%" justifyContent="center" flex={1}>
                        <Typography variant="h6" noWrap component="div" align="center">
                            {userID}
                        </Typography>
                    </Box>
                    <Box width="100%" justifyContent="right" flex={1}>
                        <Typography variant="h7" noWrap component="div" align="right" onClick={() => logoutAction()}>
                            Logout
                        </Typography>
                    </Box>

                </Toolbar>
            </AppBar>
        </Fragment>
    )
};

const PresentationListItems = (props) => {
    return <div>
        {
            props.menuItemTitles.map(title =>
                <ListItem button onClick={() => props.onClick(title)} key={title}>
                    <ListItemText primary={title} key={title}/>
                    {
                        props.selectedItem === title && <ListItemIcon><ChevronRightIcon/></ListItemIcon>
                    }
                </ListItem>
            )
        }
    </div>;
};

const ContainerListItems = (props) => {
    return  <div>
        {
            props.menuItemTitles.map(title =>
                <ListItem button onClick={() => props.onClick(title)} key={title}>
                    <ListItemText primary={title} key={title}/>
                    {
                        props.selectedItem === title && <ListItemIcon><ChevronRightIcon/></ListItemIcon>
                    }
                </ListItem>
            )
        }
    </div>
};

const getpresentationComponents = (permissionLevel) => {
    
    switch(permissionLevel) {
        case 0: {
            const componentEmployee = [...presentationComponentsEmployee()]
            return componentEmployee
        }
        case 1: {
            const componentManager =  [...presentationComponentsEmployee(), ...presentationComponentsManager()]
            return componentManager
        }
        default: {
           return {
                title: null,
                component: null     
            }
        }
    }
};

const findSelectedComponent = (selectedItem, userID, user) => {
    const component = [...presentationComponentsManager(userID, user), ...presentationComponentsEmployee(userID, user),
                        ...containerComponents()].filter(comp => comp.title === selectedItem);
    
    if(component.length === 1)
        return component[0];

    //console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the menu item.")
    return {
        title: null,
        component: null
    }
};

/*
const wrapperFunction = (value, setFirstLoad, selectedItem, userID, user) => {
    if (value === 0) {
        setFirstLoad(1);
        const component = [...presentationComponentsEmployee(userID, user)];
        console.log(component[0]);
        return component[0].component;
    }
    else {
        return findSelectedComponent(selectedItem, userID, user).component;
    }
}*/

export default function MainDrawer({title, user, userID, logoutAction, permissionLevel}) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [firstLoad, setFirstLoad] = useState(0);
    const [selectedItem, setSelectedItem] = useState('Time Card');

    //console.log(`in MainDrawer | ${selectedItem}`);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSelectedItem = (title) => {
        setSelectedItem(title)
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBar title={"Menus"} open={open} handleDrawerOpen={handleDrawerOpen} user={user} userID={userID} logoutAction={logoutAction} />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <PresentationListItems selectedItem={selectedItem}
                                           onClick={handleSelectedItem}
                                           menuItemTitles={getpresentationComponents(permissionLevel).map(comp => comp.title)}
                    />
                </List>
               
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {
                    findSelectedComponent(selectedItem, userID, user).component
                    //wrapperFunction(firstLoad, setFirstLoad, selectedItem, userID, user)
                }
            </Main>
        </Box>
    );
}