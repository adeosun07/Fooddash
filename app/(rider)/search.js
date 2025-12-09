import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../tabStyles/_searchStyles";

function Search() {
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState([]);

  const handleSearch = (keyword = q) => {
    const term = keyword.trim();
    if (!term) return;

    setRecent((prev) => [term, ...prev.filter((item) => item !== term)].slice(0, 3));
    setQ(""); // Clear input after search
    Keyboard.dismiss(); // Hide keyboard
    console.log("Searching for:", term); // Your search logic here
  };

  const handleRecentPress = (word) => {
    setQ(word);
    handleSearch(word);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView edges={["top"]} style={styles.container}>
        <Text style={styles.header}>Search</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={"#989898"} />
          <TextInput
            style={styles.searchBox}
            placeholder="Fooddash"
            value={q}
            onChangeText={(text) => setQ(text)}
            onSubmitEditing={() => handleSearch()}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={() => setQ("")}>
            <Ionicons name="close-circle" size={20} color={"#989898"} />
          </TouchableOpacity>
        </View>

        {recent.length > 0 && <Text style={styles.keyword}>Recent Keywords</Text>}

        <View style={styles.recentContainer}>
          {recent.map((word, index) => (
            <TouchableOpacity key={index} onPress={() => handleRecentPress(word)}>
              <Text style={styles.recentWord}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default Search;
