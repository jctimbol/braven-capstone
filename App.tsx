import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProjectDetailScreen from "./screens/ProjectDetailScreen";

const CREAM = "#FFFAF5";
const MINT = "#C7F6E8";
const LAVENDER = "#FFD4F9";
const YELLOW = "#FDD190";

const Stack = createNativeStackNavigator();

function ProgressDots({
  total,
  filled,
  label,
  dotColor,
}: {
  total: number;
  filled: number;
  label: string;
  dotColor: string;
}) {
  return (
    <View style={styles.progressRow}>
      <View style={styles.dotsContainer}>
        {Array.from({ length: total }).map((_, i) => (
          <React.Fragment key={i}>
            {i > 0 && <View style={styles.dotLine} />}
            <View
              style={[
                styles.dot,
                i < filled
                  ? { backgroundColor: dotColor }
                  : { borderWidth: 1.5, borderColor: dotColor, borderStyle: "dotted", backgroundColor: "transparent" },
              ]}
            />
          </React.Fragment>
        ))}
      </View>
      <Text style={styles.contributorLabel}>{label}</Text>
    </View>
  );
}

function ProjectCard({
  title,
  description,
  dotsTotal,
  dotsFilled,
  dotsLabel,
  dotColor,
  author,
  schedule,
  bgColor,
  onHelp,
}: {
  title: string;
  description: string;
  dotsTotal: number;
  dotsFilled: number;
  dotsLabel: string;
  dotColor: string;
  author?: string;
  schedule?: string;
  bgColor: string;
  onHelp?: () => void;
}) {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <ProgressDots total={dotsTotal} filled={dotsFilled} label={dotsLabel} dotColor={dotColor} />
      <View style={styles.cardDivider} />
      {author && (
        <View style={styles.cardFooter}>
          <Text style={styles.authorText}>{author} • {schedule}</Text>
          <TouchableOpacity onPress={onHelp}>
            <Text style={[styles.helpText, { color: dotColor, textShadowColor: dotColor }]}>help →</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function HomeScreen({ navigation }: any) {
  const navigateToDetail = (params: object) => {
    navigation.navigate("ProjectDetail", params);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>get involved with hacker dojo</Text>

        <View style={styles.tabs}>
          <Text style={styles.tabCurrent}>projects</Text>
          <Text style={styles.tabInactive}>people</Text>
          <Text style={styles.tabInactive}>events</Text>
        </View>
        <View style={styles.tabUnderline} />

        <Text style={styles.subtitle}>
          find a project to join or share your own!
        </Text>

        <Text style={styles.sectionLabel}>add to an active project</Text>

        <ProjectCard
          title="a not evil robot"
          description="looking for ai engineers, but open to anyone curious!"
          dotsTotal={4}
          dotsFilled={3}
          dotsLabel="5 contributors"
          dotColor="#60A590"
          author="@mario"
          schedule="sun & mon mornings"
          bgColor={MINT}
          onHelp={() => navigateToDetail({
            title: "a not evil robot",
            description: "looking for ai engineers, but open to anyone curious!",
            author: "@mario",
            schedule: "sun & mon mornings",
            bgColor: MINT,
            dotColor: "#60A590",
          })}
        />

        <ProjectCard
          title="an evil robot"
          description="working on computer vision; no experience required!"
          dotsTotal={3}
          dotsFilled={2}
          dotsLabel="3 contributors"
          dotColor="#AA5D9C"
          author="@amuel"
          schedule="tues & thurs evenings"
          bgColor={LAVENDER}
          onHelp={() => navigateToDetail({
            title: "an evil robot",
            description: "working on computer vision; no experience required!",
            author: "@amuel",
            schedule: "tues & thurs evenings",
            bgColor: LAVENDER,
            dotColor: "#AA5D9C",
          })}
        />

        <Text style={styles.sectionLabel}>pick up an inactive project</Text>

        <ProjectCard
          title="synthesizer from brain waves"
          description="i wanna make awesome beats with my brain (literally)"
          dotsTotal={2}
          dotsFilled={1}
          dotsLabel="last updated 3 weeks ago"
          dotColor="#C28427"
          bgColor={YELLOW}
          author="@jay"
          schedule="fri nights"
          onHelp={() => navigateToDetail({
            title: "synthesizer from brain waves",
            description: "i wanna make awesome beats with my brain (literally)",
            author: "@jay",
            schedule: "fri nights",
            bgColor: YELLOW,
            dotColor: "#C28427",
          })}
        />
      </ScrollView>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    MicrosoftSansSerif: require("./assets/fonts/micross.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    fontFamily: "MicrosoftSansSerif",
    fontSize: 26,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: -0.78,
    textShadowColor: "#111",
    textShadowOffset: { width: 0.8, height: 0 },
    textShadowRadius: 0.1,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 52,
    marginBottom: 28,
  },
  tabCurrent: {
    fontFamily: "Helvetica Neue",
    fontSize: 20,
    fontWeight: "300",
    color: "#BBBBBB",
    letterSpacing: -0.6,
  },
  tabInactive: {
    fontFamily: "Helvetica Neue",
    fontSize: 20,
    fontWeight: "300",
    color: "#111",
    letterSpacing: -0.6,
  },
  tabUnderline: {
    height: 1,
    backgroundColor: "#CCCCCC",
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: "Helvetica Neue",
    fontSize: 20,
    fontWeight: "300",
    color: "#AAAAAA",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: -0.6,
  },
  sectionLabel: {
    fontFamily: "Helvetica Neue",
    fontSize: 17,
    color: "#111",
    marginBottom: 10,
    letterSpacing: -0.51,
  },
  card: {
    borderRadius: 0,
    padding: 18,
    marginBottom: 14,
  },
  cardTitle: {
    fontFamily: "MicrosoftSansSerif",
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 6,
    letterSpacing: -0.6,
    textShadowColor: "#111",
    textShadowOffset: { width: 0.8, height: 0 },
    textShadowRadius: 0.1,
  },
  cardDescription: {
    fontFamily: "Helvetica Neue",
    fontSize: 14,
    color: "#333",
    marginBottom: 14,
    lineHeight: 20,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotLine: {
    width: 14,
    height: 1.5,
    backgroundColor: "#666",
  },
  contributorLabel: {
    fontFamily: "Helvetica Neue",
    fontSize: 13,
    color: "#666",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#00000022",
    marginHorizontal: 4,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorText: {
    fontFamily: "Helvetica Neue",
    fontSize: 13,
    color: "#666",
  },
  helpText: {
    fontFamily: "MicrosoftSansSerif",
    fontSize: 14,
    fontWeight: "bold",
    textShadowOffset: { width: 0.8, height: 0 },
    textShadowRadius: 0.1,
  },
});
