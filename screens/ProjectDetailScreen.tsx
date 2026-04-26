import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Modal,
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
  size = 40,
  onPress,
}: {
  label: string;
  sublabel?: string;
  color: string;
  size?: number;
  onPress?: () => void;
}) {
  const borderW = size * 0.11;
  const innerSize = size * 0.6;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.09,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Animated.View style={{ transform: [{ scale }] }}>
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
        </Animated.View>
      </TouchableOpacity>
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
      <Line
        x1="134"
        y1="65"
        x2="95"
        y2="110"
        stroke="#AAAAAA"
        strokeWidth="1.5"
        markerEnd="url(#arrow)"
      />
      {/* root → maya & trevor */}
      <Line
        x1="186"
        y1="65"
        x2="225"
        y2="110"
        stroke="#AAAAAA"
        strokeWidth="1.5"
        markerEnd="url(#arrow)"
      />
      {/* maya & trevor → mario bottom */}
      <Line
        x1="242"
        y1="190"
        x2="242"
        y2="250"
        stroke="#AAAAAA"
        strokeWidth="1.5"
        markerEnd="url(#arrow)"
      />
    </Svg>
  );
}

export default function ProjectDetailScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalNode, setModalNode] = useState<{
    label: string;
    sublabel?: string;
  } | null>(null);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(500)).current;

  const openModal = (node: { label: string; sublabel?: string }) => {
    setModalNode(node);
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslateY, {
        toValue: 500,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      setModalNode(null);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← back</Text>
        </TouchableOpacity>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Image
                source={require("../assets/mario.png")}
                style={styles.avatarImage}
              />
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
            <View style={[styles.nodeWrapper, { left: 140, top: 20 }]}>
              <TreeNode
                label="mario"
                color={TEAL}
                onPress={() => openModal({ label: "mario" })}
              />
            </View>

            {/* Left: tim (abandoned) */}
            <View style={[styles.nodeWrapper, { left: 20, top: 120 }]}>
              <TreeNode
                label="tim"
                sublabel="abandoned iteration"
                color={GRAY_NODE}
                onPress={() =>
                  openModal({ label: "tim", sublabel: "abandoned iteration" })
                }
              />
            </View>

            {/* Right: maya & trevor */}
            <View style={[styles.nodeWrapper, { left: 205, top: 120 }]}>
              <TreeNode
                label="maya & trevor"
                color={TEAL}
                onPress={() => openModal({ label: "maya & trevor" })}
              />
            </View>

            {/* Bottom: mario (recent) */}
            <View style={[styles.nodeWrapper, { left: 198, top: 265 }]}>
              <TreeNode
                label="mario"
                sublabel="recent iteration"
                color={TEAL}
                onPress={() =>
                  openModal({ label: "mario", sublabel: "recent iteration" })
                }
              />
            </View>
          </View>

          <Text style={styles.callout}>
            the next contribution could be yours!
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="none"
        transparent
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeModal}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(0,0,0,0.3)", opacity: overlayOpacity },
            ]}
          />
          <Animated.View
            style={[
              styles.modalSheet,
              { transform: [{ translateY: sheetTranslateY }] },
            ]}
          >
            {/* Header row */}
            <View style={styles.modalHeader}>
              <View style={styles.modalAvatar}>
                <Image
                  source={require("../assets/mario.png")}
                  style={styles.modalAvatarImage}
                />
              </View>
              <View>
                <Text style={styles.modalName}>mario adomei</Text>
                <Text style={styles.modalTimestamp}>2 days ago</Text>
              </View>
            </View>

            <Text style={styles.modalLabel}>update</Text>

            <Image
              source={require("../assets/robot.png")}
              style={styles.modalImage}
            />

            <Text style={styles.modalBody}>
              it can navigate through rough terrain now. great work team!
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
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
    marginHorizontal: 32,
    paddingHorizontal: 30,
    paddingVertical: 18,
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
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
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
    fontSize: 15,
    color: "#222",
    lineHeight: 19,
    letterSpacing: -0.3,
  },
  historySection: {
    paddingHorizontal: 20,
    paddingTop: 25,
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
    fontSize: 13,
    color: "#333",
    marginBottom: 0,
    textAlign: "center",
  },
  treeContainer: {
    width: 320,
    height: 360,
    marginTop: -10,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: CREAM,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 32,
    paddingTop: 36,
    paddingBottom: 48,
    minHeight: 360,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  modalAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: TEAL,
    overflow: "hidden",
  },
  modalAvatarImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  modalName: {
    fontFamily: "MicrosoftSansSerif",
    fontSize: 15,
    fontWeight: "bold",
    color: "#111",
    letterSpacing: -0.45,
    textShadowColor: "#111",
    textShadowOffset: { width: 0.8, height: 0 },
    textShadowRadius: 0.1,
  },
  modalTimestamp: {
    fontFamily: "Helvetica Neue",
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  modalLabel: {
    fontFamily: "MicrosoftSansSerif",
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
    letterSpacing: -0.66,
    textShadowColor: "#111",
    textShadowOffset: { width: 0.8, height: 0 },
    textShadowRadius: 0.1,
    marginBottom: 12,
  },
  modalImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
    marginBottom: 14,
  },
  modalBody: {
    fontFamily: "Helvetica Neue",
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    letterSpacing: -0.28,
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
