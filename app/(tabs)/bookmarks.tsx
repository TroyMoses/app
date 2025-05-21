import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Swipeable } from "react-native-gesture-handler";

import { useBookmarks } from "@/context/BookmarkContext";
import { diseases } from "@/constants/diseaseData";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { TipOfTheDay } from "@/components/TipOfTheDay";

const { width, height } = Dimensions.get("window");

export default function BookmarksScreen() {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const insets = useSafeAreaInsets();

  // Get the full disease objects for the bookmarked IDs
  const bookmarkedDiseases = diseases.filter((disease) =>
    bookmarks.includes(disease.id)
  );

  const renderRightActions = (diseaseId: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => {
          Alert.alert(
            "Remove Bookmark",
            "Are you sure you want to remove this bookmark?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Remove",
                onPress: () =>
                  toggleBookmark(diseases.find((d) => d.id === diseaseId)!),
                style: "destructive",
              },
            ]
          );
        }}
      >
        <IconSymbol name="trash.fill" size={24} color="#FFF" />
        <Text style={styles.actionText}>Remove</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: (typeof diseases)[0];
    index: number;
  }) => (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <TouchableOpacity style={styles.card}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.short}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("@/assets/images/bg2.jpg")}
        style={styles.background}
        blurRadius={5}
      />

      <Animated.View
        entering={FadeIn.duration(500)}
        style={[styles.header, { paddingTop: insets.top + 10 }]}
      >
        <Text style={styles.headerTitle}>Saved Diseases</Text>
        <TipOfTheDay style={styles.tipContainer} />
      </Animated.View>

      {bookmarkedDiseases.length === 0 ? (
        <View style={styles.emptyContainer}>
          <IconSymbol
            name="bookmark"
            size={60}
            color="rgba(255, 255, 255, 0.7)"
          />
          <Text style={styles.emptyText}>No bookmarks yet</Text>
          <Text style={styles.emptySubtext}>
            Save diseases for quick access by swiping left on a disease card in
            the Explore tab
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkedDiseases}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: insets.bottom + 20 },
          ]}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  header: {
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#333",
    marginBottom: 12,
  },
  tipContainer: {
    marginTop: 8,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
  deleteAction: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
  },
  actionText: {
    color: "#FFF",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#FFF",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    lineHeight: 24,
  },
});
