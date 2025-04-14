/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  Image,
  Platform,
  Pressable,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import CustomButton from "../components/customButton";
import { supabase } from "../lib/supabase";
import { useAuth } from "../provider/AuthProvider";
import CustomTextInput from "../components/customTextInput";

export default function Profile() {
  const [imageUri, setImageUri] = useState<string>();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    if (!user) {
      return;
    }
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (error) {
      Alert.alert("Failed to fetch user");
    }
    setUsername(data.username);
    setBio(data.bio);
  };
  const updateProfile = async () => {
    if (!user) {
      return;
    }
    const { data, error } = await supabase.from("profiles").upsert({
      id: user.id,
      username,
      bio,
    });
    if (error) {
      Alert.alert("Failed to update profile");
    }
  };
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
    <View className="flex-1 p-3">
      <Image
        source={{ uri: imageUri }}
        className="w-40 h-40 rounded-full bg-gray-200 mt-10 aspect-square self-center"
      />
      <Pressable
        hitSlop={20}
        onPress={handleChooseImage}
        className="  items-center mt-5"
      >
        <Text className="text-blue-500 m-5 font-semibold text-lg">Change</Text>
      </Pressable>
      <View className="gap-5">
      <CustomTextInput
        label="Username"
        placeholder="Type your username"
        returnKeyType="done"
        value={username}
        onChangeText={setUsername}
      />
      <CustomTextInput
        label="Bio"
        placeholder="Type your bio"
        returnKeyType="done"
        value={bio}
        onChangeText={setBio}
      />
      </View>
      <View className="gap-3 mt-auto w-full">
        <CustomButton title="Update profile" onPress={updateProfile} />
        <CustomButton
          title="Sign out"
          onPress={() => supabase.auth.signOut()}
        />
      </View>
    </View>
  );
}
