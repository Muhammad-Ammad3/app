import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";

const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);

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
    fontFamily: "Poppins-SemiBold, sans-serif",
    fontSize: 14,
    color: "#fff",
  },
  creator: {
    fontSize: 12,
    color: "#cdcde0",
    fontFamily: "Poppins-Regular, sans-serif",
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
