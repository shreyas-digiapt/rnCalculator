import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent, TextInput} from 'react-native';

// Props
interface InputNumberBtnProps {
  value: string,
  onHandleEvent: ((text: string) => void)
}

// InoutNumberBtn Component
export default ({value, onHandleEvent}: InputNumberBtnProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onHandleEvent(value)}>
      <Text style={styles.btnText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  btnText: {
    color: 'white',
    fontSize: 24,
  },
});
