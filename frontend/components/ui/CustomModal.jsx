import { useTheme } from "@/constants/ThemeContext";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const makeStyles = (colors) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: colors.background.card,
    padding: 25,
    borderRadius: 15,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.text.primary,
  },
  modalTitleError: {
    color: colors.danger,
  },
  modalTitleSuccess: {
    color: colors.success || "#4CD964",
  },
  modalTitleWarning: {
    color: colors.warning || "#FF9500",
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "left",
    color: colors.text.secondary,
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    gap: 10,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  modalButtonPrimary: {
    backgroundColor: colors.primary,
  },
  modalButtonSecondary: {
    backgroundColor: colors.background.secondary,
  },
  modalButtonDanger: {
    backgroundColor: colors.danger,
  },
  modalButtonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  modalButtonTextPrimary: {
    color: "#fff",
  },
  modalButtonTextSecondary: {
    color: colors.text.primary,
  },
  modalButtonTextDanger: {
    color: "#fff",
  },
});

const CustomModal = ({ 
  visible, 
  onClose, 
  title, 
  message, 
  type = "default",
  buttons = [{ text: "OK", onPress: onClose, style: "primary" }]
}) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const getTitleStyle = () => {
    switch (type) {
      case "error":
        return [styles.modalTitle, styles.modalTitleError];
      case "success":
        return [styles.modalTitle, styles.modalTitleSuccess];
      case "warning":
        return [styles.modalTitle, styles.modalTitleWarning];
      default:
        return styles.modalTitle;
    }
  };

  const getButtonStyle = (buttonStyle) => {
    switch (buttonStyle) {
      case "danger":
        return [styles.modalButton, styles.modalButtonDanger];
      case "secondary":
        return [styles.modalButton, styles.modalButtonSecondary];
      default:
        return [styles.modalButton, styles.modalButtonPrimary];
    }
  };

  const getButtonTextStyle = (buttonStyle) => {
    switch (buttonStyle) {
      case "danger":
        return [styles.modalButtonText, styles.modalButtonTextDanger];
      case "secondary":
        return [styles.modalButtonText, styles.modalButtonTextSecondary];
      default:
        return [styles.modalButtonText, styles.modalButtonTextPrimary];
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={getTitleStyle()}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={getButtonStyle(button.style)}
                onPress={button.onPress}
              >
                <Text style={getButtonTextStyle(button.style)}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
