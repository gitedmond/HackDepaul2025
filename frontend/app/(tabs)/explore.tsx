import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list'; // Corrected import and added SwiperCardRefType

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { mockScholarships, Scholarship } from '@/data/scholarships';
import { ScholarshipCard } from '@/components/ScholarshipCard';

export default function TabTwoScreen() {
  const [savedScholarships, setSavedScholarships] = useState<Scholarship[]>([]);
  const [currentScholarships, setCurrentScholarships] = useState<Scholarship[]>(mockScholarships);
  const [swipedAll, setSwipedAll] = useState(false); // New state for swiped all
  const swiperRef = React.useRef<SwiperCardRefType>(null);

  const handleSwipeLeft = (cardIndex: number) => {
    // This cardIndex is from the currentScholarships array passed to Swiper
    const rejectedScholarship = currentScholarships[cardIndex];
    if (!rejectedScholarship) return;
    console.log('Swiped left (rejected):', rejectedScholarship.name);

    // Update currentScholarships by removing the swiped card
    // This is tricky if cardIndex is based on the *original* data prop length
    // and not the dynamically changing one. rn-swiper-list likely uses the index
    // from the data array it currently has.
    // A robust way is to remove based on ID.
    setCurrentScholarships(prev => prev.filter(s => s.id !== rejectedScholarship.id));
  };

  const handleSwipeRight = (cardIndex: number) => {
    const savedScholarship = currentScholarships[cardIndex];
    if (!savedScholarship) return;

    setSavedScholarships(prev => [...prev, savedScholarship]);
    console.log('Swiped right (saved):', savedScholarship.name);
    // The log below might show the state before the update due to async nature of setState
    // For accurate logging of the updated list, use a useEffect or log `[...prev, savedScholarship]`
    console.log('All saved scholarships (after this one):', [...savedScholarships, savedScholarship]);

    setCurrentScholarships(prev => prev.filter(s => s.id !== savedScholarship.id));
  };

  const handleSwipedAll = () => {
    console.log('All scholarships have been swiped.');
    setSwipedAll(true); // Set the flag when all are swiped
    // setCurrentScholarships([]); // Not needed if filtering in swipe handlers
  };

  const renderCard = (scholarship: Scholarship | undefined) => {
    if (!scholarship) {
      return null; // Or some placeholder if a card is still expected
    }
    return <ScholarshipCard scholarship={scholarship} />;
  };

  // This effect will update currentScholarships when a card is swiped,
  // assuming the Swiper component doesn't modify the data array directly
  // or if we want to ensure our state reflects the swiped items.
  // However, rn-swiper-list typically manages its internal index.
  // We only need to update `currentScholarships` if we want to filter out swiped items
  // from the `data` prop *before* they are rendered, or after all are swiped.
  // A simpler approach might be to just let the Swiper run through `mockScholarships`
  // and use onSwipedAll to then show the "No more scholarships" message.
  // The `onSwipeLeft` and `onSwipeRight` will still correctly identify the scholarship
  // based on the original `mockScholarships` array and its index.

  // Let's refine the logic for removing scholarships.
  // The `Swiper` component itself will iterate through the `data` prop.
  // We don't need to manually remove items from `currentScholarships` for the Swiper to advance.
  // We only need to react when all are swiped.

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore Scholarships</ThemedText>
      </ThemedView>

      {/* Check swipedAll flag and currentScholarships length */}
      {!swipedAll && currentScholarships.length > 0 ? (
        <>
          <ThemedText>Swipe left or right to discover scholarships.</ThemedText>
          <View style={styles.swiperContainer}>
            <Swiper
              ref={swiperRef}
              data={currentScholarships}
              renderCard={renderCard}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onSwipedAll={handleSwipedAll} // This will be called when the data array is exhausted
              cardStyle={styles.cardStyle}
            />
          </View>
        </>
      ) : (
        <ThemedText style={styles.noMoreScholarshipsText}>
          No more scholarships to show. Check your saved list!
        </ThemedText>
      )}

      {/* You can keep other sections if needed, or remove them */}
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 8, // Added padding
  },
  swiperContainer: {
    height: 500, // Adjust height as needed for the swiper
    marginVertical: 16,
  },
  cardStyle: {
    width: '90%', // Example: card takes 90% of the swiper width
    height: '90%', // Example: card takes 90% of the swiper height
    borderRadius: 15,
    // backgroundColor: 'lightblue', // Example, ScholarshipCard will handle its own background
  },
});
