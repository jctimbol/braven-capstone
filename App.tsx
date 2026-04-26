import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CREAM = '#F5F0E8';
const MINT = '#B8EAC8';
const LAVENDER = '#E2B8E2';
const YELLOW = '#F5E090';

function ProgressDots({ total, filled, label }: { total: number; filled: number; label: string }) {
  return (
    <View style={styles.progressRow}>
      <View style={styles.dotsContainer}>
        {Array.from({ length: total }).map((_, i) => (
          <React.Fragment key={i}>
            {i > 0 && <View style={styles.dotLine} />}
            <View style={[styles.dot, i < filled ? styles.dotFilled : styles.dotEmpty]} />
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
  author,
  schedule,
  bgColor,
  inactive,
}: {
  title: string;
  description: string;
  dotsTotal: number;
  dotsFilled: number;
  dotsLabel: string;
  author?: string;
  schedule?: string;
  bgColor: string;
  inactive?: boolean;
}) {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <ProgressDots total={dotsTotal} filled={dotsFilled} label={dotsLabel} />
      {!inactive && author && (
        <View style={styles.cardFooter}>
          <Text style={styles.authorText}>{author} • {schedule}</Text>
          <TouchableOpacity>
            <Text style={styles.helpText}>help →</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function App() {
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

        <Text style={styles.subtitle}>find a project to join or share your own!</Text>

        <Text style={styles.sectionLabel}>add to an active project</Text>

        <ProjectCard
          title="a not evil robot"
          description="looking for ai engineers, but open to anyone curious!"
          dotsTotal={5}
          dotsFilled={3}
          dotsLabel="5 contributors"
          author="@mario"
          schedule="sun & mon mornings"
          bgColor={MINT}
        />

        <ProjectCard
          title="an evil robot"
          description="working on computer vision; no experience required!"
          dotsTotal={4}
          dotsFilled={2}
          dotsLabel="3 contributors"
          author="@amuel"
          schedule="tues & thurs evenings"
          bgColor={LAVENDER}
        />

        <Text style={styles.sectionLabel}>pick up an inactive project</Text>

        <ProjectCard
          title="synthesizer from brain waves"
          description="i wanna make awesome beats with my brain (literally)"
          dotsTotal={4}
          dotsFilled={1}
          dotsLabel="last updated 3 weeks ago"
          bgColor={YELLOW}
          inactive
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 40,
  },
  header: {
    fontFamily: 'Helvetica Neue',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 20,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 10,
  },
  tabCurrent: {
    fontFamily: 'Helvetica Neue',
    fontSize: 17,
    fontWeight: '400',
    color: '#BBBBBB',
  },
  tabInactive: {
    fontFamily: 'Helvetica Neue',
    fontSize: 17,
    fontWeight: '400',
    color: '#111',
  },
  tabUnderline: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    color: '#AAAAAA',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionLabel: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 10,
  },
  card: {
    borderRadius: 0,
    padding: 18,
    marginBottom: 14,
  },
  cardTitle: {
    fontFamily: 'Helvetica Neue',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  cardDescription: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    color: '#333',
    marginBottom: 14,
    lineHeight: 20,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotFilled: {
    backgroundColor: '#444',
  },
  dotEmpty: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#888',
  },
  dotLine: {
    width: 14,
    height: 1.5,
    backgroundColor: '#666',
  },
  contributorLabel: {
    fontFamily: 'Helvetica Neue',
    fontSize: 13,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorText: {
    fontFamily: 'Helvetica Neue',
    fontSize: 13,
    color: '#666',
  },
  helpText: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
});
