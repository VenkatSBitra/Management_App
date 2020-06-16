import React, { useState, useEffect } from 'react';
import { View, Dimensions, ScrollView, FlatList } from 'react-native';
import { Button, Divider, List } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

import { getTodo } from '../storageFunctions'

var tileWidth = Dimensions.get('window').width / 100
var tileHeight = Dimensions.get('window').height / 100

function HomeScreen({ navigation }) {
  let [todos, setTodos] = useState([{title: 'a', description: 'a', date: 'a'}])
  let [visible, setVisible] = useState(false)
  const isFocused = useIsFocused()
  useEffect(() => {
    getTodo()
      .then(response => {
        if(response !== null) setTodos(response)
      })
    return setTodos([])
  }, [isFocused])
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: 3 * tileWidth, marginVertical: 3 * tileHeight }}>
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('AddTodo')} 
      >
        Add TODO
      </Button>
      <Divider />
      <FlatList 
        data={todos}
        keyExtractor={({index}) => index}
        renderItem={({item, index}) => <List.Item 
          key={index}
          title={item.title}
          description={item.date.toLocaleString('en-IN') + "\n" + item.description}
          onPress={() => navigation.navigate('TodoDetail', {todo: item})}
        />}
      />
    </View>
  )
}

export default HomeScreen