import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View
      className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        marginBottom: 16,
        width: "100%",
        height: 64,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "#1E1E2D",
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#232533",
      }}
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        style={{
          fontSize: 16,
          lineHeight: 24,
          marginTop: 2,
          color: "#fff",
          flex: 1,
          fontFamily: "Poppins-Regular, sans-serif",
        }}
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          className="w-5 h-5"
          style={{ width: 20, height: 20 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
