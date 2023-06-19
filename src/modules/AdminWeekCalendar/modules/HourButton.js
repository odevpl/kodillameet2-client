import { Button } from 'react-bootstrap';
import moment from 'moment';

const HourButton = ({weekday, index, hour, minute, week, currentTerms}) => {

  const onHourButtonClick = ({ weekday, index, hour, minute }) => {
    // Sun 4 7 00
    console.log({ currentTerms });
    console.log(weekday, index, hour, minute);
  };

  const getTermByTimeAndIndex = ({ hour, minute, index }) => {
    const date = moment(week.first_week_date, "yyyy-MM-DD")
      .add(index, "day")
      .format("yyyy-MM-DD");

    const time = `${hour}:${minute}`;

    const findedTerm = currentTerms.find(
      (event) => event.date == date && event.time == time
    );

    return findedTerm;
  };

  const getButtonClass = (time) => {
    const findedTerm = getTermByTimeAndIndex(time);
   
    const CLASSES_NAMES = {
      1: 'button-js',
      2: 'button-python'
    };

    return CLASSES_NAMES?.[findedTerm?.type] || '';
  };

  const getTraineeName = (time) => {
    const findedTerm = getTermByTimeAndIndex(time);
    return findedTerm?.name || '';
  };


  return (
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
      }) || `${hour}:${minute}`}
    </Button>
  )
};

export default HourButton;