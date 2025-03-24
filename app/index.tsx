/* eslint-disable prettier/prettier */
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <Redirect href='/(auth)'/>
  );
}

