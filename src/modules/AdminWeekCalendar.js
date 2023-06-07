import React, { useState } from "react";
import moment from "moment";
import { Button, Card, Container } from "react-bootstrap";
import { useTerm } from "../OdevFetch";
import { getUserUuidFromLink } from "../helpers";

const AdminWeekCalendar = ({ events, week }) => {
  const { reserve } = useTerm({ isLazy: true });

  const moment = require("moment");

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

    let newClassName = "";
    const time = `${hour}:${minute}`;

    const isSelected = currentTerms.some(
      (event) => event.date == date && event.time == time
    );

    if (isSelected) {
      console.log("IsSelected");
      newClassName += " active-button";
    }

    return newClassName;
  };

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
        >{`${hour}:${minute}`}</Button>
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
