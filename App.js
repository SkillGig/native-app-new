// import React from 'react';
// import Navigation from './Navigation';

// const App = () => {
//   return <Navigation />;
// };

// export default App;


// // import React from "react";
// // import { View,Text } from "react-native";
// // const App = () => {
// //   return <View>
// //    <Text>yuilkjhgc</Text>
// //   </View>
// // };

// // export default App;


import React from 'react';
import Navigation from './Navigation';
import { ThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
