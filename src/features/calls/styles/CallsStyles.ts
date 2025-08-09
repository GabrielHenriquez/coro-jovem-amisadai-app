import { colors } from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
    paddingBottom: 10,
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 60,
    alignSelf: "center",
    marginBottom: 5,
    marginTop: 20,
  },
  calendarAnimatedWrapper: {
    overflow: "hidden",
  },
  calendarWrapper: {
    flex: 1,
    position: "relative",
    overflow: "visible",
  },
  calendarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  calendar: {
    backgroundColor: "transparent",
  },
  toggleButton: {
    height: 30,
    width: 30,
    backgroundColor: "#FFF",
    borderRadius: 17,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -15,
    zIndex: 10,
    elevation: 10,
  },
  calendarHeader: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  calendarHeaderText: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "Rubik_500Medium",
    textAlign: "center",
    lineHeight: 24,
  },
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#E8E8E8",
    top: -16,
  },
  selected: {
    color: "#4C5E46",
    fontSize: 24,
    fontFamily: "Rubik_600SemiBold",
    marginTop: 12,
  },
  dayText: {
    color: "#E8E8E8",
    fontFamily: "Rubik_600SemiBold",
    fontSize: 16,
    lineHeight: 20,
  },
  day: {
    width: 34,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  disabled: {
    color: "#8f8f8f",
  },
  today: {
    color: "#F06543",
    fontWeight: "bold",
  },
  daySelected: {
    backgroundColor: "#F06543",
  },
});

export default styles;
