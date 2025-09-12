import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../assets/images';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import {getFontStyles} from '../styles/FontStyles';
import {ThemeContext} from '../src/context/ThemeContext';
import {useContext} from 'react';

const ModuleDetail = ({item}) => {
  const [expanded, setExpanded] = useState(false);
  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => setExpanded(!expanded)}>
      <LinearGradient
        colors={['#090215', '#1C0743']}
        locations={[0, 0.7]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[fstyles.boldSixteen, {color: '#D3C4EF'}]}>
            {item.title}
          </Text>
          <Text
            style={[fstyles.semiTwelwe, {color: 'rgba(238, 231, 249, 0.60)'}]}>
            {item.sectionCount} Sections
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.sectionsContainer}>
          {[0, 1, 2].map(sectionIndex => (
            <View key={`section_${sectionIndex}`}>
              <View style={styles.sectionHeader}>
                <Text style={[fstyles.semiTwelwe, styles.sectionText]}>
                  Section {sectionIndex + 1}
                </Text>
                <Image
                  source={images.HEADERBACKICON}
                  style={[
                    styles.sectionIcon,
                    {transform: [{rotate: expanded ? '90deg' : '-90deg'}]},
                  ]}
                />
              </View>
              <Text style={fstyles.boldTwelwe}>{item.info}</Text>
              {expanded && (
                <View style={styles.expandedBox}>
                  <FlatList
                    data={item.points}
                    keyExtractor={(p, idx) => idx.toString()}
                    scrollEnabled={false}
                    renderItem={({item: point, index}) => (
                      <View style={styles.pointRow} key={index}>
                        <View style={styles.leftSection}>
                          <View style={styles.dot} />
                          {index !== item.points.length - 1 && (
                            <View style={styles.verticalLine} />
                          )}
                        </View>
                        <View style={styles.rightSection}>
                          <Text
                            style={[
                              fstyles.mediumTen,
                              {color: '#EDEDED', letterSpacing: 0.5},
                            ]}>
                            {point}
                          </Text>
                        </View>
                        <View
                          style={[
                            fstyles.flexAlign,
                            {marginRight: normalizeWidth(12)},
                          ]}>
                          <Image
                            source={images.CHAPTERVIDEO}
                            style={{
                              height: normalizeHeight(12),
                              width: normalizeWidth(12),
                              resizeMode: 'contain',
                            }}
                          />
                          <Text
                            style={[
                              fstyles.semiTwelwe,
                              {color: '#B095E3', marginLeft: normalizeWidth(4)},
                            ]}>
                            | 33 mins
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                  <View style={fstyles.flexAlign}>
                    <Image
                      source={images.STOPWATCH}
                      style={{
                        height: normalizeHeight(12),
                        width: normalizeWidth(12),
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={[
                        fstyles.semiTwelwe,
                        {color: '#B095E3', marginLeft: normalizeWidth(4)},
                      ]}>
                      {item.duration}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ModuleDetail;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(211, 196, 239, 0.2)',
    paddingHorizontal: normalizeWidth(16),
    paddingTop: normalizeHeight(12),
    paddingBottom: normalizeHeight(16),
    marginHorizontal: normalizeWidth(16),
    marginVertical: normalizeHeight(8),
  },
  separator: {
    height: normalizeHeight(1),
    backgroundColor: 'rgba(129, 95, 196, 0.30)',
    width: '100%',
    marginVertical: normalizeHeight(8),
  },
  sectionsContainer: {
    // Container for all sections
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalizeHeight(8),
    marginBottom: normalizeHeight(4),
  },
  sectionText: {
    color: 'rgba(238, 231, 249, 0.60)',
    letterSpacing: 0.5,
  },
  sectionIcon: {
    height: normalizeHeight(16),
    width: normalizeWidth(16),
    resizeMode: 'contain',
    tintColor: '#B095E3',
  },
  expandedBox: {
    backgroundColor: 'rgba(176, 149, 227, 0.13)',
    borderRadius: 20,
    marginTop: normalizeHeight(8),
    paddingVertical: normalizeHeight(12),
    paddingHorizontal: normalizeWidth(8),
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  leftSection: {
    width: 20,
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(229, 220, 246, 0.40)',
    zIndex: 1,
  },
  verticalLine: {
    position: 'absolute',
    top: 8,
    width: 1,
    height: '160%',
    backgroundColor: 'rgba(229, 220, 246, 0.40)',
  },
  rightSection: {
    flex: 1,
    paddingLeft: normalizeWidth(12),
  },
});
