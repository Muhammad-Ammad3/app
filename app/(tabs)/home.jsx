import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", flex: 1 }}>
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
        ListHeaderComponent={() => (
          <View
            style={{
              marginTop: 24,
              marginBottom: 24,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexDirection: "row",
                marginBottom: 24,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins-Medium,  sans-serif",
                    fontSize: 14,
                    lineHeight: 20,
                    color: "#cdcde0",
                  }}
                >
                  Welcome Back
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                    lineHeight: 32,
                    fontFamily: "Poppins-SemiBold, sans-serif",
                    color: "#fff",
                  }}
                >
                  JSMastery
                </Text>
              </View>
              <View style={{ marginTop: 6 }}>
                <Image
                  source={images.logoSmall}
                  style={{ width: 36, height: 40 }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View
              style={{
                width: "100%",
                flex: 1,
                paddingTop: 20,
                paddingBottom: 32,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 28,
                  fontFamily: "Poppins-Regular, sans-serif",
                  color: "#CDCDE0",
                  marginBottom: 12,
                }}
              >
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
