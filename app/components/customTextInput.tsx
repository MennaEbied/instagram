/* eslint-disable prettier/prettier */
import { Text, TextInput, View } from "react-native";
export default function CustomTextInput({ label, ...textInputProps }) {
  return (
    <View>
      <Text className="mb-2 text-gray-500 font-semibold mt-3">{label}</Text>
      <TextInput
        {...textInputProps}
        className="rounded-2xl w-full p-3 bg-gray-200 text-lg"
      />
    </View>
  );
}
