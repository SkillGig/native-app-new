import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { height } = Dimensions.get('window');

const TABBAR_HEIGHT = 50;
const HEADER_HEIGHT = 300; // Your content above tab bar

const data = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

const YourScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState('Modules');
  const flatListRef = useRef(null);

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      {['Modules', 'Resources', 'Notes'].map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          style={styles.tabItem}
        >
          <Text style={{ color: activeTab === tab ? 'purple' : 'black' }}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderContent = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>This is some header content</Text>
    </View>
  );

  const renderFlatList = () => (
    <FlatList
      ref={flatListRef}
      data={data}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item}</Text>
        </View>
      )}
      contentContainerStyle={{ paddingTop: TABBAR_HEIGHT }}
      scrollEventThrottle={16}
    />
  );

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      stickyHeaderIndices={[1]} // index 1 is the tab bar
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
    >
      {renderContent()}
      {renderTabBar()}
      <View style={{ height: height }}>{renderFlatList()}</View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    color: '#333',
  },
  tabBar: {
    height: TABBAR_HEIGHT,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    height: 60,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    paddingLeft: 16,
  },
});

export default YourScreen;
