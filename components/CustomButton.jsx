import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{
        display: "flex",
        backgroundColor: "#FF9C01",
        borderRadius: 12,
        minHeight: 62,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      
      disabled={isLoading}
    >
      <Text
        className={`text-primary font-psemibold text-lg ${textStyles}`}
        style={{
          color: "#161622",
          fontFamily: "Poppins-SemiBold sans-serif",
          fontSize: 18,
          lineHeight: 28,
        }}
      >
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
          style={{marginLeft: 8}}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
