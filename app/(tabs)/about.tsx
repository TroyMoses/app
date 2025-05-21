import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";

import { TipOfTheDay } from "@/components/TipOfTheDay";

const { width, height } = Dimensions.get("window");

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

  const openEmail = () => {
    Linking.openURL("mailto:troylegacy256@gmail.com");
  };

  const openWebsite = () => {
    Linking.openURL("https://troylegacy.vercel.app");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("@/assets/images/bg2.jpg")}
        style={styles.background}
        blurRadius={5}
      />

      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
        ]}
      >
        <TipOfTheDay style={styles.tipContainer} />

        <Animated.View
          entering={FadeInDown.delay(200).duration(700)}
          style={styles.card}
        >
          <Text style={styles.title}>About the App</Text>
          <Text style={styles.text}>
            This app helps farmers identify common potato diseases using AI and
            image recognition. Users can take or upload a picture of a potato
            plant and get instant predictions.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.subtitle}>Features</Text>
          <View style={styles.featureItem}>
            <View style={styles.bullet} />
            <Text style={styles.featureText}>AI-powered disease detection</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.bullet} />
            <Text style={styles.featureText}>
              Comprehensive disease library
            </Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.bullet} />
            <Text style={styles.featureText}>Daily farming tips</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.bullet} />
            <Text style={styles.featureText}>
              Bookmark important information
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.subtitle}>Contact Us</Text>
          <TouchableOpacity onPress={openEmail} style={styles.contactButton}>
            <Text style={styles.contactButtonText}>
              Email: troylegacy@example.com
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openWebsite} style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Visit our website</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.copyright}>
            © 2024 TroyLegacy. All rights reserved.
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    width,
    height,
  },
  contentContainer: {
    padding: 20,
  },
  tipContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    marginBottom: 16,
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 12,
    color: "#333",
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    lineHeight: 24,
    color: "#555",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginRight: 10,
  },
  featureText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#555",
  },
  contactButton: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  contactButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#007AFF",
    textAlign: "center",
  },
  version: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#888",
    textAlign: "center",
  },
  copyright: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#888",
    textAlign: "center",
    marginTop: 4,
  },
});
