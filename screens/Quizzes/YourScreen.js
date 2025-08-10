import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Video from 'react-native-video';

const YourScreen = () => {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
       source={{ uri: 'https://lms-courses-uploads.s3.ap-south-1.amazonaws.com/development/4/5/59/videos/Nextjs_Full_stack_course.m3u8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAWIJIUODFNDW4SLSP%2F20250806%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250806T145713Z&X-Amz-Expires=10000&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCmFwLXNvdXRoLTEiSDBGAiEAzsmxXwBpCrummokG81hBYA8XlDk3GQx2gcKYxEdLk%2FYCIQCZRKIGmLN9WO0xadtPuFnccP%2BgqCqgPI2oYoaAdBL24Cq%2FBQh3EAAaDDQzMDExODgyNjE4NiIM%2F5Ks%2B0nkKzSvJicYKpwFVjB7Vy1c464nbsiB9TbHVH4ixR9OfxRyQqgDponUBVycBJWI7PsmMMPNxYjZAi2AZTA%2FYrWQKH1HUuqtpK%2BSlZheFlzB0RtIg7oNew0yUf4JhopN4Jz9bcfcVTE0m7YmKVEpFmvHUWkEx9S1mplnmRAw9%2FH9uH1K31sJCKX42Hmysj2Dbu1ISu5U5PZ%2BGp6qUIDk80Kl4cvdMEBVWjLyKNq3Z4HR2IWmYjYfXvuTlxggVHhGlooFN1wmVMeqXFTTvKrQWs%2BVn9tzGGwS%2Bhg3pkZuoq5GivGn80SqDDnFkS%2B1dKIHKn7TGFdAH8i351Y%2B44%2FpoL2tIzcWvhol1BXw9lxFvEXRQOR7N1zPBx4m64nXJ4DPPAPMUDOnYcdEJ%2BbuSHW%2Fm0uz4g3AiVsHpv5AXeK2muK1%2FItFn4EtQCAEY3jqLJyE6CnGO%2FmIQCTwHc7Zo3it4yqaQpdKxWKquWVbMH1Vwz%2Bb3MLb4z2kBft0ET4kSPDBOKETjBD9CeHURMecUF74SzpA7vwKs79PFHMy%2BEQXFZAQJHxLBF80J%2B1K9OSldCI7SZTjC3H0DBk98IkOToceOx2r1gjqWt8jklBIZ6ZAGuShd7jWUz6hbnkorpuVMl9WdWYP8yFKFlKL2Uc2wCBOTbOQNj41DYz3ZjPistbKQhClq1cDqD7k0Kd0Z%2FUDBqZ%2FLfIb%2Bf%2B21gcayHQu%2FAg33h74aERiaa2CtyBZdiAY6O4mYi8hYDx3jJ7lO%2B1oBuQK3nZVZJGMetAO1gmKjyIVOM0Irr%2FjIB8oz7EP9%2FyYKxWc%2BeBDbe9CatkGYHV5Iv3ktrATG%2FZl4oHWKfLYkxFkG8u57ofb7xtvTfpBY4tka38vkTuRFCDGFW8jOIm5errsCAKSPf7UGaMwir7NxAY6sAFEDkaURfx4mRjXukcz14ojd2%2F2vwTvUEhUJmUbKarysA65InT3tuXmhA%2F2WSud3dlW6AAOe4Jqvlhrc3hoX%2FPao5uGoOX4J4nmbSQ5OhXV9iWvO2DLsZNiDzJsCYbCFiUq68NZ7OmaL2NL21GFFPABN1Ae%2BaXv5bgiOJTA4jtXz8mfKyo6aCYj2vbc%2BE7K%2F8qd9%2Bd80ys%2BL3xMdMGk0OvHJ3Vkx2uG3BDabYk3p8bsxg%3D%3D&X-Amz-Signature=b74677c0f04324892a1bdbab94dface1e673820b5d73ab7609313e804c7ba624&X-Amz-SignedHeaders=host' }}
        style={styles.video}
        controls
        resizeMode="contain"
        onLoad={(data) => setDuration(data.duration)}
        onProgress={(data) => setCurrentTime(data.currentTime)}
      />
      <Text style={styles.text}>
        Played: {currentTime.toFixed(2)}s / {duration.toFixed(2)}s
      </Text>
    </View>
  );
};

export default YourScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  video: {
    width: '100%',
    height: 300,
  },
  text: {
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
});
