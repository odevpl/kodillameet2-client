import React, { useState, useEffect } from "react";
import moment from "moment";
import { Card, Container } from "react-bootstrap";
import { useTerm, useUsers, useFree } from "../../OdevFetch";
import { getUserUuidFromLink } from "../../helpers";
import { sortEventsByTime, weekdaysTranslation, getUserProperty, weekdays } from "./helpers";
import HourButton from "./modules/HourButton";

const AdminWeekCalendar = ({ events, week }) => {
  const { reserve } = useTerm({ isLazy: true });
  const { payload: usersPayload, loading: userLoading } = useUsers();
  const { 
    payload: freePayload, 
    loading: freeLoading,
    refetch
   } = useFree();

  const [currentTerms, setCurrentTerms] = useState([]);
  const [freeSlotsTerms, setFreeSlotsTerms] = useState([]);
  const [termsToRemoves, setTermsToRemoves] = useState([]);
  const [termsToAdd, setTermsToAdd] = useState([]);

  useEffect(() => {
    if(!userLoading && !freeLoading) {
      setFreeSlotsTerms(getFreeSlotsDefaultState());
      setCurrentTerms(getDefaultState());
    }
  }, [userLoading, freePayload]);

  if(userLoading || freeLoading) return <>LOADING...</>;

  const users = usersPayload?.data?.results;
  const freeTerms = freePayload?.data?.results

  const getFreeSlotsDefaultState = () => freeTerms
  .filter((event) =>
    moment(event.date).isBetween(
      week.first_week_date,
      week.last_week_date,
      null,
      "[]"
    )
  )
  .map((event) => ({
    date: event.date,
    id: event.id,
    type: 3,
    time: moment(event.time, "HH:mm:ss").format("HH:mm"),
  })); 

  const getDefaultState = () => events
    .filter((event) =>
      moment(event.date).isBetween(
        week.first_week_date,
        week.last_week_date,
        null,
        "[]"
      )
    )
    .map((event) => ({
      date: event.date,
      id: event.id,
      uuid: event.user_uuid,
      name: getUserProperty(users, event, 'name'),
      type: getUserProperty(users, event, 'type'),
      time: moment(event.time, "HH:mm:ss").format("HH:mm"),
    })); 


  const userUuid = getUserUuidFromLink();

  const weekDates = [];

  const hours = [...Array(16).keys()].map((i) => 7 + i);
  const minutes = ["00", "45"];

  const getHourButtons = (weekday, index) => {
    return hours.flatMap((hour) =>
      minutes.map((minute) => (
        <HourButton {...{weekday, index, hour, minute, week, currentTerms, freeSlotsTerms, refetch}} key={hour + minute}/>
      ))
    );
  };

  return (
    <Container>
      <Card>
        <Card.Header>
          <h5 className="mb-0">
            Modułowy tydzień
            <br />
            {week.first_week_date} - {week.last_week_date}
          </h5>
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-wrap justify-content-center">
            {weekdays.map((weekday, index) => (
              <div
                key={weekday}
                className="d-flex flex-column align-items-center"
              >
                <h6>{weekdaysTranslation[weekday]}</h6>
                {getHourButtons(weekday, index)}
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
      <br />
    </Container>
  );
};

export default AdminWeekCalendar;
