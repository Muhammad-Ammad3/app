  // import { useState } from "react";
  // import { Link, router } from "expo-router";
  // import { SafeAreaView } from "react-native-safe-area-context";
  // import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

  // import { images } from "../../constants";
  // import { CustomButton, FormField } from "../../components";
  // import { getCurrentUser, signIn } from "../../lib/appwrite";
  // import { useGlobalContext } from "../../context/GlobalProvider";

  // const SignIn = () => {
  //   const { setUser, setIsLogged } = useGlobalContext();
  //   const [isSubmitting, setSubmitting] = useState(false);
  //   const [form, setForm] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   const submit = async () => {
  //     if (form.email === "" || form.password === "") {
  //       Alert.alert("Error", "Please fill in all fields");
  //     }

  //     setSubmitting(true);

  //     try {
  //       await signIn(form.email, form.password);
  //       const result = await getCurrentUser();
  //       setUser(result);
  //       setIsLogged(true);

  //       Alert.alert("Success", "User signed in successfully");
  //       router.replace("/home");
  //     } catch (error) {
  //       Alert.alert("Error", error.message);
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };

  //   return (
  //     <SafeAreaView
  //       className="bg-primary h-full"
  //       style={{ backgroundColor: "#161622", height: "100%" }}
  //     >
  //       <ScrollView>
  //         <View
  //           className="w-full flex justify-center h-full px-4 my-6"
  //           style={{
  //             minHeight: Dimensions.get("window").height - 100,
  //             width: "100%",
  //             justifyContent: "center",
  //             height: "100%",
  //             paddingLeft: 16,
  //             paddingRight: 16,
  //             marginTop: 24,
  //             marginBottom: 24,
  //           }}
  //         >
  //           <Image
  //             source={images.logo}
  //             resizeMode="contain"
  //             className="w-[115px] h-[34px]"
  //             style={{width: 115, height: 34}}
  //           />

  //           <Text className="text-2xl font-semibold text-white mt-10 font-psemibold"
  //           style={{fontSize: 24, lineHeight: 32, fontWeight: 600, color: "#fff", marginTop: 40}}>
  //             Log in to Aora
  //           </Text>

  //           <FormField
  //             title="Email"
  //             value={form.email}
  //             handleChangeText={(e) => setForm({ ...form, email: e })}
  //             otherStyles="mt-7"
  //             keyboardType="email-address"
  //           />

  //           <FormField
  //             title="Password"
  //             value={form.password}
  //             handleChangeText={(e) => setForm({ ...form, password: e })}
  //             otherStyles="mt-7"
  //           />

  //           <CustomButton
  //             title="Sign In"
  //             handlePress={submit}
  //             containerStyles="mt-7"
  //             isLoading={isSubmitting}
  //           />

  //           <View className="flex justify-center pt-5 flex-row gap-2"
  //           style={{justifyContent: "center", paddingTop: 20, flexDirection: "row", gap: 8}}>
  //             <Text className="text-lg text-gray-100 font-pregular"
  //             style={{fontSize: 18, lineHeight: 28,  color: "#CDCDE0", fontFamily: "Poppins-Regular sans-serif"}}>
  //               Don't have an account?
  //             </Text>
  //             <Link
  //               href="/sign-up"
  //               className="text-lg font-psemibold text-secondary"
  //               style={{fontSize: 18, lineHeight: 28, fontFamily: "Poppins-SemiBold sans-serif", color: "#FF9C01"}}
  //             >
  //               Signup
  //             </Link>
  //           </View>
  //         </View>
  //       </ScrollView>
  //     </SafeAreaView>
  //   );
  // };

  // export default SignIn;

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
      // ✅ Pehle check karo user already logged-in hai ya nahi
      const existingUser = await getCurrentUser();
      if (existingUser) {
        Alert.alert("Already Logged In", "Redirecting to home...");
        router.replace("/home");
        return;
      }

      // ✅ Agar session pehle se hai, toh pehle sign out karo
      await signOut().catch(() => null);

      // ✅ Sign in user
      await signIn(email, password);
      const result = await getCurrentUser();

      if (!result) throw new Error("User data could not be retrieved");

      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      console.error("Sign-in Error:", error);
      Alert.alert("Sign-in Failed", error.message || "Invalid credentials. Please try again.");
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
          <Image source={images.logo} resizeMode="contain" style={{ width: 115, height: 34 }} />

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

          <CustomButton title="Sign In" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />

          <View
            style={{
              justifyContent: "center",
              paddingTop: 20,
              flexDirection: "row",
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 18, lineHeight: 28, color: "#CDCDE0", fontFamily: "Poppins-Regular sans-serif" }}>
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              style={{ fontSize: 18, lineHeight: 28, fontFamily: "Poppins-SemiBold sans-serif", color: "#FF9C01" }}
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
