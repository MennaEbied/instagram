/* eslint-disable prettier/prettier */
import { Pressable, Text } from "react-native";
type ButtonProps = {
  title: string;
  onPress?: () => void;
};
export default function CustomButton({ title, onPress }: ButtonProps) {
  return (
    <Pressable className="bg-blue-500 w-full p-3  items-center rounded-2xl" onPress={onPress}>
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
}
