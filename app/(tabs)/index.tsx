import PostList from "../components/postList";
import posts from "../../assets/data/posts.json";
import { FlatList } from "react-native";

export default function FeedScreen() {
  return (
    <FlatList
    className="items-center"
      data={posts}
      renderItem={({ item }) => <PostList post={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 12,maxWidth:512,width:"100%" }}
    />
  );
}
