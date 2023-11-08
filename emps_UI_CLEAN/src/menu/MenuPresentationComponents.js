import Timecard from "../components/menu_one_timecard/Timecard";
import Schedule from "../components/menu_two_schedule/Schedule";
import Message from "../components/menu_three_messages/Messages";
import ScheduleBuilder from "../components/menu_four_Schedule_Builder/ScheduleBuilder";
import TimecardApproval from "../components/menu_five_Timecard_Approval/TimecardApproval";
import UpdateHours from "../components/menu_six_Update_Hours/UpdateHours";

const presentationComponentsEmployee = (props) => {
    return [
        {
            title: 'Time card',
            component: <Timecard/>
        },
        {
            title: 'Work Schedule',
            component: <Schedule/>
        },
        {
            title: 'Messages',
            component: <Message/>
        },
    ];
};

const presentationComponentsManager = (props) => {
    return [
        {
            title: 'Schedule Builder',
            component: <ScheduleBuilder/>
        },
        {
            title: 'Time card approval',
            component: <TimecardApproval/>
        },
        {
            title: 'Update Hours',
            component: <UpdateHours/>
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