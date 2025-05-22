"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
  Dimensions,
  StatusBar,
  useColorScheme,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  Directions,
} from "react-native-gesture-handler";
import axios from "axios";

import { TipOfTheDay } from "@/components/TipOfTheDay";
import { IconSymbol } from "@/components/ui/IconSymbol";

const { height, width } = Dimensions.get("window");

export default function PredictScreen() {
  const isDarkMode = useColorScheme() === "dark";
  const [image, setImage] = useState<string | null>(null);
  const [label, setLabel] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentImages, setRecentImages] = useState<string[]>([]);
  const insets = useSafeAreaInsets();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#000" : "#FFF",
  };

  useEffect(() => {
    // Add the current image to recent images if it exists and is not already in the list
    if (image && !recentImages.includes(image)) {
      setRecentImages((prev) => [image, ...prev].slice(0, 5));
    }
  }, [image, recentImages]);

  const clearOutput = () => {
    setImage(null);
    setLabel("");
    setResult("");
  };

  const getPrediction = async (params: {
    uri: string;
    name: string;
    type: string;
  }) => {
    try {
      setIsLoading(true);
      const bodyFormData = new FormData();
      bodyFormData.append("file", {
        uri: params.uri,
        name: params.name,
        type: params.type,
      } as any);

      const url = Constants?.expoConfig?.extra?.API_URL;
      if (!url) {
        Alert.alert("API_URL not found in app config");
        setIsLoading(false);
        return;
      }

      // Simulate API call with a delay
      setTimeout(() => {
        // Mock response based on the image
        const mockResponses = {
          "early-blight": { class: "Early Blight", confidence: "92.5" },
          "late-blight": { class: "Late Blight", confidence: "89.7" },
          "leaf-roll": { class: "Leaf Roll", confidence: "95.2" },
          septoria: { class: "Septoria Leaf Spot", confidence: "87.3" },
          psyllid: { class: "Psyllid", confidence: "91.8" },
          default: { class: "Healthy", confidence: "96.3" },
        };

        // Determine which mock response to use based on the image URI
        let responseData = mockResponses.default;
        for (const key of Object.keys(mockResponses)) {
          if (params.uri.includes(key)) {
            responseData = mockResponses[key as keyof typeof mockResponses];
            break;
          }
        }

        setLabel(responseData.class);
        setResult(responseData.confidence);
        setIsLoading(false);
      }, 1500);

      // Uncomment for actual API call
      const response = await axios.post(url, bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.class) {
        setLabel(response.data.class);
        setResult(response.data.confidence);
      } else {
        setLabel("Failed to predict");
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setLabel("Failed to predict.");
      setIsLoading(false);
    }
  };

  const handleImageResult = async (pickerResult: any) => {
    if (pickerResult.canceled) return;
    const asset = pickerResult.assets[0];
    setImage(asset.uri);
    setLabel("Predicting...");
    setResult("");

    const extension = asset.uri.split(".").pop()?.toLowerCase();
    const mimeMap: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
    };

    const type = mimeMap[extension ?? ""] ?? "image/jpeg";

    const file = {
      uri: asset.uri,
      name: asset.fileName ?? "image.jpg",
      type,
    };
    await getPrediction(file);
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Camera access is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
      quality: 1,
    });
    await handleImageResult(result);
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Media Library access is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      quality: 1,
    });
    await handleImageResult(result);
  };

  const selectRecentImage = (uri: string) => {
    setImage(uri);
    setLabel("Predicting...");
    setResult("");

    const extension = uri.split(".").pop()?.toLowerCase();
    const mimeMap: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
    };

    const type = mimeMap[extension ?? ""] ?? "image/jpeg";

    const file = {
      uri,
      name: "image.jpg",
      type,
    };
    getPrediction(file);
  };

  // Swipe gesture to clear the current image
  const swipeGesture = Gesture.Fling()
    .direction(Directions.LEFT | Directions.RIGHT)
    .onEnd(() => {
      if (image) {
        clearOutput();
      }
    });

  return (
    <View style={[styles.outer, backgroundStyle]}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("@/assets/images/bg2.jpg")}
        style={styles.background}
        blurRadius={10}
      />

      <Animated.View
        entering={FadeIn.duration(500)}
        style={[styles.header, { paddingTop: insets.top + 10 }]}
      >
        <Text style={styles.title}>Potato Disease Detection</Text>
        <TipOfTheDay style={styles.tipContainer} />
      </Animated.View>

      <TouchableOpacity onPress={clearOutput} style={styles.clearStyle}>
        <IconSymbol name="trash.fill" size={24} color="#FFF" />
      </TouchableOpacity>

      <GestureDetector gesture={swipeGesture}>
        <View style={styles.imageContainer}>
          {image ? (
            <Animated.Image
              entering={FadeIn.duration(300)}
              source={{ uri: image }}
              style={styles.imageStyle}
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <IconSymbol
                name="camera.fill"
                size={40}
                color="rgba(255, 255, 255, 0.5)"
              />
              <Text style={styles.placeholderText}>
                Take or select a photo to analyze
              </Text>
            </View>
          )}
        </View>
      </GestureDetector>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.loadingText}>Analyzing image...</Text>
        </View>
      ) : result && label ? (
        <Animated.View
          entering={FadeInUp.duration(500)}
          style={styles.resultContainer}
        >
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Analysis Results</Text>
            <View style={styles.resultRow}>
              <Text style={styles.labelText}>Disease:</Text>
              <Text style={styles.resultValue}>{label}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.labelText}>Confidence:</Text>
              <Text style={styles.resultValue}>
                {Number.parseFloat(result).toFixed(1)}%
              </Text>
            </View>
            <View style={styles.confidenceMeter}>
              <View
                style={[
                  styles.confidenceFill,
                  { width: `${Math.min(Number.parseFloat(result), 100)}%` },
                ]}
              />
            </View>
          </View>
        </Animated.View>
      ) : image ? (
        <Text style={styles.emptyText}>{label}</Text>
      ) : (
        <Text style={styles.emptyText}>
          Swipe left or right on an image to clear it.
        </Text>
      )}

      {recentImages.length > 0 && !image && (
        <Animated.View
          entering={FadeInUp.delay(200).duration(500)}
          style={styles.recentContainer}
        >
          <Text style={styles.recentTitle}>Recent Images</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentScroll}
          >
            {recentImages.map((uri, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentImageContainer}
                onPress={() => selectRecentImage(uri)}
              >
                <Image source={{ uri }} style={styles.recentImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}

      <Animated.View
        entering={FadeInUp.delay(300).duration(500)}
        style={styles.btn}
      >
        <TouchableOpacity style={styles.btnStyle} onPress={openCamera}>
          <IconSymbol name="camera.fill" size={30} color="#333" />
          <Text style={styles.btnText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={openGallery}>
          <IconSymbol name="photo.fill" size={30} color="#333" />
          <Text style={styles.btnText}>Gallery</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  background: {
    position: "absolute",
    width,
    height,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    color: "#FFF",
  },
  tipContainer: {
    marginTop: 8,
  },
  clearStyle: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    padding: 8,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  imageStyle: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    borderColor: "#FFF",
    borderWidth: 2,
  },
  placeholderContainer: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 2,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  placeholderText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loadingText: {
    color: "#FFF",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    marginTop: 12,
  },
  resultContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  resultCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  labelText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#555",
  },
  resultValue: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#007AFF",
  },
  confidenceMeter: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginTop: 8,
    overflow: "hidden",
  },
  confidenceFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  emptyText: {
    marginTop: 20,
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    paddingHorizontal: 20,
  },
  recentContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  recentTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#FFF",
    marginBottom: 8,
  },
  recentScroll: {
    paddingBottom: 8,
  },
  recentImageContainer: {
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  recentImage: {
    width: 80,
    height: 80,
  },
  btn: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  btnStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    width: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  btnText: {
    marginTop: 8,
    color: "#333",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
});
