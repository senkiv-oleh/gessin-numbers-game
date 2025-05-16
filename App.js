import { useState } from 'react'
import { Text, StyleSheet, ImageBackground, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'
import AppLoading
 from 'expo-app-loading'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

import Colors from './constants/colors'

export default function App () {
  const [userNumber, setUserNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  const pickedNUmberHandler = pickedNumber => {
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  let screen = <StartGameScreen onPickedNumber={pickedNUmberHandler} />

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true)
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler() {
    setUserNumber(null)
    setGuessRounds(0)

  }

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    )
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler}/>
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require('./assets/images/image.png')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  }
})
