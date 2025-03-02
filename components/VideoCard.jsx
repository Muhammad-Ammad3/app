// import { useState } from "react";
// import { ResizeMode, Video } from "expo-av";
// import { View, Text, TouchableOpacity, Image } from "react-native";

// import { icons } from "../constants";
// import { useEvent } from "expo";
// import { useVideoPlayer, VideoView } from 'expo-video';

// const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
//   const [play, setPlay] = useState(false);

//  function VideoScreen() {
//     const player = useVideoPlayer(video, player => {
//       player.loop = true;
//       player.play();
//     });}
//     const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

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
//         // <Video
//         //   source={{ uri: video }}
//         //   className="w-full h-60 rounded-xl mt-3"
//         //   style={{
//         //     width: "100%",
//         //     height: 240,
//         //     borderRadius: 12,
//         //     marginTop: 12,
//         //   }}
//         //   resizeMode={ResizeMode.CONTAIN}
//         //   useNativeControls
//         //   shouldPlay
//         //   onPlaybackStatusUpdate={(status) => {
//         //     if (status.didJustFinish) {
//         //       setPlay(false);
//         //     }
//         //   }}
//         // />
//         <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
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

import React, { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";

const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);

  // Use video player hook
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
  });

   React.useEffect(() => {
      if (play) {
        player.play();
      }
    }, [play]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.creator} numberOfLines={1}>
              {creator}
            </Text>
          </View>
        </View>

        <View style={styles.menuIcon}>
          <Image source={icons.menu} style={styles.icon} resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={styles.thumbnailContainer}
        >
          <Image
            source={{ uri: thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            style={styles.playIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 56,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    width: 46,
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF9C01",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#fff",
  },
  creator: {
    fontSize: 12,
    color: "#cdcde0",
    fontFamily: "Poppins-Regular",
  },
  menuIcon: {
    paddingTop: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  video: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginTop: 12,
  },
  thumbnailContainer: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  playIcon: {
    width: 48,
    height: 48,
    position: "absolute",
  },
});

export default VideoCard;
