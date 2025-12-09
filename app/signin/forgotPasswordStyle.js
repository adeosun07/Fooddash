import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  image: {
    marginTop: 10,
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 38,
    marginTop: 30,
    textAlign: "center",
  },
  paragraph: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#3E5660",
    textAlign: "center",
    marginTop: 10,
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  input: {
    width: 62,
    height: 62,
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    borderRadius: 10,
    color: "#476673"
  },
  noCode: {
    fontFamily: "poppins_400Regular",
    fontSize: 12,
    marginVertical: 20,
  },
  button:{
    backgroundColor: "#1E88E5",
    height: 56,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
    justifyContent: "center",
  },
  authText:{
    fontFamily: "Poppins_700Bold",
    fontSize: 21,
    color: "#F3F8F8",
  },
});
