import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView
      className="bg-primary h-full"
      style={{ backgroundColor: "#161622", height: "100%" }}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View
            className="w-full flex justify-center items-center mt-6 mb-12 px-4"
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
              marginBottom: 48,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
              style={{
                display: "flex",
                width: "100%",
                alignItems: "flex-end",
                marginBottom: 40,
              }}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>

            <View
              className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center"
              style={{
                width: 64,
                height: 64,
                borderWidth: 1,
                borderColor: "#FF9C01",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
                style={{ width: "90%", height: "90%", borderRadius: 8 }}
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View
              className="mt-5 flex flex-row"
              style={{ marginTop: 20, flexDirection: "row", display: "flex", gap: 30 }}
            >
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
