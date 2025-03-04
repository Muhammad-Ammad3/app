import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View
      className="flex justify-center items-center px-4"
      style={{
        display: "flex",
        justifyContent: "center",
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
        style={{ width: 270, height: 216 }}
      />

      <Text
        className="text-sm font-pmedium text-gray-100"
        style={{
          fontSize: 14,
          lineHeight: 20,
          fontFamily: "Poppins-Medium, sans-serif",
          color: "#cdcde0",
          textAlign: "center"
        }}
      >
        {title}
      </Text>
      <Text
        className="text-xl text-center font-psemibold text-white mt-2"
        style={{
          fontSize: 20,
          lineHeight: 28,
          textAlign: "center",
          fontFamily: "Poppins-SemiBold, sans-serif",
          color: "#fff",
          marginTop: 8,
        }}
      >
        {subtitle}
      </Text>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/home")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
