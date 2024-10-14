import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IDatepickerProps {
  startDate: Date;
  endDate?: Date;
  onChangeStartDate: Function;
  onChangeEndDate?: Function;
  multiple?: boolean;
}

const Datepicker = ({ startDate, endDate, onChangeStartDate, onChangeEndDate, multiple = false }: IDatepickerProps) => {
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => onChangeStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      {
        multiple ? (
          <DatePicker
            selected={endDate}
            onChange={(date) => onChangeEndDate && onChangeEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        ) : null
      }
    </>
  );
};

export default Datepicker;
