import React from 'react'
import { View } from 'react-native'
import { TextInput, HelperText, Button, Snackbar } from 'react-native-paper'

function TodoDetail({route, navigate}) {
  const todo = route.params.todo
  return (
    <View>
      <TextInput 
        label="Title"
        mode="flat"
        value={todo.title}
      />
      <TextInput 
        label="Description"
        mode="flat"
        multiline
        value={todo.description}
      />
      <TextInput 
        label="Date"
        mode="flat"
        value={todo.date.toLocaleString('en-IN')}
      />
    </View>
  )
}

export default TodoDetail