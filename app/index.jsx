import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView
      className="bg-primary h-full"
      style={{ backgroundColor: "#161622", height: "100%" }}
    >
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View
          className="w-full flex justify-center items-center h-full px-4"
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
            style={{ width: 130, height: 84 }}
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
            style={{ maxHeight: 380, width: "100%", height: 298 }}
          />

          <View
            className="relative mt-5"
            style={{ position: "relative", marginTop: 20 }}
          >
            <Text
              className="text-3xl text-white font-bold text-center"
              style={{
                fontSize: 30,
                lineHeight: 36,
                color: "#fff",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200" style={{ color: "#FF8E01" }}>
                Aora
              </Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
              style={{
                width: 136,
                height: 15,
                position: "absolute",
                bottom: -8,
                right: 2,
              }}
            />
          </View>

          <Text
            className="text-sm font-pregular text-gray-100 mt-7 text-center"
            style={{
              fontSize: 14,
              lineHeight: 20,
              fontFamily: "Poppins-Regular sans-serif",
              color: "#CDCDE0",
              marginTop: 28,
              textAlign: "center",
            }}
          >
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
