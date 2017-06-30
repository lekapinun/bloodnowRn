import React from 'react';
import { DatePickerIOS } from 'react-native';

const DateModal = ({selectDate,onChangeDate}) => {
  return(
    <DatePickerIOS
      date={selectDate}
      mode="date"
      onDateChange={onChangeDate}
      maximumDate = {new Date()}
    />
  );
}

export { DateModal };