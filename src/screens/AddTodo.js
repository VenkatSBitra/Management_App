import React, { useState } from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { TextInput, HelperText, Button, Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import { saveTodo } from '../storageFunctions'

var tileWidth = Dimensions.get('window').width / 100
var tileHeight = Dimensions.get('window').height / 100

function AddTodo(props) {
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('')
  let [date, setDate] = useState(new Date())
  let [show, setShow] = useState(false)
  let [mode, setMode] = useState('date')

  let [titleTrig, setTitleTrig] = useState(false)
  let [descTrig, setDescTrig] = useState(false)

  let [visible, setVisible] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  }

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  }

  const showDatePicker = () => {
    showMode('date')
  }

  const showTimePicker = () => {
    showMode('time')
  }

  const dateText = date => date.slice(0,3) + "," + date.slice(3, 10) + "," + date.slice(19, 24)

  const onSubmit = () => {
    const new_date = new Date()
    if(title.length < 1 || date.getTime() < new_date.getTime()){
      setTitleTrig(true)
      setDescTrig(true)
      setVisible(true)
    } else {
      saveTodo({title, description, date})
    }
    props.navigation.goBack()
  }

  return (
    <View style={{flex: 1, marginLeft: 5 * tileWidth, marginRight: 5 * tileWidth, marginTop: 2 * tileHeight}}>
      <TextInput 
        label="Title"
        mode="flat"
        placeholder="Enter the TODO"
        value={title}
        onChangeText={text => setTitle(text)}
        onBlur={() => {setTitleTrig(true)}}
      />
      <HelperText type="error" visible={titleTrig && title.length < 1}>
        Please Enter the Title
      </HelperText>
      <TextInput 
        label="Description"
        mode="flat"
        placeholder="Enter TODO Details"
        multiline
        value={description}
        onChangeText={text => setDescription(text)}
        onBlur={() => {setDescTrig(true)}} 
      />
      <HelperText type="info" visible={descTrig && description.length < 1}>
        You have not entered any description.
      </HelperText>
      <HelperText type="info" visible>
        Date:
      </HelperText>
      <Button icon="calendar" mode="outlined" onPress={showDatePicker} >
        {dateText(date.toLocaleString('en-IN'))}
      </Button>
      <HelperText type="info" visible>
        Time:
      </HelperText>
      <Button icon="timer" mode="outlined" onPress={showTimePicker}>
        {date.toLocaleString('en-IN').slice(11, 19)}
      </Button>
      <Button icon="check" mode="contained" onPress={onSubmit}>
        Submit
      </Button>
      {show && (
        <DateTimePicker 
          value={date}
          mode={mode}
          is24Hour
          display="default"
          onChange={onChange}
        />
      )}
      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 0}}>
        <Snackbar
          visible={visible}
          duration={2000}
          onDismiss={() => setVisible(false)}
        >
          The data entered is invalid. Please Check Again.
        </Snackbar>
      </View>
    </View>
  )
}

export default AddTodo