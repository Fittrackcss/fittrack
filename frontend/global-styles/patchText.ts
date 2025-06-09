// global-styles/patchText.ts
import { Text as RNText, TextInput as RNTextInput } from "react-native";

// Save original render methods
const TextRender = RNText.render;
const TextInputRender = RNTextInput.render;

// Patch <Text>
RNText.render = function (...args) {
  const origin = TextRender.call(this, ...args);
  return {
    ...origin,
    props: {
      ...origin.props,
      style: [{ fontFamily: "OpenSans" }, origin.props?.style],
    },
  };
};

// Patch <TextInput>
RNTextInput.render = function (...args) {
  const origin = TextInputRender.call(this, ...args);
  return {
    ...origin,
    props: {
      ...origin.props,
      style: [{ fontFamily: "OpenSans" }, origin.props?.style],
    },
  };
};
