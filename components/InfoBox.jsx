import { View, Text } from "react-native";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text
        className={`text-white text-center font-psemibold ${titleStyles}`}
        style={{
          color: "#fff",
          textAlign: "center",
          fontFamily: "Poppins-SemiBold, sans-serif",
        }}
      >
        {title}
      </Text>
      <Text
        className="text-sm text-gray-100 text-center font-pregular"
        style={{
          fontSize: 14,
          lineHeight: 20,
          color: "#cdcde0",
          textAlign: "center",
          fontFamily: "Poppins-Regular, sans-serif",
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
