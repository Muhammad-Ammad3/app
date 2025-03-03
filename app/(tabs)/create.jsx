// import { VideoView } from "expo-video";
// import { useEvent } from "expo";

// const Create = () => {

//  function VideoScreen() {
//     const player = useVideoPlayer(videoSource, player => {
//       player.loop = true;
//       player.play();
//     });}

//     const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

//   return (
//     <SafeAreaView
//       className="bg-primary h-full"
//       style={{ backgroundColor: "#161622", height: "100%" }}
//     >
//       <ScrollView
//         className="px-4 my-6"
//         style={{
//           paddingLeft: 16,
//           paddingRight: 16,
//           marginTop: 24,
//           marginBottom: 24,
//         }}
//       >
//         <Text
//           className="text-2xl text-white font-psemibold"

//         >
//           Upload Video
//         </Text>

//         <FormField
//           title="Video Title"
//           value={form.title}
//           placeholder="Give your video a catchy title..."
//           handleChangeText={(e) => setForm({ ...form, title: e })}
//           otherStyles="mt-10"
//         />

//         <View
//           className="mt-7 space-y-2"
//           style={{ marginTop: 28, marginBottom: 8 }}
//         >
//           <Text
//             className="text-base text-gray-100 font-pmedium"
//             style={{
//               fontSize: 16,
//               lineHeight: 24,
//               color: "#CDCDE0",
//               fontFamily: "Poppins-Medium sans-serif",
//             }}
//           >
//             Upload Video
//           </Text>

//           <TouchableOpacity onPress={() => openPicker("video")}>
//             {form.video ? (
//               // <VideoView
//               //   source={{ uri: form.video.uri }}
//               //   className="w-full h-64 rounded-2xl"
//               //   style={{ width: "100%", height: 256, borderRadius: 16 }}
//               //   useNativeControls
//               //   resizeMode={ResizeMode.COVER}
//               //   isLooping
//               // />
//               <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
//             ) : (
//               <View
//                 className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center"
//                 style={{
//                   width: "100%",
//                   height: 160,
//                   paddingLeft: 16,
//                   paddingRight: 16,
//                   backgroundColor: "#1E1E2D",
//                   borderRadius: 16,
//                   borderWidth: 1,
//                   borderColor: "#232533",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <View
//                   className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center"
//                   style={{
//                     width: 56,
//                     height: 56,
//                     borderWidth: 1,
//                     borderStyle: "dashed",
//                     borderColor: "#FF9001",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Image
//                     source={icons.upload}
//                     resizeMode="contain"
//                     alt="upload"
//                     className="w-1/2 h-1/2"
//                     style={{ width: "50%", height: "50%" }}
//                   />
//                 </View>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>

//         <View
//           className="mt-7 space-y-2"
//           style={{ marginTop: 28, marginBottom: 8 }}
//         >
//           <Text
//             className="text-base text-gray-100 font-pmedium"
//             style={{
//               fontSize: 16,
//               lineHeight: 24,
//               color: "cdcde0",
//               fontFamily: "Poppins-Medium sans-serif",
//             }}
//           >
//             Thumbnail Image
//           </Text>

//           <TouchableOpacity onPress={() => openPicker("image")}>
//             {form.thumbnail ? (
//               <Image
//                 source={{ uri: form.thumbnail.uri }}
//                 resizeMode="cover"
//                 className="w-full h-64 rounded-2xl"
//                 style={{ width: "100%", height: 256, borderRadius: 16 }}
//               />
//             ) : (
//               <View
//                 className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2"
//                 style={{
//                   width: "100%",
//                   height: 64,
//                   paddingLeft: 16,
//                   paddingRight: 16,
//                   backgroundColor: "#1e1e2d",
//                   borderRadius: 16,
//                   borderWidth: 2,
//                   borderColor: "#232533",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   flexDirection: "row",
//                   marginRight: 8,
//                   marginLeft: 8,
//                 }}
//               >
//                 <Image
//                   source={icons.upload}
//                   resizeMode="contain"
//                   alt="upload"
//                   className="w-5 h-5"
//                   style={{ width: 20, height: 20 }}
//                 />
//                 <Text
//                   className="text-sm text-gray-100 font-pmedium"
//                   style={{
//                     fontSize: 14,
//                     lineHeight: 20,
//                     color: "#cdcde0",
//                     fontFamily: "Poppins-Medium sans-serif",
//                   }}
//                 >
//                   Choose a file
//                 </Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>

//         <FormField
//           title="AI Prompt"
//           value={form.prompt}
//           placeholder="The AI prompt of your video...."
//           handleChangeText={(e) => setForm({ ...form, prompt: e })}
//           otherStyles="mt-7"
//         />

//         <CustomButton
//           title="Submit & Publish"
//           handlePress={submit}
//           containerStyles="mt-7"
//           isLoading={uploading}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Create;

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";

import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { icons } from "../../constants";
import { createVideoPost } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Picked Image==>", result);
      
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      !form.prompt || !form.title || !form.thumbnail || !form.video
    ){
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView
      className="bg-primary h-full"
      style={{ backgroundColor: "#161622", height: "100%" }}
    >
      <ScrollView
        className="px-4 my-6"
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          marginTop: 24,
          marginBottom: 24,
        }}
      >
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View
          className="mt-7 space-y-2"
          style={{ marginTop: 28, marginBottom: 8 }}
        >
          <Text
            className="text-base text-gray-100 font-pmedium"
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: "#CDCDE0",
              fontFamily: "Poppins-Medium sans-serif",
            }}
          >
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                style={{ width: "100%", height: 256, borderRadius: 16 }}
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View
                className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center"
                style={{
                  width: "100%",
                  height: 160,
                  paddingLeft: 16,
                  paddingRight: 16,
                  backgroundColor: "#1E1E2D",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#232533",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center"
                  style={{
                    width: 56,
                    height: 56,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor: "#FF9001",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                    style={{ width: "50%", height: "50%" }}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View
          className="mt-7 space-y-2"
          style={{ marginTop: 28, marginBottom: 8 }} 
        >
          <Text
            className="text-base text-gray-100 font-pmedium"
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: "#CDCDE0",
              fontFamily: "Poppins-Medium sans-serif",
            }}
          >
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
                style={{ width: "100%", height: 256, borderRadius: 16 }}
              />
            ) : (
              <View
                className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2"
                style={{
                  width: "100%",
                  height: 64,
                  paddingLeft: 16,
                  paddingRight: 16,
                  backgroundColor: "#1e1e2d",
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: "#232533",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginRight: 8,
                  marginLeft: 8,
                }}
              >
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                  style={{ width: 20, height: 20 }}
                />
                <Text
                  className="text-sm text-gray-100 font-pmedium"
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    color: "#cdcde0",
                    fontFamily: "Poppins-Medium sans-serif",
                  }}
                >
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
