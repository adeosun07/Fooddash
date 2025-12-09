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
    fontFamily: "Poppins_700Bold",
    fontSize: 38,
    marginTop: 30,
  },
  formContainer: {
    marginTop: 15,
    width: "100%",
    gap: 5,
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 21,
    marginTop: 10,
  },
  input: {
    borderWidth: 0,
    backgroundColor: "#EFEFEF",
    height: 53,
    borderRadius: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  button:{
    backgroundColor: "#1E88E5",
    height: 56,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  authText:{
    fontFamily: "Poppins_700Bold",
    fontSize: 21,
    color: "#F3F8F8",
  },
  fgtPwd:{
    textAlign: "right",
    marginTop: 5,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#000000",
  },
  optnsContainer:{
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
    gap: 20,
  },
  otherContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
    dashLine:{
    width: "33%",
    backgroundColor: "#BDBDBD",
    height: 1,
    },
    otherText:{
        color: "#BDBDBD",
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
    },
    iconsContainer:{
    flexDirection: "row",
    width: 120,
    height: 30,
    justifyContent: "space-between",
    },
    signUpContainer:{
        textAlign: "center",
        marginTop: 30,
        marginBottom: "auto",
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
    },
    signUpText:{
        fontFamily: "Poppins_700Bold",
        fontSize: 16,
    }
});
