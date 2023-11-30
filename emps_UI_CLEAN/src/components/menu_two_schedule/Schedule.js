import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; 
import { Height, SwitchAccessShortcutAddOutlined } from '@mui/icons-material';


const ScheduleTableAttributes = [
    {
        title: 'Time',
        align: 'left'
    },
    {
        title: 'Monday',
        align: 'left'
    },
    {
        title: 'Tuesday',
        align: 'left'
    },
    {
        title: 'Wednsday',
        align: 'left'
    },
    {   
        title: 'Thursday',
        alight: 'left'
    },
    {
        title: 'Friday',
        alight: 'left'
    },
    {
        title: 'Saturday',
        alight: 'left'
    },
    {
        title: 'Sunday',
        align: 'left'
    }
];

//Finding the Date SUCKS
function findMonday(date) {
    let dateMonday = 0;

    var dayName = date.slice(0, 3);
    var day = date.slice(8,10);
    var monthName = date.slice(4, 7); //January is 0!
    var month = 0
    var year = date.slice(11);

    //Day Math
    if (dayName === "Mon") {
        dateMonday = day;
    }
    else {
        if (dayName === "Tue") {
            dateMonday = day - 1;
        }
        else if (dayName === "Wed") {
            dateMonday = day - 2;
        }
        else if (dayName === "Thu") {
            dateMonday = day - 3;
        }
        else if (dayName === "Fri") {
            dateMonday = day - 4;
        }
        else if (dayName === "Sat") {
            dateMonday = day - 5;
        }
        else if (dayName === "Sun") {
            dateMonday = day - 6;
        }
    }

    //Conver the month name into an integer
    if (monthName === "Jan") {
        month = 0;
    }
    else if (monthName === "Feb") {
        month = 1;
    }
    else if (monthName === "Mar") {
        month = 2;
    }
    else if (monthName === "Apr") {
        month = 3;
    }
    else if (monthName === "May") {
        month = 4;
    }
    else if (monthName === "Jun") {
        month = 5;
    }
    else if (monthName === "Jul") {
        month = 6;
    }
    else if (monthName === "Aug") {
        month = 7;
    }
    else if (monthName === "Sep") {
        month = 8;
    }
    else if (monthName === "Oct") {
        month = 9;
    }
    else if (monthName === "Nov") {
        month = 10;
    }
    else if (monthName === "Dec") {
        month = 11;
    }

    //Month Math
    if (dateMonday <= 0) 
    {
        if (month === 1) 
        {
            if (year % 4 === 0) 
            {
                dateMonday += 29;
            }
            else 
            {
                dateMonday += 28;
            }
        }
        else if (month === 3 || month === 5 || month === 8 || month === 10) 
        {
            dateMonday += 30;
        }
        else 
        {
            dateMonday += 31;
        }
    }
    
    return dateMonday;
}

function weeklyViewAssembler(schedule, date) {
    const currDay = findMonday(date);
    let array = [];
    let subArray = [];
    let hours = 0;
    let timeDisplay = "";

    let mondayShift = dailyViewAssembler(schedule, currDay);
    let tuesdayShift = dailyViewAssembler(schedule, currDay + 1);
    let wednesdayShift = dailyViewAssembler(schedule, currDay + 2);
    let thursdayShift = dailyViewAssembler(schedule, currDay + 3);
    let fridayShift = dailyViewAssembler(schedule, currDay + 4);
    let saturdayShift = dailyViewAssembler(schedule, currDay + 5);
    let sundayShift = dailyViewAssembler(schedule, currDay + 6);

    var dayName = date.slice(0, 3);
    var day = date.slice(8,10);
    var month = date.slice(4, 7); //January is 0!
    var year = date.slice(11);
    //console.log(findMonday(date));
    //console.log(`${day} / ${dayName} | ${month} | ${year}`);
    //console.log(dailyViewAssembler(schedule, currDay));
    for (let i = 0; i < 48; i++) {
        if (i % 2 === 0) {
            hours = i/2; 
            if (hours > 11.5) {
                if (hours > 12) {
                    timeDisplay = `${hours - 12}:00 PM`
                }
                else {
                    timeDisplay = `${hours}:00 PM`
                }
            }
            else {
                timeDisplay = `${hours}:00 AM`
            }

            subArray =
            {
                hours: timeDisplay,
                monday: mondayShift[i], 
                tuesday: tuesdayShift[i],
                wednsday: wednesdayShift[i],
                thursday: thursdayShift[i],
                friday: fridayShift[i],
                saturday: saturdayShift[i],
                sunday: sundayShift[i]
            }
        }
        else {
            hours = i/2 - 0.5;
            if (hours > 11.5) {
                if (hours > 12) {
                    timeDisplay = `${hours - 12}:30 PM`
                }
                else {
                    timeDisplay = `${hours}:30 PM`
                }
            }
            else {
                timeDisplay = `${hours}:30 AM`
            }
            subArray =
            {
                hours: timeDisplay,
                monday: mondayShift[i], 
                tuesday: tuesdayShift[i],
                wednsday: wednesdayShift[i],
                thursday: thursdayShift[i],
                friday: fridayShift[i],
                saturday: saturdayShift[i],
                sunday: sundayShift[i]
            }
        }    
        array.push(subArray);
    }
    return (array);
}

function dailyViewAssembler(schedule, currDay) {
    let shifts = [];
    let arrayToReturn = [];
    let start;
    let end;
    let day;
    for (let i = 0; i < schedule.length; i++) {
        start = schedule[i].startTime;
        end = schedule[i].endTime;
        day = schedule[i].startDate.slice(8, 10);
        if (day === String(currDay)) {
            shifts.push(schedule[i]);
            console.log(`${start} | ${end} | ${day}`);
        }
    }

    let startTime = 0;
    let tickingTime = 0;
    let hours = 0;
    for (let i = 0, shiftItr = 0, inShift = 0, foundStart = 0; i < 48; i++) {
        if (shiftItr >= shifts.length) {
            arrayToReturn.push(0);
        }
        else if (inShift === 0){
            if (shifts[0].startTime[0] === '0') {
                startTime = shifts[0].startTime.slice(1, 5);
            }
            else {
                startTime = shifts[0].startTime.slice(0, 5);
            }
            console.log(startTime);

            if (shifts[0].startTime.slice(3, 5) === 30) {
                tickingTime = parseInt(shifts[0].endTime.slice(0, 3)) - parseInt(shifts[0].startTime.slice(0, 3)) + 0.5;
            }
            else {
                tickingTime = parseInt(shifts[0].endTime.slice(0, 3)) - parseInt(shifts[0].startTime.slice(0, 3));
            }
            console.log(tickingTime);
            inShift = 1;
            foundStart = 0;

            if (i % 2 === 0) {
                hours = i/2; 
                if (startTime === `${hours}:00` && foundStart === 0) {
                    foundStart = 1;
                    arrayToReturn.push(1);
                }
                else {
                    arrayToReturn.push(0);
                }
            }
            else {
                hours = i/2 - 0.5;
                if (startTime === `${hours}:30` && foundStart === 0) {
                    foundStart = 1;
                    arrayToReturn.push(1);
                }
                else {
                    arrayToReturn.push(0);
                }
            }
        }
        else if (foundStart === 1) {
            if (tickingTime > 0) {
                arrayToReturn.push(1);
                tickingTime -= 0.5;
            }
            else {
                arrayToReturn.push(0);
                shiftItr++;
                foundStart = 0;
                inShift = 0;
            }
        }
        else {
            if (i % 2 === 0) {
                hours = i/2; 
                if (startTime === `${hours}:00` && foundStart === 0) {
                    foundStart = 1;
                    arrayToReturn.push(1);
                }
                else {
                    arrayToReturn.push(0);
                }
            }
            else {
                hours = i/2 - 0.5;
                if (startTime === `${hours}:30` && foundStart === 0) {
                    foundStart = 1;
                    arrayToReturn.push(1);
                }
                else {
                    arrayToReturn.push(0);
                }
            }
        }
    }

    console.log(arrayToReturn);

    return (arrayToReturn);
}

function scheduleBox(value) {
    if (value === 1) {
        return (
            <Fragment>
                <TableCell align="left" bgcolor='lightblue'></TableCell>
            </Fragment>
        )
    }
    else {
        return (
            <Fragment>
                <TableCell align="left" bgcolor='white'></TableCell>
            </Fragment>
        )
    }
}

/*
<TableCell align="left">
                    <Button variant="contained"
                        title="Approve"
                        onClick={() => HandleApprove(employeeID, routeObject.messageID, setmessages, employeeName)}> 
                            |      |
                    </Button>
                </TableCell>
                <TableCell align="left">
                    <Button variant="contained"
                        title="Approve"
                        onClick={() => HandleApprove(employeeID, routeObject.messageID, setmessages, employeeName)}> 
                            |      |
                    </Button>
                </TableCell>
                <TableCell align="left">
                    <Button variant="contained"
                        title="Approve"
                        onClick={() => HandleApprove(employeeID, routeObject.messageID, setmessages, employeeName)}> 
                            |      |
                    </Button>
                </TableCell>
                <TableCell align="left">
                    <Button variant="contained"
                        title="Approve"
                        onClick={() => HandleApprove(employeeID, routeObject.messageID, setmessages, employeeName)}> 
                            |      |
                    </Button>
                </TableCell>
                <TableCell align="left">
                    <Button variant="contained"
                        title="Approve"
                        onClick={() => HandleApprove(employeeID, routeObject.messageID, setmessages, employeeName)}> 
                            |      |
                    </Button>
                </TableCell>
                <TableCell align="left">
                    <Button variant="contained"
                        title="Approve"
                        onClick={() => HandleApprove(employeeID, routeObject.messageID, setmessages, employeeName)}> 
                            |      |
                    </Button>
                </TableCell>
                <TableCell align="left">
                    <Button variant="contained"
                        title="Approve"
                        onClick={() => HandleApprove(employeeID, routeObject.messageID, setmessages, employeeName)}> 
                            |      |
                    </Button>
                </TableCell>
*/
export default function MessageTable(props) {

    const currentDate = new Date().toDateString();
    console.log(currentDate.slice(4));
    const [schedule, setSchedule] = useState([]);
    //console.log(`in messageTable routes contains is ${JSON.stringify(message)}`);

    const employeeID = props.employeeID;
    //const employeeName = props.employeeName;
    
    useEffect(() => {
        const api = new API();

        async function getmessages() {
                //For some reason, all the time being returned has an offset of +8.
                //  No idea why, but this needs to be revisited down the line.
                const routesJSONString = await api.schedulesWithEmployeeID(employeeID);
                //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
                setSchedule(weeklyViewAssembler(routesJSONString.data, currentDate));
        }

        getmessages();
    }, []);
    

    const TRow = ({routeObject}) => {
        
        return (
        <Fragment>
            <TableRow sx={{MaxHeight:'100%', MaxWidth:'100%'}}>
                <TableCell align="left" bgcolor='f0f0f0'> {routeObject.hours} </TableCell>

                {
                    scheduleBox(routeObject.monday)
                }
                {
                    scheduleBox(routeObject.tuesday)
                }
                {
                    scheduleBox(routeObject.wednsday)
                }
                {
                    scheduleBox(routeObject.thursday)
                }
                {
                    scheduleBox(routeObject.friday)
                }
                {
                    scheduleBox(routeObject.saturday)
                }
                {
                    scheduleBox(routeObject.sunday)
                }
                
            </TableRow>
        </Fragment>
        );
    }

    return <Fragment>
        {
            schedule.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{maxWidth:'fix-content', maxHeight:'fit-content'}} aria-label="schedule table">
                        <TableHead>
                            <TableRow>
                                {
                                    ScheduleTableAttributes.map((attr, idx) =>
                                        <TableCell  key={idx}
                                                    align={attr.align}
                                                    bgcolor='aa3f0ffa0'>
                                                    {attr.title}
                                        </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                schedule.map((schedule, idx) => (
                                    <TRow routeObject={schedule} key={idx}/>
                                ))
                            }

                            

                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}