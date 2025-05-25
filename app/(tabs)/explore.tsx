"use client";

import { useState, useRef, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  TextInput,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Swipeable } from "react-native-gesture-handler";

import { diseases, type Disease } from "@/constants/diseaseData";
import { TipOfTheDay } from "@/components/TipOfTheDay";
import { useBookmarks } from "@/context/BookmarkContext";
import { IconSymbol } from "@/components/ui/IconSymbol";

const { width, height } = Dimensions.get("window");

export default function ExploreScreen() {
  const [selected, setSelected] = useState<Disease | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  // Filter diseases based on search query
  const filteredDiseases = diseases.filter(
    (disease) =>
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.short.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (text: string) => {
    setIsLoading(true);
    // Simulate search delay
    setTimeout(() => {
      setSearchQuery(text);
      setIsLoading(false);
    }, 300);
  };

  const renderRightActions = useCallback(
    (disease: Disease) => {
      return (
        <View style={styles.swipeActions}>
          <TouchableOpacity
            style={styles.bookmarkAction}
            onPress={() => toggleBookmark(disease)}
          >
            <IconSymbol name="bookmark.fill" size={24} color="#FFF" />
            <Text style={styles.actionText}>
              {isBookmarked(disease.id) ? "Saved" : "Save"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailsAction}
            onPress={() => setSelected(disease)}
          >
            <IconSymbol name="info.circle.fill" size={24} color="#FFF" />
            <Text style={styles.actionText}>Details</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [toggleBookmark, isBookmarked]
  );

  const renderItem = ({ item, index }: { item: Disease; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <Swipeable
        ref={(ref) => {
          swipeableRefs.current[item.id] = ref;
        }}
        renderRightActions={() => renderRightActions(item)}
        onSwipeableOpen={() => {
          Object.keys(swipeableRefs.current).forEach((key) => {
            if (key !== item.id && swipeableRefs.current[key]) {
              swipeableRefs.current[key]?.close();
            }
          });
        }}
      >
        <View style={styles.card}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.cardContent}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{item.name}</Text>
              {isBookmarked(item.id) && (
                <IconSymbol name="bookmark.fill" size={20} color="#007AFF" />
              )}
            </View>
            <Text style={styles.short}>{item.short}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setSelected(item)}
            >
              <Text style={styles.buttonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
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
        <Text style={styles.headerTitle}>Potato Diseases</Text>
        <View style={styles.searchContainer}>
          <IconSymbol
            name="magnifyingglass"
            size={20}
            color="#777"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search diseases..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            >
              <IconSymbol name="xmark.circle.fill" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      <TipOfTheDay style={styles.tipContainer} />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : filteredDiseases.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No diseases found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredDiseases}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: insets.bottom + 20 },
          ]}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal
        visible={!!selected}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelected(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selected && (
              <>
                <Image source={selected.image} style={styles.modalImage} />
                <ScrollView style={styles.modalScroll}>
                  <Text style={styles.modalTitle}>{selected.name}</Text>
                  <Text style={styles.modalText}>{selected.full}</Text>
                </ScrollView>
                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.closeButton]}
                    onPress={() => setSelected(null)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.bookmarkButton]}
                    onPress={() => {
                      if (selected) toggleBookmark(selected);
                    }}
                  >
                    <IconSymbol
                      name={
                        isBookmarked(selected.id) ? "bookmark.fill" : "bookmark"
                      }
                      size={20}
                      color="#FFF"
                    />
                    <Text style={styles.bookmarkButtonText}>
                      {isBookmarked(selected.id) ? "Saved" : "Save"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 4,
  },
  tipContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  list: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#FFF",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#333",
  },
  short: {
    marginBottom: 12,
    color: "#555",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  swipeActions: {
    flexDirection: "row",
    width: 160,
    height: "100%",
  },
  bookmarkAction: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  detailsAction: {
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  actionText: {
    color: "#FFF",
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    width: "100%",
    maxHeight: height * 0.8,
    overflow: "hidden",
  },
  modalImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  modalScroll: {
    maxHeight: 300,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    marginBottom: 16,
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    lineHeight: 24,
    color: "#555",
  },
  modalFooter: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  modalButton: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  closeButton: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#EEE",
  },
  closeButtonText: {
    color: "#555",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  bookmarkButton: {
    flex: 1,
    backgroundColor: "#007AFF",
  },
  bookmarkButtonText: {
    color: "#FFF",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    marginLeft: 8,
  },
});
