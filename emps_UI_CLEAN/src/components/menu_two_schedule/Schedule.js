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
        color: 'aa3f0ffa0',
        align: 'left'
    },
    {
        title: 'Monday',
        color: 'af3f3faa3',
        align: 'left'
    },
    {
        title: 'Tuesday',
        color: 'aa3f0ffa0',
        align: 'left'
    },
    {
        title: 'Wednsday',
        color: 'af3f3faa3',
        align: 'left'
    },
    {   
        title: 'Thursday',
        color: 'aa3f0ffa0',
        alight: 'left'
    },
    {
        title: 'Friday',
        color: 'af3f3faa3',
        alight: 'left'
    },
    {
        title: 'Saturday',
        color: 'aa3f0ffa0',
        alight: 'left'
    },
    {
        title: 'Sunday',
        color: 'af3f3faa3',
        align: 'left'
    }
];

//Finding the Date SUCKS
//Edit: 12/1/2023
//Still sucks
function findMonday(date) {
    let dateMonday = 0;

    var dayName = date.slice(0, 3);
    var day = date.slice(8,10);
    var monthName = date.slice(4, 7); //January is 0!
    var month = 0
    var year = date.slice(11);
    var maxDayInMonth = 0;

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
        month--;
        if (month === 1) 
        {
            if (year % 4 === 0) 
            {
                maxDayInMonth = 29;
                dateMonday += 29;
            }
            else 
            {
                maxDayInMonth = 28;
                dateMonday += 28;
            }
        }
        else if (month === 3 || month === 5 || month === 8 || month === 10) 
        {
            maxDayInMonth = 30;
            dateMonday += 30;
        }
        else 
        {
            maxDayInMonth = 31;
            dateMonday += 31;
        }
    }

    return [dateMonday, maxDayInMonth];
}

function weeklyViewAssembler(schedule, date) {
    let value = findMonday(date);
    var currDay = value[0];
    var offset = 0;
    const maxDaysInMonth = value[1];

    //console.log(`${maxDaysInMonth} | ${currDay}`)
    let array = [];
    let subArray = [];
    let hours = 0;
    let timeDisplay = "";

    let mondayShift = dailyViewAssembler(schedule, currDay + offset);

    offset++;
    if (currDay > maxDaysInMonth) {
        currDay = 1;
        offset = 0;
        //console.log(`Hit Monday | ${currDay}`)
    }

    let tuesdayShift = dailyViewAssembler(schedule, currDay + offset);

    offset++;
    if (currDay + offset > maxDaysInMonth) {
        currDay = 1;
        offset = 0;
        //console.log(`Hit Tuesday| ${currDay}`)
    }

    let wednesdayShift = dailyViewAssembler(schedule, currDay + offset);

    offset++;
    if (currDay + offset > maxDaysInMonth) {
        currDay = 1;
        offset = 0;
        //console.log(`Hit Wednesday | ${currDay}`)
    }

    let thursdayShift = dailyViewAssembler(schedule, currDay + offset);

    offset++;
    if (currDay + offset > maxDaysInMonth) {
        currDay = 1;
        offset = 0;
        //console.log(`Hit Thursday | ${currDay}`)
    }

    let fridayShift = dailyViewAssembler(schedule, currDay + offset);

    offset++;
    if (currDay + offset > maxDaysInMonth) {
        currDay = 1;
        offset = 0;
        //console.log(`Hit Friday | ${currDay}`)
    }

    let saturdayShift = dailyViewAssembler(schedule, currDay + offset);

    offset++;
    if (currDay + offset > maxDaysInMonth) {
        currDay = 1;
        offset = 0;
        //console.log(`Hit Saturday | ${currDay}`)
    }

    let sundayShift = dailyViewAssembler(schedule, currDay + offset);

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
        if (parseInt(day) === currDay) {
            shifts.push(schedule[i]);
            //console.log(`${start} | ${end} | ${day}`);
        }
    }

    let startTime = 0;
    let tickingTime = 0;
    let hours = 0;
    //console.log(shifts);
    for (let i = 0, shiftItr = 0, inShift = 0, foundStart = 0; i < 48; i++) {
        if (shiftItr >= shifts.length) {
            arrayToReturn.push(0);
        }
        else if (inShift === 0){
            if (shifts[shiftItr].startTime[shiftItr] === '0') {
                startTime = shifts[shiftItr].startTime.slice(1, 5);
            }
            else {
                startTime = shifts[shiftItr].startTime.slice(0, 5);
            }
            console.log(startTime);

            if (shifts[0].startTime.slice(3, 5) === 30) {
                tickingTime = parseInt(shifts[shiftItr].endTime.slice(0, 3)) - parseInt(shifts[shiftItr].startTime.slice(0, 3)) + 0.5;
            }
            else {
                tickingTime = parseInt(shifts[shiftItr].endTime.slice(0, 3)) - parseInt(shifts[shiftItr].startTime.slice(0, 3));
            }
            //console.log(tickingTime);
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

    //console.log(arrayToReturn);

    return (arrayToReturn);
}

function scheduleBox(value, colorVal) {
    if (value === 1) {
        if (colorVal === 0) {
            return (
                <Fragment>
                    <TableCell align="left" bgcolor='8f3f3f88'></TableCell>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <TableCell align="left" bgcolor='8f3f0ff80'></TableCell>
                </Fragment>
            )
        }
    }
    else {
        if (colorVal === 0) {
            return (
                <Fragment>
                    <TableCell align="left" bgcolor='f00f00f00'></TableCell>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <TableCell align="left" bgcolor='ff0ff0ff0'></TableCell>
                </Fragment>
            )
        }
    }
}

function colorAlternator2(value) {
    if (value === 1) {
        return 'd00d00d00';
    }
    else {
        return 'ff0fa0fa0';
    }
}

export default function MessageTable(props) {

    const currentDate = new Date().toDateString();
    //console.log(currentDate.slice(4));
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
        let colorVal = 0;
        if (routeObject.hours.length === 8) {
            if (routeObject.hours.slice(3, 5) === '30') {
                colorVal = 0;
            }
            else {
                colorVal = 1;
            }
        }
        else {
            if (routeObject.hours.slice(2, 4) === '30') {
                colorVal = 0;
            }
            else {
                colorVal = 1;
            }
        }

        return (
        <Fragment>
            <TableRow sx={{MaxHeight:'100%', MaxWidth:'100%'}}>
                <TableCell align="left" bgcolor={colorAlternator2(colorVal)} sx={{fontSize: 'large'}}> {routeObject.hours} </TableCell>

                {
                    scheduleBox(routeObject.monday, 0)
                }
                {
                    scheduleBox(routeObject.tuesday, 1)
                }
                {
                    scheduleBox(routeObject.wednsday, 0)
                }
                {
                    scheduleBox(routeObject.thursday, 1)
                }
                {
                    scheduleBox(routeObject.friday, 0)
                }
                {
                    scheduleBox(routeObject.saturday, 1)
                }
                {
                    scheduleBox(routeObject.sunday, 0)
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
                                                    bgcolor={attr.color}
                                                    sx={{fontSize: 'large'}}>
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