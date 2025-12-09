import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: {
    width: 310,
    height: 350,
    marginTop: 40,
  },
  indicatorContainer: {
    width: 76,
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 3,
  },
  activeDot: {
    width: 40,
    borderRadius: 5,
    backgroundColor: "#EF5350",
    color: "#1E272E",
  },
  hero: {
    fontSize: 38,
    fontFamily: "Poppins_500Medium",
  },
  description: {
    fontSize: 21,
    fontFamily: "Poppins_400Regular",
    width: 322,
    height: 90,
    lineHeight: 30,
    textAlign: "center",
    color: "#3E5660",
  },
  fixedBottom: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "auto",
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  button: {
    width: 132,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "dodgerblue",
    borderWidth: 1,
  },
  nextButton: {
    backgroundColor: "dodgerblue",
  },
  btnText: {
    color: "white",
    fontSize: 21,
    fontFamily: "Poppins_500Medium",
  },
  skipTxt: {
    color: "dodgerblue",
  },
  getStartedButton: {
    width: "95%",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: "dodgerblue",
    alignItems: "center",
    marginBottom: 30,
    marginHorizontal: 30,
  },
  footer: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#3E5660",
  },
  getStarted: {
    color: "white",
    fontSize: 21,
    fontFamily: "Poppins_500Medium",
  }
});
