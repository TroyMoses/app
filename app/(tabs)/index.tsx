import React, { useState } from "react";
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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import axios from "axios";

const { height, width } = Dimensions.get("window");

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === "dark";
  const [image, setImage] = useState<string | null>(null);
  const [label, setLabel] = useState("");
  const [result, setResult] = useState("");

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#000" : "#FFF",
  };

  const clearOutput = () => {
    setImage(null);
    setLabel("");
    setResult("");
  };

  const getPrediction = async (params: any) => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("file", params);

      const url = Constants?.expoConfig?.extra?.API_URL;
      if (!url) {
        Alert.alert("API_URL not found in app config");
        return;
      }

      const response = await axios.post(url, bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.class) {
        setLabel(response.data.class);
        setResult(response.data.confidence);
      } else {
        setLabel("Failed to predict");
      }
    } catch (error) {
      console.error(error);
      setLabel("Failed to predict.");
    }
  };

  const handleImageResult = async (pickerResult: any) => {
    if (pickerResult.canceled) return;
    const asset = pickerResult.assets[0];
    setImage(asset.uri);
    setLabel("Predicting...");
    setResult("");

    const file = {
      uri: asset.uri,
      name: asset.fileName ?? "image.jpg",
      type: asset.type ?? "image/jpeg",
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

  return (
    <View style={[styles.outer, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ImageBackground
        source={require("@/assets/images/bg2.jpg")}
        style={styles.background}
        blurRadius={10}
      />
      <Text style={styles.title}>Potato Disease{"\n"}Prediction App</Text>

      <TouchableOpacity onPress={clearOutput} style={styles.clearStyle}>
        <Image
          source={require("@/assets/images/clean.png")}
          style={styles.clearImage}
        />
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.imageStyle} />}

      {result && label ? (
        <View style={styles.mainOuter}>
          <Text style={[styles.space, styles.labelText]}>
            Label:{"\n"}
            <Text style={styles.resultText}>{label}</Text>
          </Text>
          <Text style={[styles.space, styles.labelText]}>
            Confidence:{"\n"}
            <Text style={styles.resultText}>
              {parseFloat(result).toFixed(2)}%
            </Text>
          </Text>
        </View>
      ) : image ? (
        <Text style={styles.emptyText}>{label}</Text>
      ) : (
        <Text style={styles.emptyText}>
          Use the buttons below to capture or select a picture of a potato plant leaf.
        </Text>
      )}

      <View style={styles.btn}>
        <TouchableOpacity style={styles.btnStyle} onPress={openCamera}>
          <Image
            source={require("@/assets/images/camera.png")}
            style={styles.imageIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={openGallery}>
          <Image
            source={require("@/assets/images/gallery.png")}
            style={styles.imageIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    width,
    height,
  },
  title: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
    marginTop: 20,
  },
  clearStyle: {
    position: "absolute",
    top: 100,
    right: 30,
    zIndex: 10,
  },
  clearImage: {
    height: 40,
    width: 40,
    tintColor: "#FFF",
  },
  imageStyle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 20,
    borderColor: "#FFF",
    borderWidth: 0.3,
    position: "absolute",
    top: height / 4.5,
  },
  mainOuter: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: height / 1.6,
    alignSelf: "center",
  },
  labelText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  emptyText: {
    position: "absolute",
    top: height / 1.6,
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  btn: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
  },
  btnStyle: {
    backgroundColor: "#FFF",
    opacity: 0.8,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
  },
  imageIcon: {
    height: 60,
    width: 60,
    tintColor: "#000",
  },
  space: {
    marginHorizontal: 10,
  },
});
