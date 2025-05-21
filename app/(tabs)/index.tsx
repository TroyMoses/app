"use client";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { TipOfTheDay } from "@/components/TipOfTheDay";
import { IconSymbol } from "@/components/ui/IconSymbol";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
          styles.scrollContent,
          { paddingTop: insets.top, paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.duration(800)} style={styles.header}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Potato Disease Detection</Text>
          <Text style={styles.subtitle}>
            Identify potato plant diseases instantly with AI.
          </Text>
        </Animated.View>

        <TipOfTheDay style={styles.tipContainer} />

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Features</Text>

          <Animated.View entering={FadeInDown.delay(200).duration(500)}>
            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => router.push("/(tabs)/predict")}
            >
              <View style={styles.featureIconContainer}>
                <IconSymbol name="camera.fill" size={24} color="#FFF" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Disease Detection</Text>
                <Text style={styles.featureDescription}>
                  Take a photo of your potato plant and get instant disease
                  identification
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(500)}>
            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => router.push("/(tabs)/explore")}
            >
              <View
                style={[
                  styles.featureIconContainer,
                  { backgroundColor: "#4CAF50" },
                ]}
              >
                <IconSymbol name="leaf.fill" size={24} color="#FFF" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Disease Library</Text>
                <Text style={styles.featureDescription}>
                  Browse and learn about common potato diseases
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(500)}>
            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => router.push("/(tabs)/bookmarks")}
            >
              <View
                style={[
                  styles.featureIconContainer,
                  { backgroundColor: "#FF9800" },
                ]}
              >
                <IconSymbol name="bookmark.fill" size={24} color="#FFF" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Saved Diseases</Text>
                <Text style={styles.featureDescription}>
                  Access your bookmarked diseases for quick reference
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/(tabs)/predict")}
          >
            <Text style={styles.primaryButtonText}>Start Detection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/(tabs)/about")}
          >
            <Text style={styles.secondaryButtonText}>About the App</Text>
          </TouchableOpacity>
        </View>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#FFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#DDD",
    marginTop: 8,
    textAlign: "center",
  },
  tipContainer: {
    marginBottom: 24,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#FFF",
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
  actionButtonsContainer: {
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: "#FFF",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  secondaryButtonText: {
    color: "#FFF",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
});
