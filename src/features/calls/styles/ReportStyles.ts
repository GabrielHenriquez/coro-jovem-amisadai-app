import { StyleSheet } from "react-native";

export const reportStyles = StyleSheet.create({
  periodContainer: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  periodHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  yearBadge: {
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusCard: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
  },
  statusCardLoading: {
    backgroundColor: "#f0f9ff",
    borderColor: "#0ea5e9",
  },
  statusCardSuccess: {
    backgroundColor: "#f0fdf4",
    borderColor: "#10b981",
  },
  statusCardWarning: {
    backgroundColor: "#fef3c7",
    borderColor: "#f59e0b",
  },
  statusContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusDot: {
    marginRight: 8,
  },
  statusDotLoading: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0ea5e9",
  },
  statusDotSuccess: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10b981",
  },
  statusDotWarning: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f59e0b",
  },
});
