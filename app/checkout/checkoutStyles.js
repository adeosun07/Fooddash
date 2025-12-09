import { ProgressBarAndroidComponent, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  pageHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  pageHeader: {
    fontFamily: "Poppins_500Medium",
    fontSize: 21,
  },
  tabs: {
    flexDirection: "row",
    gap: 13,
  },
  tab: {
    flex: 1,
  },
  tabTxt: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    paddingBottom: 5,
    color: "#DCDCDC",
  },
  active: {
    color: "#429EEE",
    borderBottomColor: "#429EEE",
    borderBottomWidth: 1,
  },
  tabHeader: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#BEDCF9",
    marginTop: 10,
    marginBottom: 15,
    justifyContent: "center"
  },
  tabHeaderTxt: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    marginBottom: 10,
  },
  restaurantName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    marginBottom: 3
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 5
  },
  itemImg: {
    height: 97,
    width: 107,
    resizeMode: "contain"
  },
  quantityContainer: {
    flexDirection: "row",
    width: 100,
    justifyContent: "space-between"
  },
  itemDetails:{
    flex: 1,
  },
  itemName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16
  },
  qtyBtn: {
    backgroundColor: "#EFEFEF",
    padding: 3
  },
  qtyCount: {
    fontSize: 16
  },
  promo: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    marginTop: 10
  },
  promoCodeContainer: {
    flexDirection: "row",
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: "#989898"
  },
  promoCode: {
    flex: 1,
    fontFamily: "Poppns_400Regular",
    fontSize: 16
  },
  apply: {
    fontFamily: "Poppns_500Medium",
    fontSize: 16,
    color: "#FF7043"
  },
  discount: {
    color: "#FF7043",
    fontFamily: "Poppins_400Regular",
    fontSize: 12
  },
  fees: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  scrollview: {
    paddingBottom: 100
  },
  feeTxt: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#DCDCDC",
    borderTopWidth: 1,
    paddingTop: 15,
    marginTop: 5,
    marginBottom: 100
  },
  totalTxt: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16
  },
  pay: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#1E88E5",
    borderRadius: 5,
    alignSelf: "center",
    paddingVertical: 10
  },
  payTxt: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#ffffff"
  },
  paymentTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16
  },
  paymentInfo: {
    fontFamily: "Pppins_400Regular",
    fontSize: 12,
    marginBottom: 5
  },
  locationContainer: {
    backgroundColor: "#EFEFEF",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5,
    gap: 10
  },
  paymentTypes: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    marginBottom: 20
  },
  paymentType: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 15,
    alignItems: "center"
  },
  paymentImg: {
    width: 52,
    height: 49,
    resizeMode: "cover",
  },
  transferContainer: {
    borderWidth: 1,
    borderColor: "#989898",
    borderRadius: 5,
    paddingVertical: 25,
    paddingHorizontal: 15,
    marginTop: 20
  },
  transferDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  copyContainer: {
    flexDirection: "row",
    gap: 2,
  },
  transfer: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12
  },
  ussdInfo: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  bankInfo: {
    marginTop: 20,
  },
  link: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  paidContainer: {
    alignItems: "center",
    marginTop: 40
  },
  cardInfo: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12
  },
   inputGroup: {
    marginBottom: 15,
    borderColor: "#BEDCF9",
    marginTop: 20,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  label: {
    fontSize: 13,
    color: "#BEDCF9",
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  half: {
    flex: 1,
  },
  confirm: {
    backgroundColor: "#1E88E5",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10
  },
  confirmTxt: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#fff"
  },
});

