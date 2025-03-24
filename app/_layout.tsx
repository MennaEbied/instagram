/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import "../global.css";
import AuthProvider from "./provider/AuthProvider";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />;
    </AuthProvider>
  );
}
