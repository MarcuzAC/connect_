import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import welcomeImage from '@/assets/images/welcome.png'
const welcome_image = Image.resolveAssetSource(welcomeImage).uri

const Page = () => {
  return (
    <View style={styles.container}>
        <Image source={{ uri: welcome_image}} style = {styles.welcome}/>
      <Text>FIRST PAGE</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    welcome: {
      width: '100%',
      height: 300,
      marginBottom: 80,
    }
})

export default Page