import { Text, StyleSheet, ScrollView } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About the App</Text>
      <Text style={styles.text}>
        This app helps farmers identify common potato diseases using AI and
        image recognition. Users can take or upload a picture of a potato plant
        and get instant predictions.
      </Text>
      <Text style={styles.text}>Developed by: TroyLegacy</Text>
      <Text style={styles.text}>Contact: troylegacy@example.com</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 8,
  },
});
