import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { getCurrentUser, signIn, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      const existingUser = await getCurrentUser();
      if (existingUser) {
        Alert.alert("Already Logged In", "Redirecting to home...");
        router.replace("/home");
        return;
      }

      await signOut().catch(() => null);

      await signIn(email, password);
      const result = await getCurrentUser();

      if (!result) throw new Error("User data could not be retrieved");

      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      console.error("Sign-in Error:", error);
      Alert.alert(
        "Sign-in Failed",
        error.message || "Invalid credentials. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <ScrollView>
        <View
          style={{
            minHeight: Dimensions.get("window").height - 100,
            width: "100%",
            justifyContent: "center",
            height: "100%",
            paddingLeft: 16,
            paddingRight: 16,
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ width: 115, height: 34 }}
          />

          <Text
            style={{
              fontSize: 24,
              lineHeight: 32,
              fontWeight: "600",
              color: "#fff",
              marginTop: 40,
            }}
          >
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View
            style={{
              justifyContent: "center",
              paddingTop: 20,
              flexDirection: "row",
              gap: 8,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                lineHeight: 28,
                color: "#CDCDE0",
                fontFamily: "Poppins-Regular, sans-serif",
              }}
            >
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              style={{
                fontSize: 18,
                lineHeight: 28,
                fontFamily: "Poppins-SemiBold, sans-serif",
                color: "#FF9C01",
              }}
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
