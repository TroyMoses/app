"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Disease } from "@/constants/diseaseData";

type BookmarkContextType = {
  bookmarks: string[];
  toggleBookmark: (disease: Disease) => void;
  isBookmarked: (id: string) => boolean;
};

const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
});

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Load bookmarks from AsyncStorage on mount
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem("bookmarks");
        if (storedBookmarks) {
          setBookmarks(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error("Failed to load bookmarks:", error);
      }
    };

    loadBookmarks();
  }, []);

  // Save bookmarks to AsyncStorage whenever they change
  useEffect(() => {
    const saveBookmarks = async () => {
      try {
        await AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      } catch (error) {
        console.error("Failed to save bookmarks:", error);
      }
    };

    saveBookmarks();
  }, [bookmarks]);

  const toggleBookmark = (disease: Disease) => {
    setBookmarks((prev) => {
      if (prev.includes(disease.id)) {
        return prev.filter((id) => id !== disease.id);
      } else {
        return [...prev, disease.id];
      }
    });
  };

  const isBookmarked = (id: string) => {
    return bookmarks.includes(id);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
