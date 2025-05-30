import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';

interface CardData {
  id: number;
  text: string;
}

const cardData: CardData[] = [
  { id: 1, text: 'Card 1: Welcome!' },
  { id: 2, text: 'Card 2: This is a Deck Swiper' },
  { id: 3, text: 'Card 3: Swipe left or right' },
  { id: 4, text: 'Card 4: Or up and down!' },
  { id: 5, text: 'Card 5: Enjoy the experience' },
  { id: 6, text: 'Card 6: React Native is cool' },
  { id: 7, text: 'Card 7: Swiping is fun' },
];

const DeckSwiper: React.FC = () => {
  return (
    <View style={styles.container}>
      <Swiper
        cards={cardData}
        renderCard={(card: CardData | undefined) => {
          if (!card) {
            return (
              <View style={styles.card}>
                <Text style={styles.text}>No more cards</Text>
              </View>
            );
          }
          return (
            <View style={styles.card}>
              <Text style={styles.text}>{card.text}</Text>
            </View>
          );
        }}
        onSwipedLeft={(cardIndex: number) => {
          console.log('Swiped LEFT', cardData[cardIndex]?.text);
        }}
        onSwipedRight={(cardIndex: number) => {
          console.log('Swiped RIGHT', cardData[cardIndex]?.text);
        }}
        onSwipedTop={(cardIndex: number) => {
          console.log('Swiped TOP', cardData[cardIndex]?.text);
        }}
        onSwipedBottom={(cardIndex: number) => {
          console.log('Swiped BOTTOM', cardData[cardIndex]?.text);
        }}
        onSwipedAll={() => {
          console.log('onSwipedAll');
        }}
        cardIndex={0}
        backgroundColor={'#f0f0f0'}
        stackSize={3}
        stackSeparation={15}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: '60%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
  },
});

export default DeckSwiper;
