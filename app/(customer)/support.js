import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import styles from "../tabStyles/_supportStyles";

function Profile(props) {
  const profileBg = require("../assets/Wave.png");

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <ImageBackground
        source={profileBg}
        resizeMode='cover'
        style={styles.profileBg}
      >
       <Text style={styles.supportTxt}>Hi there,</Text>
       <Text style={styles.supportTxt}>What can we help with?</Text>
       <View style={styles.actions}>
        <TouchableOpacity style={styles.toChat}>
          <Text style={styles.toChatTxt}>Start Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toMessage}>
          <Text style={styles.toMessageTxt}>Send a message</Text>
        </TouchableOpacity>
       </View>
      </ImageBackground>
      <View style={styles.history}>
      <Text style={styles.historyHeader}>Complaints History</Text></View>
    </SafeAreaView>
  );
}

export default Profile;
