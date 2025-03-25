/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import CustomButton from "../components/customButton";
import { uploadImage } from "../lib/cloudinary";
import { supabase } from "../lib/supabase";
import { useAuth } from "../provider/AuthProvider";
import { router } from "expo-router";

export default function NewScreen() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string>();
  const {session} = useAuth()
  useEffect(() => {
    if (!image) {
      handleChooseImage();
    }
  }, [image]);
  const handleChooseImage = async () => {
    if (Platform.OS === "web") {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createPost = async () => {
    if (!image) {
      return;
    }
    const response = await uploadImage(image);
    console.log("image id", response?.public_id);

    const { data, error } = await supabase
      .from("posts")
      .insert([{ caption, image: response?.public_id, user_id:session?.user.id }])
      .select();
      router.push('/(tabs)')
  };
  return (
    <View className=" flex-1 items-center p-4">
      <Image
        source={{
          uri: image,
        }}
        className="w-52 aspect-[3/4] rounded-xl bg-gray-200"
      />
      <Pressable hitSlop={20} onPress={handleChooseImage}>
        <Text className="text-blue-500 m-5 font-semibold">Change</Text>
      </Pressable>
      <TextInput
        placeholder="What's on your mind?"
        className="bg-neutral-200 w-full p-4 rounded-sm mt-5 "
        value={caption}
        onChangeText={(newValue) => setCaption(newValue)}
      />
      <View className="mt-auto w-full">
        <CustomButton title="Share" onPress={createPost} />
      </View>
    </View>
  );
}
