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
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 16,
  },
  tabItem: {
    paddingVertical: 6,
  },
  tabText: {
    fontSize: 16,
    color: "#777",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF",
  },
  activeTabText: {
    color: "#007BFF",
    fontWeight: "600",
  },
  emptyCart: {
    alignItems: "center",
    marginTop: 50,
  },
  cartImage: {
    width: 310,
    height: 350,
    marginBottom: 20,
    resizeMode: "cover",
  },
  emptyText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#1E88E5",
    paddingHorizontal: 20,
    borderRadius: 6,
    justifyContent: "center",
    height: 56,
    width: "100%",
    alignItems: "center",
  },
  addButtonText: {
    fontFamily: "Poppins_700Bold",
    color: "#ffffff",
    fontSize: 16,
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  orderList: {
    gap: 3,
  },
  orderCard: {
    position: "relative",
  },
  viewButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  viewButtonText: {
    fontFamily: "Poppins_400Regular",
    color: "#1E88E5",
    fontSize: 12,
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  restaurantImg: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
    gap: 4,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  qtyPrice: {
    flexDirection: "row",
    gap: 4,
  },
  separator: {
    backgroundColor: "#7C7C7C",
    width: 1,
  },
  quantity: {
    color: "#7C7C7C",
  },
  price: {
    color: "#7C7C7C",
  },
  location: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  checkoutButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  checkoutText: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  clearButton: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1E88E5",
    alignItems: "center",
    marginBottom: 5,
  },
  clearText: {
    color: "#1E88E5",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  orderRestaurantImg: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  orderQtyPrice: {
    flexDirection: "row",
    gap: 10,
  },
  orderRestaurantName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  orderPrice: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 9,
  },
  orderQuantity: {
    fontFamily: "Popins_400Regular",
    fontSize: 9,
    color: "#DCDCDC",
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  trackOrder: {
    backgroundColor: "#1E88E5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  trackText: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
  },
  cancelOrder: {
    borderWidth: 1,
    borderColor: "#1E88E5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelText: {
    color: "#1E88E5",
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
  },
});
