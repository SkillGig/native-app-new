import React, {useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import images from '../../assets/images';
import {ThemeContext} from '../../src/context/ThemeContext';
import {NotificationSkeleton} from '../../components/SkeletonLoader';

// Helper function to get notification icon based on type
const getNotificationIcon = type => {
  switch (type) {
    case 'badge':
      return images.COURSEREADING;
    case 'lesson':
      return images.COURSEVIDEO;
    case 'achievement':
      return images.FEMALEAVATAR;
    default:
      return images.NOTIFICATION;
  }
};

const NotificationsPanel = ({
  notificationData,
  isInitialLoading,
  isLoadingMore,
  onLoadMore,
  handleHeaderItemsCollapse,
}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);

  const renderNotificationItem = ({item}) => {
    // Handle both old format (for backwards compatibility) and new API format
    const title = item.title;
    const text = item.body || item.text;
    const icon = item.leftIcon || getNotificationIcon(item.type);
    const isUnread = item.seen === false;

    return (
      <>
        <TouchableOpacity style={[styles.notificationItem]}>
          <View style={styles.notificationLeft}>
            <Image source={icon} style={styles.leftIcon} />
            <View style={styles.notificationText}>
              <Text
                style={[
                  fstyles.semiTwelwe,
                  {color: isUnread ? '#B095E3' : 'rgba(229, 220, 246, 0.40)'},
                ]}>
                {title}
              </Text>
              <Text style={[fstyles.regularSixteen, {color: '#F6F3FC'}]}>
                {text}
              </Text>
            </View>
          </View>
          <Image
            source={images.NOTIFICATIONRIGHTARROW}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
        <View style={styles.divider} />
      </>
    );
  };

  const renderFooter = () => {
    if (isLoadingMore) {
      return (
        <View style={styles.loadingMore}>
          <ActivityIndicator size="small" color="#B095E3" />
        </View>
      );
    }
    return null;
  };

  // Alternative scroll handler for better pagination detection
  const handleScroll = event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;

    if (isCloseToBottom && !isLoadingMore && onLoadMore) {
      console.log('🔄 Scroll-based pagination triggered');
      onLoadMore();
    }
  };

  const handleEndReached = () => {
    if (!isLoadingMore && onLoadMore) {
      onLoadMore();
    } else {
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text
        style={[
          fstyles.regularSixteen,
          {color: 'rgba(229, 220, 246, 0.60)', textAlign: 'center'},
        ]}>
        No notifications yet
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[fstyles.heavyTwentyFour, {color: '#B095E3'}]}>
          Notifications
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => handleHeaderItemsCollapse()}>
            <Image
              source={images.CLOSEICON}
              style={{
                height: 24,
                width: 24,
                marginTop: normalizeHeight(8),
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isInitialLoading ? (
        <View>
          {Array.from({length: 5}).map((_, index) => (
            <NotificationSkeleton key={index} />
          ))}
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={notificationData}
          keyExtractor={(item, index) =>
            item.notificationId ? item.notificationId.toString() : `_${index}`
          }
          renderItem={renderNotificationItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyState}
          removeClippedSubviews={false}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
          getItemLayout={null}
          legacyImplementation={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 20,
  },
  titleContainer: {
    marginTop: normalizeHeight(28),
    marginBottom: normalizeHeight(24),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalizeHeight(12),
    paddingHorizontal: normalizeWidth(8),
    paddingVertical: normalizeHeight(8),
    borderRadius: 8,
  },
  unreadNotificationItem: {
    backgroundColor: 'rgba(176, 149, 227, 0.1)',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
  },
  notificationText: {
    marginLeft: normalizeWidth(18),
    flex: 0.9,
  },
  rightIcon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
  },
  divider: {
    height: normalizeHeight(1),
    width: '100%',
    backgroundColor: 'rgba(176, 149, 227, 0.40)',
    marginTop: normalizeHeight(12),
  },
  loadingMore: {
    padding: normalizeHeight(16),
    alignItems: 'center',
  },
  emptyState: {
    padding: normalizeHeight(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationsPanel;
