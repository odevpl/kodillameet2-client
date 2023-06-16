import WeekCalendar from "./WeekCalendar";
import moment from "moment";
import { useWeeks, useUsers } from "../OdevFetch";
import AdminWeekCalendar from "./AdminWeekCalendar";

const FullCalendar = ({ events, isAdmin }) => {
  const { payload, loading } = useWeeks();
  const { payload: getUsers } = useUsers();
  const users = getUsers ? getUsers.data.results : [];


  if (loading) return <div>Loading</div>;

  const weekNumber = [
    ...new Set(events.map((event) => moment(event.date).isoWeek())),
  ];

  function filterEventsByWeek(events, weekNumber) {
    const wednesday = moment().week(weekNumber).weekday(2).format("YYYY-MM-DD");
    const nextTuesday = moment()
      .week(weekNumber + 1)
      .weekday(2)
      .subtract(1, "day")
      .format("YYYY-MM-DD");

    return events.filter((event) => {
      return moment(event.date).isBetween(wednesday, nextTuesday, null, "[]");
    });
  }

  if (isAdmin) {
    return payload.data.results.map((week) => {
      return <AdminWeekCalendar events={events} week={week} users={users}/>;
    });
  }

  return (
    <>
      {payload.data.results.map((week) => {
        return <WeekCalendar events={events} week={week} />;
      })}
    </>
  );
};

export default FullCalendar;
