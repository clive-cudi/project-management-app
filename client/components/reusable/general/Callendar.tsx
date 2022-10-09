import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Callendar_Props extends CalendarProps {}

export const Callendar = ({...props}: CalendarProps) => {
    return(
        <Calendar {...props} />
    )
}