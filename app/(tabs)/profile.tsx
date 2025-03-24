/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  Image,
  Platform,
  Pressable,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import CustomButton from "../components/customButton";
import { supabase } from "../lib/supabase";

export default function Profile() {
  const [imageUri, setImageUri] = useState<string>();
  const [username, SetUsername] = useState("");
  const [email, setEmail] = useState("");
  const handleChooseImage = async () => {
    if (Platform.OS === "web") {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  return (
    <View className="flex-1 items-center p-3">
      <Image
        source={{ uri: imageUri }}
        className="w-40 h-40 rounded-full bg-gray-200 mt-10 aspect-square"
      />
      <Pressable
        hitSlop={20}
        onPress={handleChooseImage}
        className="  items-center mt-5"
      >
        <Text className="text-blue-500 m-5 font-semibold text-lg">Change</Text>
      </Pressable>
      <TextInput
        placeholder="Type your email"
        keyboardType="email-address"
        returnKeyType="done"
        className="rounded-2xl w-96 p-3 bg-gray-200 mb-5 text-lg"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Type your username"
        returnKeyType="done"
        className="rounded-2xl w-96 p-3 bg-gray-200 text-lg"
        value={username}
        onChangeText={SetUsername}
      />
      <View className="gap-3 mt-auto w-full">
        <CustomButton title="Update profile" />
        <CustomButton title="Sign out" onPress={()=>supabase.auth.signOut()}/>
      </View>
    </View>
  );
}
