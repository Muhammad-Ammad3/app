// import { useState } from "react";
// import { ResizeMode, Video } from "expo-av";
// import { View, Text, TouchableOpacity, Image } from "react-native";

// import { icons } from "../constants";

// const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
//   const [play, setPlay] = useState(false);

//   return (
//     <View
//       className="flex flex-col items-center px-4 mb-14"
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         paddingLeft: 16,
//         paddingRight: 16,
//         marginBottom: 56,
//       }}
//     >
//       <View
//         className="flex flex-row gap-3 items-start"
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           gap: 12,
//           alignItems: "flex-start",
//           display: "flex",
//         }}
//       >
//         <View
//           className="flex justify-center items-center flex-row flex-1"
//           style={{
//             display: "flex",
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "row",
//           }}
//         >
//           <View
//             className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5"
//             style={{
//               display: "flex",
//               width: 46,
//               height: 46,
//               borderRadius: 8,
//               borderWidth: 1,
//               borderColor: "#FF9C01",
//               justifyContent: "center",
//               alignItems: "center",
//               padding: 2,
//             }}
//           >
//             <Image
//               source={{ uri: avatar }}
//               className="w-full h-full rounded-lg"
//               style={{ width: "100%", height: "100%", borderRadius: 8 }}
//               resizeMode="cover"
//             />
//           </View>

//           <View
//             className="flex justify-center flex-1 ml-3 gap-y-1"
//             style={{
//               display: "flex",
//               flex: 1,
//               justifyContent: "center",
//               marginLeft: 12,
//               rowGap: 4,
//             }}
//           >
//             <Text
//               className="font-psemibold text-sm text-white"
//               style={{
//                 fontFamily: "Poppins-SemiBold, sans-serif",
//                 fontSize: 14,
//                 lineHeight: 20,
//                 color: "#fff",
//               }}
//               numberOfLines={1}
//             >
//               {title}
//             </Text>
//             <Text
//               className="text-xs text-gray-100 font-pregular"
//               style={{
//                 fontSize: 12,
//                 lineHeight: 16,
//                 color: "#cdcde0",
//                 fontFamily: "Poppins-Regular, sans-serif",
//               }}
//               numberOfLines={1}
//             >
//               {creator}
//             </Text>
//           </View>
//         </View>

//         <View className="pt-2" style={{ paddingTop: 8 }}>
//           <Image
//             source={icons.menu}
//             style={{ width: 20, height: 20 }}
//             className="w-5 h-5"
//             resizeMode="contain"
//           />
//         </View>
//       </View>

//       {play ? (
//         <Video
//           source={{ uri: video }}
//           className="w-full h-60 rounded-xl mt-3"
//           style={{
//             width: "100%",
//             height: 240,
//             borderRadius: 12,
//             marginTop: 12,
//           }}
//           resizeMode={ResizeMode.CONTAIN}
//           useNativeControls
//           shouldPlay
//           onPlaybackStatusUpdate={(status) => {
//             if (status.didJustFinish) {
//               setPlay(false);
//             }
//           }}
//         />
//       ) : (
//         <TouchableOpacity
//           activeOpacity={0.7}
//           onPress={() => setPlay(true)}
//           className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
//           style={{
//             display: "flex",
//             width: "100%",
//             height: 240,
//             borderRadius: 12,
//             marginTop: 12,
//             position: "relative",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Image
//             source={{ uri: thumbnail }}
//             className="w-full h-full rounded-xl mt-3"
//             style={{
//               width: "100%",
//               height: "100%",
//               borderRadius: 12,
//               marginTop: 12,
//             }}
//             resizeMode="cover"
//           />

//           <Image
//             source={icons.play}
//             className="w-12 h-12 absolute"
//             style={{ width: 48, height: 48, position: "absolute" }}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default VideoCard;


import { useVideoPlayer, VideoView } from "expo-video";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import { useState } from "react";


const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [player] = useState(() => useVideoPlayer(video)); // ✅ Har video ke liye alag instance

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 56,
      }}
    >
      {/* Header */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        {/* Avatar */}
        <View
          style={{
            display: "flex",
            width: 46,
            height: 46,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#FF9C01",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Image
            source={{ uri: avatar }}
            style={{ width: "100%", height: "100%", borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>

        {/* Title & Creator */}
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 12 }}>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold, sans-serif",
              fontSize: 14,
              lineHeight: 20,
              color: "#fff",
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 16,
              color: "#cdcde0",
              fontFamily: "Poppins-Regular, sans-serif",
            }}
            numberOfLines={1}
          >
            {creator}
          </Text>
        </View>

        {/* Menu Icon */}
        <View style={{ paddingTop: 8 }}>
          <Image
            source={icons.menu}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Video Section */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => player.play()} // ✅ Click par video play hoga
        style={{
          display: "flex",
          width: "100%",
          height: 240,
          borderRadius: 12,
          marginTop: 12,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Video View */}
        <VideoView
          player={player}
          style={{
            width: "100%",
            height: 240,
            borderRadius: 12,
          }}
          nativeControls
        />

        {/* Play Button (Visible Only if Video is Not Playing) */}
        {!player.isPlaying && (
          <Image
            source={icons.play}
            style={{ width: 48, height: 48, position: "absolute" }}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default VideoCard;
