import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  settings: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  deliveryTxt: {
    color: "#429EEE",
    fontFamily: "Poppins_500Medium",
    fontSize: 9,
  },
  delivery: {
    flexDirection: "column",
    gap: 2,
  },
  deliveryLocation: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#989898",
  },
  greeting: {
    fontFamily: "Poppins_400Regular",
    marginTop: 7,
  },
  searchBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    alignItems: "center",
    backgroundColor: "#dfdcdcff",
    borderRadius: 10,
    marginTop: 10,
  },
  icons: {
    marginHorizontal: 10,
  },
  search: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
  ad: {
    height: 81,
    backgroundColor: "#FE4011",
    marginTop: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  adBtn: {
    position: "absolute",
    bottom: 5,
    right: 5,
    height: 30,
    width: 100,
    backgroundColor: "#1E88E5",
    textAlign: "center",
    padding: 5,
    color: "#fff",
    borderRadius: 5,
  },
  adTxt: {
    textAlign: "left",
    width: "80%",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#fff",
  },
  restaurants: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 21,
    marginBottom: 3,
  },
  restaurantCard: {
    gap: 3,
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    paddingBottom: 5
  },
  restaurantName: {
    fontFamily: "Poppins_400Regular",
  },
  restaurantStatus: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  restaurantImage: {
    width: "100%",
    height: 97,
    resizeMode: "contain",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(71, 69, 68, 0.15)",
    zIndex: 1,
    borderRadius: 10,
  },
});
