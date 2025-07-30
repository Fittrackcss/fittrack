import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useTheme } from "@/constants/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { emailService, EmailVerificationResult } from "@/services/emailService";
import { User } from "@/types";

interface EmailVerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onVerificationSuccess: () => void;
  user: User;
  initialVerificationCode?: string;
}

export default function EmailVerificationModal({
  visible,
  onClose,
  onVerificationSuccess,
  user,
  initialVerificationCode,
}: EmailVerificationModalProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  
  const [verificationCode, setVerificationCode] = useState(initialVerificationCode || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (initialVerificationCode) {
      setVerificationCode(initialVerificationCode);
    }
  }, [initialVerificationCode]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = async () => {
    if (!verificationCode.trim()) {
      setError("Please enter the verification code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result: EmailVerificationResult = await emailService.verifyEmail(
        user.email,
        verificationCode.trim()
      );

      if (result.success) {
        setSuccess(true);
        setError("");
        // Wait a moment to show success message, then close
        setTimeout(() => {
          onVerificationSuccess();
          onClose();
        }, 1500);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result: EmailVerificationResult = await emailService.resendVerificationEmail(
        user.email
      );

      if (result.success) {
        setVerificationCode(result.verificationCode || "");
        setResendDisabled(true);
        setCountdown(60); // 60 second cooldown
        Alert.alert("Success", result.message);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Failed to resend verification email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setVerificationCode("");
      setError("");
      setSuccess(false);
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Verify Your Email</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            We've sent a verification code to:
          </Text>
          <Text style={styles.email}>{user.email}</Text>
          
          <Text style={styles.instruction}>
            Please enter the 6-digit verification code from your email:
          </Text>

          <View style={styles.codeInputContainer}>
            <TextInput
              style={[styles.codeInput, error && styles.codeInputError]}
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder="Enter 6-digit code"
              placeholderTextColor={colors.text.secondary}
              keyboardType="number-pad"
              maxLength={6}
              autoFocus
              editable={!isLoading}
            />
          </View>

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          {success ? (
            <Text style={styles.successText}>✓ Email verified successfully!</Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.verifyButton, isLoading && styles.disabledButton]}
              onPress={handleVerify}
              disabled={isLoading}
            >
              <Text style={styles.verifyButtonText}>
                {isLoading ? "Verifying..." : "Verify Email"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.resendButton, resendDisabled && styles.disabledButton]}
              onPress={handleResend}
              disabled={isLoading || resendDisabled}
            >
              <Text style={styles.resendButtonText}>
                {resendDisabled 
                  ? `Resend in ${countdown}s` 
                  : "Resend Code"
                }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

function makeStyles(colors: any) {
  return StyleSheet.create({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContainer: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 24,
      margin: 20,
      maxWidth: 400,
      width: "100%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text.primary,
    },
    closeButton: {
      padding: 4,
    },
    content: {
      alignItems: "center",
    },
    description: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: "center",
      marginBottom: 8,
    },
    email: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.primary,
      textAlign: "center",
      marginBottom: 20,
    },
    instruction: {
      fontSize: 14,
      color: colors.text.secondary,
      textAlign: "center",
      marginBottom: 20,
    },
    codeInputContainer: {
      width: "100%",
      marginBottom: 16,
    },
    codeInput: {
      height: 50,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
      color: colors.text.primary,
      backgroundColor: colors.background.secondary,
      letterSpacing: 4,
    },
    codeInputError: {
      borderColor: colors.danger,
    },
    errorText: {
      fontSize: 14,
      color: colors.danger,
      textAlign: "center",
      marginBottom: 16,
    },
    successText: {
      fontSize: 14,
      color: colors.success || "#4CD964",
      textAlign: "center",
      marginBottom: 16,
      fontWeight: "600",
    },
    buttonContainer: {
      width: "100%",
      gap: 12,
    },
    verifyButton: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: "center",
    },
    verifyButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    resendButton: {
      backgroundColor: "transparent",
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.primary,
    },
    resendButtonText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: "500",
    },
    disabledButton: {
      opacity: 0.5,
    },
  });
} 