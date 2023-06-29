import { Button } from 'react-bootstrap';
import moment from 'moment';
import { useTerm, useFree } from '../../../OdevFetch';

const HourButton = ({weekday, index, hour, minute, week, currentTerms, freeSlotsTerms, refetch}) => {
  const { save, remove } = useTerm({isLazy: true});

  const onHourButtonClick = async ({ index, hour, minute }) => {
    const chosenDate = moment(week.first_week_date).add(index, "days").format("YYYY-MM-DD");
    const chosenHour = `${hour}:${minute}`;

    const activeTerm = freeSlotsTerms.find(event => event.date == chosenDate && event.time == chosenHour);
    if(activeTerm) {
      await remove({id: activeTerm.id});
      refetch();
    } else {    
      const body = {
        date: chosenDate,
        time: chosenHour
      };
      await save({body});
      refetch();
    }

  };

  const getTermByTimeAndIndex = ({ hour, minute, index }) => {
    const date = moment(week.first_week_date, "yyyy-MM-DD")
      .add(index, "day")
      .format("yyyy-MM-DD");

    const time = `${hour}:${minute}`;
    const findedTerm = currentTerms.find(
      (event) => event.date == date && event.time == time
    );

    if(!findedTerm) return freeSlotsTerms.find(event => event.date == date && event.time == time);
    return findedTerm;
  };

  const getButtonClass = (time) => {
    const findedTerm = getTermByTimeAndIndex(time);
   
    const CLASSES_NAMES = {
      1: 'button-js',
      2: 'button-python',
      3: 'active-button'
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
      onClick={(e) => {
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