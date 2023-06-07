import React from "react";
import FullCalendar from "./FullCalendar";
import { useFree, useInformation } from "../OdevFetch";
import { Container, Col, Row, Card } from "react-bootstrap";
import TermInterface from "./TermInterface";

const UserPanel = () => {
  const { payload, loading } = useFree();
  const { payload: infoPayload, loading: infoLoading } = useInformation();

  if (infoLoading) return <div>Loading</div>;

  return (
    <div>
      <br />
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>Panel informacyjny</Card.Header>
              <Card.Body>{infoPayload?.data?.text}</Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>Interfejs terminu</Card.Header>
              <br />
              <TermInterface />
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <FullCalendar events={payload?.data?.results} />
        </Row>
      </Container>
    </div>
  );
};

export default UserPanel;
