import WeekCalendar from "./WeekCalendar";
import { useWeeks, useReserved } from "../OdevFetch";
import AdminWeekCalendar from "./AdminWeekCalendar";

const FullCalendar = ({ isAdmin, freeSlots }) => {
  const { payload, loading } = useWeeks();
  const { payload: reservedPayload, loading: reservedLoading } = useReserved();

  if (loading && reservedLoading) return <div>Loading</div>;

  const events = reservedPayload?.data?.results || [];

  if (isAdmin) {
    return payload.data.results.map((week, index) => {
      return <AdminWeekCalendar events={events} week={week} key={index} freeSlots={freeSlots}/>;
    });
  }

  return (
    <>
      {payload.data.results.map((week, index) => {
        return <WeekCalendar events={events} week={week} key={index} freeSlots={freeSlots}/>;
      })}
    </>
  );
};

export default FullCalendar;
