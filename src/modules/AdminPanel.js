import React, { useEffect, useState } from "react";
import FullCalendar from "./FullCalendar";
import { useFree, useInformation } from "../OdevFetch";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import PopupModule from "./PopupModule";
import AddTrainieeForm from "./AddTraineeForm";
import TermInterface from "./TermInterface";

const AdminPanel = () => {
  const { payload, loading } = useFree();
  const {
    payload: infoPayload,
    loading: infoLoading,
    save: saveInformation,
  } = useInformation();

  const [infoValue, setInfoValue] = useState(infoPayload?.data?.text);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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
              <br />
              <Button onClick={() => setShow(true)}>Dodaj kursanta</Button>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <FullCalendar events={payload?.data?.results} isAdmin={true} />
        </Row>
      </Container>
    </div>
  );
};

export default AdminPanel;
