import Timecard from "../components/menu_one_timecard/Timecard";
import Schedule from "../components/menu_two_schedule/Schedule";
import Message from "../components/menu_three_messages/Messages";
import ScheduleBuilder from "../components/menu_four_Schedule_Builder/ScheduleBuilder";
import TimecardApproval from "../components/menu_five_Timecard_Approval/TimecardApproval";
import UpdateHours from "../components/menu_six_Update_Hours/UpdateHours";

const presentationComponentsEmployee = (userID, user) => {
    return [
        {
            title: 'Time Card',
            component: <Timecard
                    employeeID = {userID}/>
        },
        {
            title: 'Work Schedule',
            component: <Schedule
                    employeeID = {userID}/>
        },
        {
            title: 'Messages',
            component: <Message
                    employeeID = {userID}
                    employeeName = {user}/>
        },
    ];
};

const presentationComponentsManager = (userID, user) => {
    return [
        {
            title: 'Schedule Builder',
            component: <ScheduleBuilder/>
        },
        {
            title: 'Time card approval',
            component: <TimecardApproval
                    employeeID = {userID}
                    employeeName = {user}/>
        },
        {
            title: 'Update Hours',
            component: <UpdateHours
                employeeID = {userID}/>
        },
    ];
};

//This is a placeholder incase we need to make a dropdown into a menu
const containerComponents = (props) => {
    return [
        {
            title: 'Activities',
            component: <Timecard />
        }
    ];
};

export {presentationComponentsEmployee, presentationComponentsManager, containerComponents};
