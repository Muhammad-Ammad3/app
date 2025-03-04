import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      className={`space-y-2 ${otherStyles}`}
      style={{ marginTop: 8, marginBottom: 8 }}
    >
      <Text
        className="text-base text-gray-100 font-pmedium"
        style={{
          fontSize: 16,
          lineHeight: 24,
          color: "#CDCDE0",
          fontFamily: "Poppins-Medium, sans-serif",
        }}
      >
        {title}
      </Text>

      <View
        className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200  flex flex-row items-center"
        style={{
          width: "100%",
          height: 64,
          paddingLeft: 16,
          paddingRight: 16,
          backgroundColor: "#1E1E2D",
          borderRadius: 16,
          borderWidth: 2,
          borderColor: "#232533",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          style={{
            flex: 1,
            color: "#fff",
            fontFamily: "Poppins-SemiBold, sans-serif",
            fontSize: 16,
            lineHeight: 24,
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
