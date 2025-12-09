// _supportStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileBg: {
    height: 230,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  profile: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  user: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16
  },
  userId: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16
  },
  userImg:{
    width: 60,
    height: 60,
    borderRadius: "50%",
    borderWidth: 1,
    borderColor: "#1E88E5"
  },
  itemList: {
    flex: 1,
    marginTop: 30,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottom: 1,
    borderBottomWidth: 1,
    paddingBottom: 25,
    marginBottom: 25,
    borderBottomColor: "#3E5660"
  },
  itemTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#292929"
  },
  info: {
    fontFamily: "Poppins_400Regular",
    fontSize: 9,
    color: "#3E5660"
  },
  logOut: {
    color: "#EF5350",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    alignSelf: "center",
    marginBottom: 40,
  },
});
