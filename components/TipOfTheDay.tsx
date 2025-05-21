"use client";

import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { tipsOfTheDay } from "@/constants/diseaseData";
import { IconSymbol } from "@/components/ui/IconSymbol";

type TipOfTheDayProps = {
  style?: object;
};

export function TipOfTheDay({ style }: TipOfTheDayProps) {
  const [tip, setTip] = useState("");
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    // Get a random tip on component mount
    const randomIndex = Math.floor(Math.random() * tipsOfTheDay.length);
    setTipIndex(randomIndex);
    setTip(tipsOfTheDay[randomIndex]);
  }, []);

  const getNextTip = () => {
    const nextIndex = (tipIndex + 1) % tipsOfTheDay.length;
    setTipIndex(nextIndex);
    setTip(tipsOfTheDay[nextIndex]);
  };

  return (
    <Animated.View
      entering={FadeIn.duration(800)}
      style={[styles.container, style]}
    >
      <View style={styles.iconContainer}>
        <IconSymbol name="lightbulb.fill" size={20} color="#FFF" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Tip of the Day</Text>
        <Text style={styles.tipText}>{tip}</Text>
      </View>
      <TouchableOpacity style={styles.refreshButton} onPress={getNextTip}>
        <IconSymbol name="arrow.clockwise" size={16} color="#FFF" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 122, 255, 0.8)",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#FFF",
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#FFF",
    lineHeight: 20,
  },
  refreshButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});
