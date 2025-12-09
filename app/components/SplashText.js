import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashText() {
  return (
    <MaskedView
      maskElement={
        <Text
          style={{
            fontSize: 40,
            fontFamily: "Poppins_500Medium",
            textAlign: "center",
            backgroundColor: "transparent",
          }}
        >
          FoodDash
        </Text>
      }
    >
      <LinearGradient
        colors={["#429EEE", "#FF7043"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: 50,   // match or slightly larger than fontSize
          width: 200,   // big enough to cover text width
        }}
      />
    </MaskedView>
  );
}
