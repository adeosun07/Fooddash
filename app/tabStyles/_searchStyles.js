import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
    header: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    marginBottom: 10,
    marginHorizontal: "auto",
  },
  searchContainer:{
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#EFEFEF",
    gap: 10,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  searchBox:{
    flex: 1,
    paddingVertical: 5,
    paddingLeft: 10
  },
  keyword:{
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    marginTop: 10
  },
  recentContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  },
  recentWord:{
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#989898",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
