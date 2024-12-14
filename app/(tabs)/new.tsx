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

export default function NewScreen() {
  const [caption, setCaption] = useState("");
  const [imageUri, setImageUri] = useState<string>();
  useEffect(() => {
    if (!imageUri) {
      handleChooseImage();
    }
  }, [imageUri]);
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
      setImageUri(result.assets[0].uri);
    }
  };
  return (
    <View className=" flex-1 items-center p-4">
      <Image
        source={{
          uri: imageUri,
        }}
        className="w-52 aspect-[3/4] rounded-xl bg-slate-500"
      />
      <Pressable
        hitSlop={20}
        onPress={handleChooseImage}
        className="bg-blue-500 w-40 h-15 items-center mt-5 rounded-md"
      >
        <Text className="text-white m-5 font-semibold">Change</Text>
      </Pressable>
      <TextInput
        placeholder="What's on your mind?"
        className="bg-neutral-200 w-full p-4 rounded-sm mt-5"
        value={caption}
        onChangeText={setCaption}
      />
      <View className="mt-auto w-full">
        <Pressable className="bg-blue-500 w-full p-3 h-18 items-center rounded-md">
          <Text className="text-white font-semibold">Share</Text>
        </Pressable>
      </View>
    </View>
  );
}
