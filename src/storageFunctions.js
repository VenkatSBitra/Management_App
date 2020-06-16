import AsyncStorage from '@react-native-community/async-storage';

const getTodo = async () => {
  let value
  try {
    value = await AsyncStorage.getItem('todos')
  } catch (err) {
    console.log("GET Failed!!!")
    return null
  }
  console.log("OK")
  if (value !== null) {
    const res = await JSON.parse(value)
    return res
  } else {
    return null
  }
}

const saveTodo = async (value) => {
  let todos
  try {
    todos = await getTodo()
  } catch (err) {
    console.log("SET Failed!!!")
  }
  console.log("OK")
  try {
    if (todos !== null) {
      await AsyncStorage.setItem('todos', JSON.stringify([...todos, value]))
    } else {
      await AsyncStorage.setItem('todos', JSON.stringify([value]))
    }
    console.log("Save Successful")
  } catch (err) {
    console.log(err)
  }
}

export {getTodo, saveTodo}