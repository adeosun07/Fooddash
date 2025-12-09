import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  headerContainer: {
    alignSelf: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  normalTxt: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  headerPrice: {
    fontFamily: "Poppins_500Medium",
    fontSize: 21,
  },
  txnContainer: {
    borderWidth: 1,
    borderColor: "#989898",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    gap: 10
  },
  txnHeader: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  smallTxt: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#000000",
  },
  smallTxt2: {
    color: "#989898"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  homeContainer: {
    backgroundColor: "#1E88E5",
    marginTop: 20,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10
  },
  homeTxt: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#ffffff"
  },
});
