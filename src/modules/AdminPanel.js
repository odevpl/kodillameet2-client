import React, { useEffect, useState } from "react";
import FullCalendar from "./FullCalendar";
import { useInformation, useReserved } from "../OdevFetch";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import PopupModule from "./PopupModule";
import AddTrainieeForm from "./AddTraineeForm";
import { BsFillCalendarPlusFill } from 'react-icons/bs';
import { useWeeks } from "../OdevFetch";
import TermInterface from "./TermInterface";

const AdminPanel = () => {
  const { payload, loading } = useReserved();
  const { save } = useWeeks();
  const reserved = payload && payload.data.results;

  const {
    payload: infoPayload,
    loading: infoLoading,
    save: saveInformation,
  } = useInformation();

  const [infoValue, setInfoValue] = useState(infoPayload?.data?.text);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const weeksHandler = (e) => {
    e.preventDefault();
    save();
    window.location.reload();
  };

  useEffect(() => {
    if (infoLoading === false) {
      setInfoValue(infoPayload?.data?.text || "");
    }
  }, [infoLoading]);

  if (infoLoading) return <div>Loading</div>;

  return (
    <div>
      <PopupModule isShow={show} handleClose={handleClose}>
       <AddTrainieeForm close={handleClose}/>
      </PopupModule>
      <br />
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>Panel informacyjny</Card.Header>
              <Card.Body>
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  value={infoValue}
                  onChange={(event) => {
                    setInfoValue(event.target.value);
                  }}
                />
                <br />
                <Button
                  onClick={() => {
                    saveInformation({ body: { text: infoValue } });
                  }}
                  variant="primary"
                >
                  Zapisz
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>Interfejs</Card.Header>
              <Card.Body>
                <Button onClick={() => setShow(true)} className="mb-3">Dodaj kursanta</Button>
                <br/>
                <Button onClick={(e) => weeksHandler(e)}><BsFillCalendarPlusFill/></Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <FullCalendar events={reserved} isAdmin={true} />
        </Row>
      </Container>
    </div>
  );
};

export default AdminPanel;
