// _supportStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileBg: {
    height: 250,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  supportTxt: {
    fontFamily: "Poppins_500Medium",
    fontSize: 21,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  toChat: {
    backgroundColor: "#1E88E5",
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  toMessage: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  toChatTxt: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#ffffff",
  },
  toMessageTxt: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#429EEE",
  },
  history: {
    paddingHorizontal: 16,
    paddingTop: 5
  },
  historyHeader: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16 
  }
});
