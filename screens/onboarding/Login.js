import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Login = () => {
  console.log('loginnnnnn')
  return (
    // <View>
    //   <Text style={{color: 'black'}}>Let’s Go 🚀 </Text>
    //   <Text style={{color: 'black'}}>ertyuio</Text>
    // </View>


<LinearGradient
colors={['#FBF8FF','#DFCEFF']}
style={{flex: 1, // Full screen
justifyContent: 'center',
alignItems: 'center',}}
>
<Text style={{fontSize: 24,
    color: '#333',}}>Hello Gradient!</Text>
</LinearGradient>
  );
};

export default Login;
