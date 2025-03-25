/* eslint-disable prettier/prettier */
import PostList from "../components/postList";
import posts from "../../assets/data/posts.json";
import { Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    let { data, error } = await supabase.from("posts").select("*, user:profiles(*)");
    if (error) {
      Alert.alert("error");
    }
    setPosts(data);
  };
  console.log(posts)
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostList post={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: 12,
        maxWidth: 512,
        width: "100%",
        alignSelf: "center",
      }}
    />
  );
}
