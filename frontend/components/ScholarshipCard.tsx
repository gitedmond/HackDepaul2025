import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Scholarship } from '@/data/scholarships';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  return (
    <ThemedView style={styles.card}>
      <ThemedText type="subtitle" style={styles.name}>{scholarship.name}</ThemedText>
      <ThemedText style={styles.organization}>{scholarship.organization}</ThemedText>
      <ThemedView style={styles.detailRow}>
        <ThemedText type="defaultSemiBold">Amount:</ThemedText>
        <ThemedText> {scholarship.amount}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.detailRow}>
        <ThemedText type="defaultSemiBold">Deadline:</ThemedText>
        <ThemedText> {scholarship.deadline}</ThemedText>
      </ThemedView>
      <ThemedText style={styles.description}>{scholarship.description}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd', // Example border color
    // Add lightBackgroundColor and darkBackgroundColor if ThemedView supports it
    // or use platform-specific color selection if needed.
    // For now, relying on ThemedView's default behavior.
  },
  name: {
    marginBottom: 4,
  },
  organization: {
    marginBottom: 8,
    fontStyle: 'italic',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
    backgroundColor: 'transparent', // Ensure inner ThemedView doesn't obscure outer
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
});
