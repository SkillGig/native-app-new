import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Animated,
  Image, ImageBackground
} from 'react-native';

const AutoScrollCarousel = () => {
  const width = useMemo(() => Dimensions.get('window').width, []);
  const AUTO_SCROLL_INTERVAL = 4000;

  const data = [
    { id: '1', title: 'Card 1', color: '#FF6B6B' },
    { id: '2', title: 'Card 2', color: '#6BCB77' },
    { id: '3', title: 'Card 3', color: '#4D96FF' },
  ];

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const progressAnims = useRef(data.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    animateIndicator(currentIndex);

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const animateIndicator = (index) => {
    progressAnims.forEach((anim, i) => {
      anim.stopAnimation();
      anim.setValue(i < index ? 1 : 0); // completed ones filled, reset others
    });

    Animated.timing(progressAnims[index], {
      toValue: 1,
      duration: AUTO_SCROLL_INTERVAL,
      useNativeDriver: false,
    }).start();
  };

  const onScrollEnd = (e) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <View style={[styles.container, { width }]}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.color, width }]}>
            <Text style={styles.cardText}>{item.title}</Text>
          </View>
        )}
        onMomentumScrollEnd={onScrollEnd}
      />

      {/* Animated progress indicators */}
      <View style={styles.indicatorContainer}>
        {progressAnims.map((anim, i) => (
          <View key={i} style={styles.indicatorBackground}>
            <Animated.View
              style={[
                styles.indicatorFill,
                {
                  width: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 240,
  },
  card: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
    marginTop: 10,
  },
  indicatorBackground: {
    height: 4,
    width: 40,
    backgroundColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  indicatorFill: {
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});

export default AutoScrollCarousel;
