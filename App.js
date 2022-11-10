import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';

const API_KEY = "3ed1e32cf1127f379b54fe8965dfd4e3";

export default function App() {
  
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);
  
  async function fetchWeatherData(cityName) {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    try {
      const response = await fetch(API);
      if(response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
      } 
      else {
        setWeatherData(null);
      }
      setLoaded(true);

    } 
    catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeatherData('mumbai');
    console.log(weatherData);
  }, []) 

  if(!loaded) {
    return(
      <View style={styles.container}>
        <ActivityIndicator color='grey' size={36} />
      </View>
    )
  }

  else if(weatherData === null) {
    return (
      <View style={styles.container}>
        <SearchBar fetchWeatherData={fetchWeatherData}/>
        <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 28
  }
});
