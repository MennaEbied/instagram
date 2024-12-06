import { View, StyleSheet, Text, Image } from "react-native";
import posts from "../../assets/data/posts.json";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PostList({ post }) {
  return (
    <View className="bg-white">
      <View className="p-3 flex-row items-center gap-2">
        <Image
          source={{ uri: post.user.image_url }}
          className="rounded-full w-12 aspect-square"
        />
        <Text className="font-semibold">{post.user.username}</Text>
      </View>
      <Image
        source={{ uri: post.image_url }}
        className="w-full aspect-square"
      />
      <View className="flex-row gap-5 items-center ml-1 p-3">
        <AntDesign name="hearto" size={24} color="black" />
        <Ionicons name="chatbubble-outline" size={24} color="black" />
        <Feather name="send" size={24} color="black" />
        <Feather name="bookmark" size={24} color="black" className="ml-auto" />
      </View>
    </View>
  );
}
