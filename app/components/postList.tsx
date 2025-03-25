/* eslint-disable prettier/prettier */
import { View, Text, useWindowDimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AdvancedImage } from "cloudinary-react-native";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import {cld } from "../lib/cloudinary";

export default function PostList({ post }) {
  // cld.image returns a CloudinaryImage with the configuration set.
  const { width } = useWindowDimensions();
  const image = cld.image(post.image);
 image.resize(thumbnail().width(width).height(width));
  const avatar = cld.image(post.user.avatar_url);
  avatar.resize(
    thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())),
  );
  return (
    <View className="bg-white">
      <View className="p-3 flex-row items-center gap-2">
        <AdvancedImage
          cldImg={avatar}
          className="rounded-full w-12 aspect-square"
        />
        <Text className="font-semibold">{post.user.username}</Text>
      </View>
      <AdvancedImage cldImg={image} className="w-full aspect-[4/3]" />

      <View className="flex-row gap-5 items-center ml-1 p-3">
        <AntDesign name="hearto" size={24} color="black" />
        <Ionicons name="chatbubble-outline" size={24} color="black" />
        <Feather name="send" size={24} color="black" />
        <Feather name="bookmark" size={24} color="black" className="ml-auto" />
      </View>
    </View>
  );
}
