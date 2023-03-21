import AsyncStorage from '@react-native-async-storage/async-storage'

export const clearKeyAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
    console.log(`La key ${key} fue eliminada exitosamente de AsyncStorage.`)
  } catch (error) {
    console.error(error)
  }
}

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}
