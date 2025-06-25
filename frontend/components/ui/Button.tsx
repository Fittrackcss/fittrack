import { colors } from "@/constants/Colors";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) => {
  const getButtonStyle = () => {
    let buttonStyle = {};

    switch (variant) {
      case "primary":
        buttonStyle = styles.primaryButton;
        break;
      case "secondary":
        buttonStyle = styles.secondaryButton;
        break;
      case "outline":
        buttonStyle = styles.outlineButton;
        break;
    }

    switch (size) {
      case "small":
        buttonStyle = { ...buttonStyle, ...styles.smallButton };
        break;
      case "medium":
        buttonStyle = { ...buttonStyle, ...styles.mediumButton };
        break;
      case "large":
        buttonStyle = { ...buttonStyle, ...styles.largeButton };
        break;
    }

    if (disabled) {
      buttonStyle = { ...buttonStyle, ...styles.disabledButton };
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyleVar = {};

    switch (variant) {
      case "primary":
        textStyleVar = styles.primaryText;
        break;
      case "secondary":
        textStyleVar = styles.secondaryText;
        break;
      case "outline":
        textStyleVar = styles.outlineText;
        break;
    }

    switch (size) {
      case "small":
        textStyleVar = { ...textStyleVar, ...styles.smallText };
        break;
      case "medium":
        textStyleVar = { ...textStyleVar, ...styles.mediumText };
        break;
      case "large":
        textStyleVar = { ...textStyleVar, ...styles.largeText };
        break;
    }

    if (disabled) {
      textStyleVar = { ...textStyleVar, ...styles.disabledText };
    }

    return textStyleVar;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? colors.primary : "#fff"}
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Button variants
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  // Button sizes
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },

  // Text variants
  primaryText: {
    color: "#fff",
    fontWeight: "600",
  },
  secondaryText: {
    color: colors.text.primary,
    fontWeight: "600",
  },
  outlineText: {
    color: colors.primary,
    fontWeight: "600",
  },

  // Text sizes
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },

  // Disabled state
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.8,
  },
});
