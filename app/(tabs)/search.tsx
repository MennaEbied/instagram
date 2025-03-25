/* eslint-disable prettier/prettier */
import { Text, View, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import EvilIcons from '@expo/vector-icons/EvilIcons';
export default function Search() {
  return (
    <View className="flex-1">
      <View className="flex-row  bg-gray-200 rounded-lg items-center h-12 pl-2 mt-20 align-middle mx-4">
      <EvilIcons name="search" size={24} color="gray" />
        <TextInput placeholder="Search" className=" text-xl pl-2 h-12    " />
        <StatusBar style="dark"/>
      </View>
    </View>
  );
}
