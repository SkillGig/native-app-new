import React from "react";
import { View ,Text, Alert} from "react-native";
import { CalendarPicker } from "../../components";

const StreakCalender = (props) => {

  const data = [
    { id: 1, date: '2025-05-20', value: true },
    { id: 2, date: '2025-05-21', value: true },
    { id: 3, date: '2025-05-22', value: false },
    { id: 4, date: '2025-05-23', value: false },
    { id: 5, date: '2025-05-24', value: true },
  ];
  
  return <View style={{flex:1,backgroundColor:"rgba(176, 149, 227, 0.16)"}}>
   <CalendarPicker dateData={data} />
  </View>
};

export default StreakCalender;
