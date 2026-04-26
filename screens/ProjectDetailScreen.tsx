import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Defs, Line, Marker, Path } from "react-native-svg";

const CREAM = "#FFFAF5";
const TEAL = "#60A590";
const GRAY_NODE = "#999";

// Double-ring circle node for the tree
function TreeNode({
  label,
  sublabel,
  color,
  size = 50,
}: {
  label: string;
  sublabel?: string;
  color: string;
  size?: number;
}) {
  const borderW = size * 0.11;
  const innerSize = size * 0.6;
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: borderW,
          borderColor: color,
          backgroundColor: CREAM,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
            backgroundColor: color,
          }}
        />
      </View>
      <Text style={[styles.nodeLabel, { color: "#888" }]}>{label}</Text>
      {sublabel && <Text style={styles.nodeSublabel}>{sublabel}</Text>}
    </View>
  );
}

function TreeArrows() {
  return (
    <Svg width={320} height={340} style={StyleSheet.absoluteFill}>
      <Defs>
        <Marker
          id="arrow"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <Path d="M0,0 L0,6 L6,3 z" fill="#AAAAAA" />
        </Marker>
      </Defs>
      {/* root → tim */}
      <Line x1="148" y1="80" x2="95" y2="155"
        stroke="#AAAAAA" strokeWidth="1.5" markerEnd="url(#arrow)" />
      {/* root → maya & trevor */}
      <Line x1="172" y1="80" x2="232" y2="155"
        stroke="#AAAAAA" strokeWidth="1.5" markerEnd="url(#arrow)" />
      {/* maya & trevor → mario bottom */}
      <Line x1="255" y1="215" x2="255" y2="284"
        stroke="#AAAAAA" strokeWidth="1.5" markerEnd="url(#arrow)" />
    </Svg>
  );
}

export default function ProjectDetailScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←back</Text>
        </TouchableOpacity>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>🤖</Text>
            </View>
            <View>
              <Text style={styles.profileName}>mario adomei</Text>
              <Text style={styles.profileSub}>started this project</Text>
            </View>
          </View>
          <Text style={styles.profileBody}>
            we are usually here on sunday and monday mornings in the main hall!
            i'm usually at the workbench by the window; come say hi! we'd love
            to have you.{"\n"}
            if you can't find me or want to work virtually, add me on discord:
            @mario
          </Text>
        </View>

        {/* History section */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>history of a not evil robot</Text>
          <Text style={styles.historySubtitle}>
            tap on the timeline to see more info
          </Text>
          <Text style={styles.startedOn}>started on april 1, 2026</Text>

          {/* Tree */}
          <View style={styles.treeContainer}>
            <TreeArrows />

            {/* Root: mario */}
            <View style={[styles.nodeWrapper, { left: 131, top: 20 }]}>
              <TreeNode label="mario" color={TEAL} />
            </View>

            {/* Left: tim (abandoned) */}
            <View style={[styles.nodeWrapper, { left: 41, top: 155 }]}>
              <TreeNode label="tim" sublabel="abandoned iteration" color={GRAY_NODE} />
            </View>

            {/* Right: maya & trevor */}
            <View style={[styles.nodeWrapper, { left: 226, top: 155 }]}>
              <TreeNode label="maya & trevor" color={TEAL} />
            </View>

            {/* Bottom: mario (recent) */}
            <View style={[styles.nodeWrapper, { left: 226, top: 285 }]}>
              <TreeNode label="mario" sublabel="recent iteration" color={TEAL} />
            </View>
          </View>

          <Text style={styles.callout}>
            the next contribution could be yours!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
  },
  backButton: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backText: {
    fontFamily: "Helvetica Neue",
    fontSize: 17,
    fontWeight: "300",
    color: "#333",
    letterSpacing: -0.51,
  },
  profileCard: {
    backgroundColor: "#C7F6E8",
    marginHorizontal: 20,
    padding: 18,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: TEAL,
    borderWidth: 3,
    borderColor: "#3A7A68",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmoji: {
    fontSize: 26,
  },
  profileName: {
    fontFamily: "MicrosoftSansSerif",
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
    letterSpacing: -0.54,
    textShadowColor: "#111",
    textShadowOffset: { width: 0.8, height: 0 },
    textShadowRadius: 0.1,
  },
  profileSub: {
    fontFamily: "Helvetica Neue",
    fontSize: 13,
    color: "#444",
    marginTop: 2,
  },
  profileBody: {
    fontFamily: "Helvetica Neue",
    fontSize: 14,
    color: "#222",
    lineHeight: 21,
  },
  historySection: {
    paddingHorizontal: 20,
    paddingTop: 28,
    alignItems: "center",
  },
  historyTitle: {
    fontFamily: "MicrosoftSansSerif",
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
    letterSpacing: -0.66,
    textShadowColor: "#111",
    textShadowOffset: { width: 0.8, height: 0 },
    textShadowRadius: 0.1,
    marginBottom: 6,
  },
  historySubtitle: {
    fontFamily: "Helvetica Neue",
    fontSize: 13,
    fontStyle: "italic",
    color: "#999",
    marginBottom: 16,
  },
  startedOn: {
    fontFamily: "Helvetica Neue",
    fontSize: 14,
    color: "#888",
    marginBottom: 12,
  },
  treeContainer: {
    width: 320,
    height: 400,
    position: "relative",
  },
  nodeWrapper: {
    position: "absolute",
  },
  nodeLabel: {
    fontFamily: "Helvetica Neue",
    fontSize: 12,
    textDecorationLine: "underline",
    marginTop: 4,
    textAlign: "center",
  },
  nodeSublabel: {
    fontFamily: "Helvetica Neue",
    fontSize: 13,
    color: "#333",
    marginTop: 2,
    textAlign: "center",
  },
  callout: {
    fontFamily: "Helvetica Neue",
    fontSize: 14,
    fontStyle: "italic",
    color: "#999",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 40,
  },
});
