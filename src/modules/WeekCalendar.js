import React from "react";
import moment from "moment";
import { Button, Card, Container } from "react-bootstrap";
import { useTerm } from "../OdevFetch";

const WeekCalendar = ({ events, week }) => {
  const { reserve } = useTerm({ isLazy: true });
  const urlParams = new URLSearchParams(window.location.search);
  const userUuid = urlParams.get("user_uuid");

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

  // create an array of moment objects for the current week
  for (let i = 3; i <= 9; i++) {
    weekDates.push(moment(week.first_week_date).weekday(i));
  }

  // create an object with events grouped by date
  const eventsByDate = {};
  const sortedEvents = sortEventsByTime(events);

  sortedEvents.forEach((event) => {
    const date = moment(event.date);
    const dateStr = date.format("YYYY-MM-DD");
    if (!eventsByDate[dateStr]) {
      eventsByDate[dateStr] = [];
    }
    eventsByDate[dateStr].push(event);
  });

  return (
    <Container>
      <Card>
        <Card.Header>
          <h5 className="mb-0">
            Modułowy tydzień <br />
            {week.first_week_date} - {week.last_week_date}
          </h5>
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-wrap justify-content-center">
            {weekdays.map((weekday) => (
              <div
                key={weekday}
                className="d-flex flex-column align-items-center m-3"
              >
                <h6>{weekdaysTranslation[weekday]}</h6>
                {weekDates.map((date) => {
                  if (date.format("ddd") === weekday) {
                    const dateStr = date.format("YYYY-MM-DD");
                    const eventsForDate = eventsByDate[dateStr] || [];
                    return (
                      <React.Fragment key={dateStr}>
                        <h6>{date.format("D")}</h6>
                        {eventsForDate.map((event) => (
                          <Button
                            key={event.id}
                            variant="primary"
                            className="my-2"
                            onClick={() => {
                              reserve({
                                user_uuid: userUuid,
                                id: event.id,
                              });
                            }}
                          >
                            {moment(event.time, "HH:mm").format("HH:mm")}
                          </Button>
                        ))}
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
      <br />
    </Container>
  );
};

export default WeekCalendar;
