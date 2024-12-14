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
        className="w-52 aspect-[3/4] rounded-xl bg-gray-200"
      />
      <Pressable
        hitSlop={20}
        onPress={handleChooseImage}
      >
        <Text className="text-blue-500 m-5 font-semibold">Change</Text>
      </Pressable>
      <TextInput
        placeholder="What's on your mind?"
        className="bg-neutral-200 w-full p-4 rounded-sm mt-5 "
        value={caption}
        onChangeText={(newValue) => setCaption(newValue)}
      />
      <View className="mt-auto w-full">
        <CustomButton title="Share" />
      </View>
    </View>
  );
}
