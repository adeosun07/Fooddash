import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 16
    },
    image: {
        width: 310,
        height: 350,
        resizeMode: "cover",
        alignSelf: "center"
    },
    allowContainer: {
    backgroundColor: "#1E88E5",
    marginTop: 30,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10
    },
    allowText: {
        fontFamily: "Poppins_700Bold",
        fontSize: 21,
        color: "#fff"
    },
    texts: {
        fontFamily:"Poppins_400Regular",
        fontSize: 16,
        color: "#6E96A2"
    },
})