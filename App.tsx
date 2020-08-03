import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import InputButton from './inputNumberBtn';

// Props
interface AppProps {}

const buttons = [
  ['CLEAR', 'DEL'],
  ['7', '8', '9', '/'],
  ['4', '5', '6', 'x'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
];

interface cal {
  displayValue?: string;
  operator?: any;
  firstInput?: string;
  secondInput?: string;
  nextInput?: boolean;
}

// App Component
export default ({}: AppProps) => {
  const [state, setState] = useState<cal>({
    displayValue: '0',
    operator: null,
    firstInput: '',
    secondInput: '',
    nextInput: false,
  });

  const renderButton = () => {
    let layouts = buttons.map((btnRow, index) => {
      let rowItem = btnRow.map((btnItem, btnIndex) => {
        return (
          <InputButton
            key={'btn-' + btnIndex}
            value={btnItem}
            onHandleEvent={(value) => handleInput(value)}
          />
        );
      });
      return (
        <View style={styles.inputRow} key={'row-' + index}>
          {rowItem}
        </View>
      );
    });
    return layouts;
  };

  const handleInput = (input: string) => {
    const {displayValue, operator, firstInput, secondInput, nextInput} = state;

    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (!nextInput) {
          setState({
            ...state,
            displayValue: displayValue === '0' ? input : displayValue + input,
            firstInput: firstInput + input,
          });
        } else {
          setState({
            ...state,
            displayValue: displayValue === '0' ? input : displayValue + input,
            secondInput: secondInput + input,
          });
        }
        break;

      case '+':
      case '-':
      case 'x':
      case '/':
        if (secondInput == '') {
          setState({
            ...state,
            nextInput: true,
            operator: input,
            displayValue:
              (operator !== null
                ? displayValue?.substr(0, displayValue.length - 1)
                : displayValue) + input,
          });
        }
        break;

      case '.':
        let dot = displayValue?.toString().slice(-1);

        if (nextInput) {
          setState({
            ...state,
            displayValue: dot !== '.' ? displayValue + input : displayValue,
            secondInput: secondInput + '.',
          });
        } else {
          setState({
            ...state,
            displayValue: dot !== '.' ? displayValue + input : displayValue,
            firstInput: firstInput + '.',
          });
        }
        break;

      case '=':
        let formatOperator = operator == 'x' ? '*' : operator;
        try {
          let result: number = eval(firstInput + formatOperator + secondInput);
       
        setState({
          ...state,
          displayValue:
            result % 1 === 0 ? result.toString() : result.toFixed(2).toString(),
          firstInput:
            result % 1 === 0 ? result.toString() : result.toFixed(2).toString(),
          secondInput: '',
          operator: null,
          nextInput: false,
        });
      } catch (e) {}
        break;

      case 'CLEAR':
        setState({
          ...state,
          displayValue: '0',
          firstInput: '',
          operator: null,
        });
        break;

      case 'DEL':
        let string = displayValue?.toString();
        let deletedString = string?.substr(0, string.length - 1);
        let length = string?.length;
        setState({
          ...state,
          displayValue: length == 1 ? '0' : deletedString,
          firstInput: length == 1 ? '' : deletedString,
        });
        break;
    }
    console.log(
      'sads' +
        `${state.displayValue}----${operator}----${firstInput}----${secondInput}----${nextInput}`,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{state.displayValue}</Text>
      </View>
      <View style={styles.inputConatainer}>{renderButton()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  resultContainer: {
    flex: 2,
    backgroundColor: '#1E1240',
    justifyContent: 'center',
  },
  inputConatainer: {
    flex: 8,
    backgroundColor: '#3D0075',
  },
  resultText: {
    fontSize: 80,
    textAlign: 'right',
    color: 'white',
    padding: 20,
    fontWeight: 'bold',
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
  },
});
