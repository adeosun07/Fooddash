import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import styles from "../tabStyles/_profileStyles";
import { Ionicons } from '@expo/vector-icons';


function Profile(props) {
  const profileBg = require("../../assets/Wave.png");

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <ImageBackground
        source={profileBg}
        resizeMode='cover'
        style={styles.profileBg}
      >
        <View style={styles.profile}>
          <Image source={require("../../assets/profilePicture.png")} style={styles.userImg}/>
          <View>
            <Text style={styles.user}>Tori</Text>
            <Text style={styles.userId}>ID: 0001</Text>
          </View>
        </View>
        <Image source={require("../../assets/edits.png")} />
      </ImageBackground>
      <View style={styles.itemList}>
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.itemTitle}>
            <Ionicons name='person-circle-outline' color={"#429EEE"} size={24}/>
            <View>
              <Text style={styles.title}>My Account</Text>
              <Text style={styles.info}>Your personal details</Text>
            </View>
          </View>
          <Ionicons name='chevron-forward-outline' size={24}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.itemTitle}>
            <Ionicons name='settings-outline' color={"#000"} size={24}/>
            <View>
              <Text style={styles.title}>App Settings</Text>
              <Text style={styles.info}>Customize your app experience</Text>
            </View>
          </View>
          <Ionicons name='chevron-forward-outline' size={24}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.itemTitle}>
            <Ionicons name='help-circle-outline' color={"#EF5350"} size={24}/>
            <View>
              <Text style={styles.title}>Support</Text>
              <Text style={styles.info}>Get help or send feedback</Text>
            </View>
          </View>
          <Ionicons name='chevron-forward-outline'  size={24}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.itemTitle}>
            <Ionicons name='document-outline' color={"#429EEE"} size={24}/>
            <View>
              <Text style={styles.title}>Legal</Text>
              <Text style={styles.info}>Read on our policies, licenses and T's & C's</Text>
            </View>
          </View>
          <Ionicons name='chevron-forward-outline'  size={24}/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.logOut}>Log out</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}

export default Profile;
