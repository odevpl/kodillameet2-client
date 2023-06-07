import React, { useEffect, useState } from "react";
import FullCalendar from "./FullCalendar";
import { useFree, useInformation } from "../OdevFetch";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import TermInterface from "./TermInterface";

const AdminPanel = () => {
  const { payload, loading } = useFree();
  const {
    payload: infoPayload,
    loading: infoLoading,
    save: saveInformation,
  } = useInformation();

  const [infoValue, setInfoValue] = useState(infoPayload?.data?.text);

  useEffect(() => {
    if (infoLoading === false) {
      setInfoValue(infoPayload?.data?.text || "");
    }
  }, [infoLoading]);

  if (infoLoading) return <div>Loading</div>;

  return (
    <div>
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
              <Card.Header>Interfejs terminu</Card.Header>
              <br />
              ...inprogress
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
