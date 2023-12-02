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
import TextField from '@mui/material/TextField';
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
//Edit: 12/1/2023
//Still sucks
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
        month--;
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
                wednesday: wednesdayShift[i],
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
                wednesday: wednesdayShift[i],
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
            //console.log(startTime);

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

function colorHelper(value) {
    if (value === 1) {
        return 'lightblue';
    }
    else {
        return 'white';
    }
}

function ScheduleBox(value, key, swapColors, day, schedule, setSchedule) {
    const [color, setColor] = useState(colorHelper(value));
    return (
        <Fragment>
            <TableCell 
                align="left" 
                bgcolor={color}
                onClick={() => 
                    {
                        swapColors(value, key, day, schedule, setSchedule, setColor);
                    }
                }
                >
                
            </TableCell>
        </Fragment>
    )
}

async function getSchedule(employeeID, currentDate, setSchedule) {
    
    const api = new API();

    const routesJSONString = await api.schedulesWithEmployeeID(employeeID);
    //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
    setSchedule(weeklyViewAssembler(routesJSONString.data, currentDate));
}

function updateSchedule(schedule) {
    console.log(schedule)
}

function swapColors(val, rowLoc, weekday, schedule, setSchedule, setColor) {

    //Get the column to change
    let row = schedule[rowLoc];
    if (weekday === "Mon") {
        if (val === 0) {
            row.monday = 1;
            setColor('lightblue')
        } 
        else {
            row.monday = 0;
            setColor('white')
        } 
    }
    else if (weekday === "Tue") {
        if (val === 0) {
            row.tuesday = 1;
            setColor('lightblue')
        } 
        else {
            row.tuesday = 0;
            setColor('white')
        }
    }
    else if (weekday === "Wed") {
        if (val === 0) {
            row.wednesday = 1;
            setColor('lightblue')
        } 
        else {
            row.wednesday = 0;
            setColor('white')
        }
    }
    else if (weekday === "Thu") {
        if (val === 0) {
            row.thursday = 1;
            setColor('lightblue')
        } 
        else {
            row.thursday = 0;
            setColor('white')
        }
    }
    else if (weekday === "Fri") {
        if (val === 0) {
            row.friday = 1;
            setColor('lightblue')
        } 
        else {
            row.friday = 0;
            setColor('white')
        }
    }
    else if (weekday === "Sat") {
        if (val === 0) {
            row.saturday = 1;
            setColor('lightblue')
        } 
        else {
            row.saturday = 0;
            setColor('white')
        }
    }
    else if (weekday === "Sun") {
        if (val === 0) {
            row.sunday = 1;
            setColor('lightblue')
        } 
        else {
            row.sunday = 0;
            setColor('white')
        }
    }

    setSchedule(schedule);

    //console.log(row);
    //console.log(`${val} | Row: ${row} | Day: ${weekday}`);
}

function colorAlternator(value) {
    if (value % 2 === 0) {
        return 'aa3f0ffa0';
    }
    else {
        return 'af3f3faa3';
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
    const [schedule, setSchedule] = useState([]);
    const [selectedEmployeeID, setSelectedEmployeeID] = useState('000000');    

    const handleEmployeeID = event => {
        setSelectedEmployeeID(event.target.value);
    };

    useEffect(() => {
        const api = new API();

        async function getSchedule() {
                const routesJSONString = await api.schedulesWithEmployeeID(selectedEmployeeID);
                //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
                setSchedule(weeklyViewAssembler(routesJSONString.data, currentDate));
        }

        getSchedule();
    }, []);

    const retrieveEmployeeSchedule = event => {
        getSchedule(selectedEmployeeID, currentDate, setSchedule)
    }; 

    const TRow = (props) => {
        const routeObject = props.routeObject;
        //console.log(routeObject);
        const key = props.val;
        const swapColors = props.swapColors;
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

        //TODO: Update the schedule so every :30 increment of time is updated.
        return (
        <Fragment>
            <TableRow sx={{MaxHeight:'100%', MaxWidth:'100%'}}>
                <TableCell align="left" bgcolor={colorAlternator2(colorVal)}> {routeObject.hours} </TableCell> 
                {
                    ScheduleBox(routeObject.monday, key, swapColors, "Mon", schedule, setSchedule)
                }
                {
                    ScheduleBox(routeObject.tuesday, key, swapColors, "Tue", schedule, setSchedule)
                }
                {
                    ScheduleBox(routeObject.wednesday, key, swapColors, "Wed", schedule, setSchedule)
                }
                {
                    ScheduleBox(routeObject.thursday, key, swapColors, "Thu", schedule, setSchedule)
                }
                {
                    ScheduleBox(routeObject.friday, key, swapColors, "Fri", schedule, setSchedule)
                }
                {
                    ScheduleBox(routeObject.saturday, key, swapColors,"Sat", schedule, setSchedule)
                }
                {
                    ScheduleBox(routeObject.sunday, key, swapColors, "Sun", schedule, setSchedule)
                }
                
            </TableRow>
        </Fragment>
        );
    }

    return <Fragment>

        <Box display="flex" justifyContent="center" mt={2} gap={0}> 
            <Box></Box>
            <Box display="flex" justifyContent="right" alignItems="center" width="100%">
                <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {retrieveEmployeeSchedule()}}
                >
                    Get Employee Schedule
                </Button>
           </Box>

           <Box display="flex" justifyContent="center" width="100%">
                <TextField
                    label="Employee ID"
                    value={selectedEmployeeID}
                    onChange = {handleEmployeeID}
                />
            </Box>
           
           <Box display="flex" justifyContent="left" alignItems="center" width="100%">
                <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {updateSchedule(schedule)}}
                >
                    Update Schedule
                </Button>
           </Box>
        </Box>
        {
            schedule.length > 0 &&
                <TableContainer component={Paper} sx = {{my:5}}>
                    <Table sx={{maxWidth:'fix-content', maxHeight:'fit-content'}} aria-label="schedule table">
                        <TableHead>
                            <TableRow>
                                {
                                    ScheduleTableAttributes.map((attr, idx) =>
                                        <TableCell  key={idx}
                                                    align={attr.align}
                                                    bgcolor={colorAlternator(idx)}>
                                                    {attr.title}
                                        </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                schedule.map((schedule, idx) => (
                                    <TRow
                                        swapColors={swapColors} 
                                        routeObject={schedule} 
                                        val={idx}
                                    />
                                ))
                            }

                            

                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}