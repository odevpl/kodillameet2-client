import React, { useState } from "react";
import moment from "moment";
import { Button, Card, Container } from "react-bootstrap";
import { useTerm, useUsers } from "../OdevFetch";
import { getUserUuidFromLink } from "../helpers";


const AdminWeekCalendar = ({ events, week, users }) => {
  const { reserve } = useTerm({ isLazy: true });

  const showUsernamesByUuid = (userObject, users) => {
    const foundUser =  users.find(user => user.uuid === userObject.user_uuid);
    const userName = foundUser.name;
    return userName;
  };

  const showTypesByUuid = (userObject, users) => {
    const foundType = users.find(user => user.uuid === userObject.user_uuid);
    const type = foundType.type;
    return type;
  };

  const defaultState = events
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
      name: showUsernamesByUuid(event, users),
      type: showTypesByUuid(event, users),
      time: moment(event.time, "HH:mm:ss").format("HH:mm"),
    }));

  const [currentTerms, setCurrentTerms] = useState(defaultState);
  const [termsToRemoves, setTermsToRemoves] = useState([]);
  const [termsToAdd, setTermsToAdd] = useState([]);

  const userUuid = getUserUuidFromLink();

  const sortEventsByTime = (events) => {
    return events.sort((a, b) => {
      if (a.time < b.time) {
        return -1;
      }
      if (a.time > b.time) {
        return 1;
      }
      return 0;
    });
  };

  const weekdaysTranslation = {
    Wed: "Środa",
    Thu: "Czwartek",
    Fri: "Piątek",
    Sat: "Sobota",
    Sun: "Niedziela",
    Mon: "Poniedziałek",
    Tue: "Wtorek",
  };

  const weekdays = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  const weekDates = [];

  const hours = [...Array(16).keys()].map((i) => 7 + i);
  const minutes = ["00", "45"];

  const onHourButtonClick = ({ weekday, index, hour, minute }) => {
    // Sun 4 7 00
    console.log({ currentTerms });
    console.log(weekday, index, hour, minute);
  };

  const getButtonClass = ({ hour, minute, index }) => {
    const date = moment(week.first_week_date, "yyyy-MM-DD")
      .add(index, "day")
      .format("yyyy-MM-DD");

    const time = `${hour}:${minute}`;

    const findedTerm = currentTerms.find(
      (event) => event.date == date && event.time == time
    );
   
    const CLASSES_NAMES = {
      1: 'button-js',
      2: 'button-python'
    }

    return CLASSES_NAMES?.[findedTerm?.type] || '';
  };

  const getTraineeName = ({hour, minute, index}) => {
    const date = moment(week.first_week_date, "yyyy-MM-DD")
      .add(index, "day")
      .format("yyyy-MM-DD");

    const time = `${hour}:${minute}`;

    const term = currentTerms.find(
      (event) => event.date == date && event.time == time
    );

    return term?.name || '';
  }


  const hourButtons = (weekday, index) => {
    return hours.flatMap((hour) =>
      minutes.map((minute) => (
        <Button
          className={`time-btn ${getButtonClass({
            hour,
            minute,
            index,
          })}`}
          key={`${hour}:${minute}`}
          variant="secondary"
          onClick={() => {
            onHourButtonClick({ weekday, index, hour, minute });
          }}
        >{getTraineeName({
          hour,
          minute,
          index,
        }) || `${hour}:${minute}`}</Button>
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
                {hourButtons(weekday, index)}
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
