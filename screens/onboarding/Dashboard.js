import React, {useContext} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {ThemeContext} from '../../src/context/ThemeContext';
import {darkColors} from '../../src/theme/color';

const Dashboard = () => {
  const {toggleTheme} = useContext(ThemeContext);

  // Use dark theme colors directly
  const backgroundColor = darkColors.background;
  const textColor = darkColors.text;
  const primaryColor = darkColors.primary;

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>Dashboard Screen</Text>

      <View style={styles.switchRow}>
        <Text style={{color: textColor, marginRight: 10}}>Dark Mode:</Text>
        <Switch
          value={true}
          onValueChange={toggleTheme}
          thumbColor={primaryColor}
          trackColor={{false: '#767577', true: '#81b0ff'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Dashboard;
