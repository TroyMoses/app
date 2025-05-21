import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/bg2.jpg")}
        style={styles.background}
        blurRadius={5}
      />
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Potato Disease Detection</Text>
        <Text style={styles.subtitle}>
          Identify potato plant diseases instantly with AI.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/predict")}
        >
          <Text style={styles.buttonText}>Start Prediction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => router.push("/(tabs)/explore")}
        >
          <Text style={styles.buttonOutlineText}>Explore Diseases</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.link}
          onPress={() => router.push("/(tabs)/about")}
        >
          <Text style={styles.linkText}>About the App</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    width,
    height,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#DDD",
    marginVertical: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonOutline: {
    borderColor: "#FFF",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonOutlineText: {
    color: "#FFF",
    fontSize: 16,
  },
  link: {
    marginTop: 30,
  },
  linkText: {
    color: "#EEE",
    textDecorationLine: "underline",
  },
});
