import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useTerm } from "../OdevFetch";
import { getUserUuidFromLink } from "../helpers";
import moment from "moment";

const TermInterface = () => {
  const { leave, checkReservation } = useTerm();

  const [currentReservation, setCurrentReservation] = useState({
    isReservation: false,
    id: "",
    time: "",
    date: "",
  });

  const checkStatus = async () => {
    const user_uuid = getUserUuidFromLink();
    const result = await checkReservation({
      user_uuid,
    });

    if (result.results.length) {
      setCurrentReservation({
        isReservation: true,
        ...result.results[0],
      });
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div>
      {currentReservation.isReservation ? (
        <>
          Ustawiony termin spotkania:{" "}
          <b>
            {moment(currentReservation.date, "yyyy-MM-DD").format("DD-MM-yyyy")}{" "}
            {moment(currentReservation.time, "HH:mm:ss").format("HH:mm")}
          </b>
          <br />
          <br />
          <ButtonGroup>
            <Button
              variant="danger"
              onClick={() => {
                leave({
                  user_uuid: getUserUuidFromLink(),
                  id: currentReservation.id,
                });
              }}
            >
              Anuluj spotkanie
            </Button>
          </ButtonGroup>
          <br />
        </>
      ) : (
        <h5>Obecnie nie masz umówionej rozmowy</h5>
      )}

      <br />
    </div>
  );
};

export default TermInterface;
