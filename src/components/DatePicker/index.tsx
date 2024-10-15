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
    <div className="flex flex-row gap-4 h-auto">
      <div className="flex h-[40px] flex-col">
        <label>Date from</label>
        <DatePicker
          className="text-[#333]"
          selected={startDate}
          onChange={(date) => onChangeStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      {
        multiple ? (
          <div className="flex flex-col">
            <label>Date to</label>
            <DatePicker
              className="text-[#333]"
              selected={endDate}
              onChange={(date) => onChangeEndDate && onChangeEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
        ) : null
      }
    </div>
  );
};

export default Datepicker;
