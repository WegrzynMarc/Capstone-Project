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
    var monthName = date.slice(4, 7); //January is 1!
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
        month = 1;
    }
    else if (monthName === "Feb") {
        month = 2;
    }
    else if (monthName === "Mar") {
        month = 3;
    }
    else if (monthName === "Apr") {
        month = 4;
    }
    else if (monthName === "May") {
        month = 5;
    }
    else if (monthName === "Jun") {
        month = 6;
    }
    else if (monthName === "Jul") {
        month = 7;
    }
    else if (monthName === "Aug") {
        month = 8;
    }
    else if (monthName === "Sep") {
        month = 9;
    }
    else if (monthName === "Oct") {
        month = 10;
    }
    else if (monthName === "Nov") {
        month = 11;
    }
    else if (monthName === "Dec") {
        month = 12;
    }

    //Month Math
    if (dateMonday <= 0) 
    {
        month--;
        if (month === 2) 
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
        else if (month === 4 || month === 6 || month === 9 || month === 11) 
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
    else {
        if (month === 2) 
        {
            if (year % 4 === 0) 
            {
                maxDayInMonth = 29;
            }
            else 
            {
                maxDayInMonth = 28;
            }
        }
        else if (month === 4 || month === 6 || month === 9 || month === 11) 
        {
            maxDayInMonth = 30;
        }
        else 
        {
            maxDayInMonth = 31;
        }
    }

    return [dateMonday, month, maxDayInMonth];
}

function weeklyViewAssembler(schedule, date) {
    let value = findMonday(date);
    var currDay = value[0];
    var offset = 0;
    const maxDaysInMonth = value[2];

    console.log(`${maxDaysInMonth} | ${currDay}`)
    let array = [];
    let subArray = [];
    let hours = 0;
    let timeDisplay = "";

    let mondayShift = dailyViewAssembler(schedule, currDay + offset);

    offset++;
    if (currDay + offset > maxDaysInMonth) {
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
        //console.log(`${currDay} | ${day}`);
        if (parseInt(day) === currDay) {
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

function dataParserDropTable(message) {
    let array = []
    for (let i = 1; i < message.length; i++) {
        array.push({
            name: message[i].firstName + ` ` + message[i].lastName,
            employeeID: message[i].employeeID
        })
    }

    console.log(array);
    return array;
}

function colorHelper(value, val2) {
    if (value === 0) {
        if (val2 === 0) {
            return 'f00f00f00';
        }
        else {
            return 'ff0ff0ff0';
        }
    }
    else {
        if (val2 === 0) {
            return '8f3f3f88';
        }
        else {
            return '8f3f0ff80';
        }
    }
}

function ScheduleBox(value, val2, key, swapColors, day, schedule, setSchedule) {
    const [color, setColor] = useState(colorHelper(value, val2));
    return (
        <Fragment>
            <TableCell 
                align="left" 
                bgcolor={color}
                onClick={() => 
                    {
                        swapColors(value, val2, key, day, schedule, setSchedule, setColor);
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

function updateSchedule(schedule, date, employeeID) {
    let value = findMonday(date);
    const maxDaysInMonth = value[2];
    let month = value[1];
    var currDay = value[0];
    let year = parseInt(date.slice(11));
    var offset = 0;

    //Break up schedule into 7 different arrays
    let superArray = [];
    let arrayMon = [];
    let arrayTue = [];
    let arrayWed = [];
    let arrayThu = [];
    let arrayFri = [];
    let arraySat = [];
    let arraySun = [];

    for (let i = 0; i < schedule.length; i++) {
        arrayMon.push(schedule[i].monday);
        arrayTue.push(schedule[i].tuesday);
        arrayWed.push(schedule[i].wednesday);
        arrayThu.push(schedule[i].thursday);
        arrayFri.push(schedule[i].friday);
        arraySat.push(schedule[i].saturday);
        arraySun.push(schedule[i].sunday);
    }
    superArray.push(arrayMon, arrayTue, arrayWed, arrayThu, arrayFri, arraySat, arraySun);

    for (let i = 0; i < 7; i++) {
        //Pass date through to addAndRemoveSchedule
        if ((currDay + offset) < 10) {
            addAndRemoveSchedule(superArray[i], `${year}-${month}-0${currDay + offset}`, employeeID)
        }
        else {
            addAndRemoveSchedule(superArray[i], `${year}-${month}-${currDay + offset}`, employeeID)
        }

        //Prepare next date here
        offset++;
        if ((currDay + offset) > maxDaysInMonth) {
            currDay = 1;
            month++;
            offset = 0;
            if (month > 12) {
                year++;
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//TODO: Perform API updates
function addAndRemoveSchedule(dayArray, day, employeeID) {
    let startTimes = [];
    let endTimes = [];

    //Find the start and end times
    for (let i = 0, recTime = 0; i < dayArray.length; i++) {
        if (dayArray[i] === 1 && recTime === 0) {
            if (i % 2 === 0) {
                startTimes.push(`${i / 2}:00:00`);
            }
            else {
                startTimes.push(`${(i / 2) - 0.5}:30:00`);
            }
            recTime = 1;
            
            //Check if the start and endtime are the same block of time
            if (i + 1 >= dayArray.length && dayArray[i] === 1 && recTime === 1) {
                if (i % 2 === 0) {
                    endTimes.push(`${(i / 2)}:00:00`);
                }
                else {
                    endTimes.push(`${(i / 2) - 0.5}:30:00`);
                }
                recTime = 0;
            }
        }
        else if (dayArray[i] === 0 && recTime === 1) {
            if (i % 2 === 0) {
                endTimes.push(`${(i / 2) - 1}:30:00`);
            }
            else {
                endTimes.push(`${(i / 2) - 0.5}:00:00`);
            }
            recTime = 0;
        }
        else if (i + 1 >= dayArray.length && dayArray[i] === 1 && recTime === 1) {
            if (i % 2 === 0) {
                endTimes.push(`${(i / 2)}:00:00`);
            }
            else {
                endTimes.push(`${(i / 2) - 0.5}:30:00`);
            }
            recTime = 0;
        } 
    }

    //Perform global day delete and then updates per startTime and endTime
    remove(day, employeeID);
    sleep(5000) //Wait for 2 seconds
    for (let i = 0; i < startTimes.length; i++) {
        add(day, employeeID, startTimes[i], endTimes[i])
    }
    
    /*
    console.log(dayArray);
    console.log(day);
    console.log(startTimes);
    console.log(endTimes);
    console.log(employeeID);
    */
}

async function remove(day, employeeID) {
    const api = new API();

    await api.deleteSchedule(day, employeeID);
}

async function add(day, employeeID, startTime, endTime) {
    const api = new API();

    await api.addSchedule(day, employeeID, startTime, day, endTime);
}

function swapColors(val, val2, rowLoc, weekday, schedule, setSchedule, setColor) {

    //Get the column to change
    let row = schedule[rowLoc];
    if (weekday === "Mon") {
        if (val === 0) {
            if (val2 === 0) {
                row.monday = 1;
                setColor('8f3f3f88')
            }
            else {
                row.monday = 1;
                setColor('8f3f0ff80')
            }
        } 
        else {
            if (val2 === 0) {
                row.monday = 0;
                setColor('f00f00f00')
            }
            else {
                row.monday = 0;
                setColor('ff0ff0ff0')
            } 
        } 
    }
    else if (weekday === "Tue") {
        if (val === 0) {
            if (val2 === 0) {
                row.tuesday = 1;
                setColor('8f3f3f88')
            }
            else {
                row.tuesday = 1;
                setColor('8f3f0ff80')
            }
        } 
        else {
            if (val2 === 0) {
                row.tuesday = 0;
                setColor('f00f00f00')
            }
            else {
                row.tuesday = 0;
                setColor('ff0ff0ff0')
            } 
        } 
    }
    else if (weekday === "Wed") {
        if (val === 0) {
            if (val2 === 0) {
                row.wednesday = 1;
                setColor('8f3f3f88')
            }
            else {
                row.wednesday = 1;
                setColor('8f3f0ff80')
            }
        } 
        else {
            if (val2 === 0) {
                row.wednesday = 0;
                setColor('f00f00f00')
            }
            else {
                row.wednesday = 0;
                setColor('ff0ff0ff0')
            } 
        } 
    }
    else if (weekday === "Thu") {
        if (val === 0) {
            if (val2 === 0) {
                row.thursday = 1;
                setColor('8f3f3f88')
            }
            else {
                row.thursday = 1;
                setColor('8f3f0ff80')
            }
        } 
        else {
            if (val2 === 0) {
                row.thursday = 0;
                setColor('f00f00f00')
            }
            else {
                row.thursday = 0;
                setColor('ff0ff0ff0')
            } 
        } 
    }
    else if (weekday === "Fri") {
        if (val === 0) {
            if (val2 === 0) {
                row.friday = 1;
                setColor('8f3f3f88')
            }
            else {
                row.friday = 1;
                setColor('8f3f0ff80')
            }
        } 
        else {
            if (val2 === 0) {
                row.friday = 0;
                setColor('f00f00f00')
            }
            else {
                row.friday = 0;
                setColor('ff0ff0ff0')
            } 
        } 
    }
    else if (weekday === "Sat") {
        if (val === 0) {
            if (val2 === 0) {
                row.saturday = 1;
                setColor('8f3f3f88')
            }
            else {
                row.saturday = 1;
                setColor('8f3f0ff80')
            }
        } 
        else {
            if (val2 === 0) {
                row.saturday = 0;
                setColor('f00f00f00')
            }
            else {
                row.saturday = 0;
                setColor('ff0ff0ff0')
            } 
        } 
    }
    else if (weekday === "Sun") {
        if (val === 0) {
            if (val2 === 0) {
                row.sunday = 1;
                setColor('8f3f3f88')
            }
            else {
                row.sunday = 1;
                setColor('8f3f0ff80')
            }
        } 
        else {
            if (val2 === 0) {
                row.sunday = 0;
                setColor('f00f00f00')
            }
            else {
                row.sunday = 0;
                setColor('ff0ff0ff0')
            } 
        } 
    }

    setSchedule(schedule);

    //console.log(row);
    //console.log(`${val} | Row: ${row} | Day: ${weekday}`);
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
    const [selectedEmployeeID, setSelectedEmployeeID] = useState('000001');  
    const [dropDownTable, setdropDownTable] = useState([]); 

    const createSelectItems = () => {
        let items = [];
        //console.log(dropDownTable.length)
        for (let i = 0; i < dropDownTable.length; i++) {             
             items.push(<option key={i} value={dropDownTable[i].employeeID}>{dropDownTable[i].name}</option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    }  

    const onDropdownSelected = (e) => {
        setSelectedEmployeeID(e.target.value);
        //console.log("THE VAL", receiverID);
        //here you will see the current selected value of the select input
    }

    useEffect(() => {
        const api = new API();

        async function getSchedule() {
                const routesJSONString = await api.schedulesWithEmployeeID(selectedEmployeeID);
                //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
                setSchedule(weeklyViewAssembler(routesJSONString.data, currentDate));
        }

        getSchedule();

        async function getDropDown() {
            const routesJSONStringTwo = await api.allEmployees();
            //console.log(`messages from the DB ${JSON.stringify(routesJSONString)}`);
            setdropDownTable(dataParserDropTable(routesJSONStringTwo.data));
        }
        
        getDropDown();
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

        return (
        <Fragment>
            <TableRow sx={{MaxHeight:'100%', MaxWidth:'100%'}}>
                <TableCell align="left" bgcolor={colorAlternator2(colorVal)} sx={{fontSize: 'large'}}> {routeObject.hours} </TableCell> 
                {
                    ScheduleBox(routeObject.monday, 0, key, swapColors, "Mon", schedule, setSchedule)
                }
                {
                    ScheduleBox(routeObject.tuesday, 1, key, swapColors, "Tue", schedule, setSchedule)
                }
                {
                    ScheduleBox(routeObject.wednesday, 0, key, swapColors, "Wed", schedule, setSchedule)
                }
                {
                    ScheduleBox(routeObject.thursday, 1, key, swapColors, "Thu", schedule, setSchedule)
                }
                {
                    ScheduleBox(routeObject.friday, 0, key, swapColors, "Fri", schedule, setSchedule)
                }
                {
                    ScheduleBox(routeObject.saturday, 1, key, swapColors,"Sat", schedule, setSchedule)
                }
                {
                    ScheduleBox(routeObject.sunday, 0, key, swapColors, "Sun", schedule, setSchedule)
                }
                
            </TableRow>
        </Fragment>
        );
    }

    return <Fragment>

        <Box display="flex" justifyContent="center" mt={2} gap={10}> 
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

           <select onChange={onDropdownSelected}>
                {createSelectItems()}
            </select>
           
           <Box display="flex" justifyContent="left" alignItems="center" width="100%">
                <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {updateSchedule(schedule, currentDate, selectedEmployeeID)}}
                >
                    Update Schedule
                </Button>
           </Box>
        </Box>
        {
            schedule.length > 0 &&
                <TableContainer component={Paper} sx = {{my:5}}>
                    <Table sx={{maxWidth:'fix-content', maxeight:'fit-content'}} aria-label="schedule table" >
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
