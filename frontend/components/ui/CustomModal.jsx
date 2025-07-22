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
    borderRadius: 10,
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.danger,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "left",
    color: colors.text.primary,
    marginBottom: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  modalButtonText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

const CustomModal = ({ visible, onClose, title, message }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
