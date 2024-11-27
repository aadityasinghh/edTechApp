import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Animated, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { fetchDataRequest } from '../Redux/Slices/HomeSlice';
import { cardsData } from '../Utils/Constants';
import { styles } from './StylsCardCourse';
import NetInfo from '@react-native-community/netinfo';
import CardCourse from './ComponentCardCourseList';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import OfflineAlertBottomSheet from '../../../CommonComponents/OfflineAlertBottomSheet';
import { AppStackParamList } from '../../../utils/interfaces/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = StackNavigationProp<AppStackParamList>;

const CombinedCardList: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const { data: fetchedData, loading } = useSelector((state: RootState) => state.home);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [showOfflineAlert, setShowOfflineAlert] = useState(false); 

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected !== null && !state.isConnected !== isOffline) {
        setIsOffline(!state.isConnected);
        setShowOfflineAlert(!state.isConnected); 
      }
    });

    return () => unsubscribe();
  }, [isOffline]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchDataRequest());
    if (isOffline) setShowOfflineAlert(true); 
    setRefreshing(false);
  };

  const handleNavigateToDownloads = () => {
    navigation.navigate('Downloads');
  };

  const isLoading = loading && !refreshing;

  return (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {!isLoading && !refreshing && showOfflineAlert && (
        <OfflineAlertBottomSheet
          isVisible={showOfflineAlert}
          onDismiss={() => setShowOfflineAlert(false)}
          onNavigateToDownloads={handleNavigateToDownloads}
        />
      )}
      {!isLoading && (
        <FlatList
          data={cardsData.map((item, index) => ({
            ...item,
            fetchedItems: fetchedData.slice(index * 5, index * 5 + 5),
          }))}
          renderItem={({ item }) => <CardCourse item={item} />}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          pagingEnabled
          snapToAlignment="center"
          decelerationRate="fast"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0000ff']}
            />
          }
        />
      )}
      <ExpandingDot
        data={cardsData.map((item, index) => ({
          ...item,
          fetchedItems: fetchedData.slice(index * 5, index * 5 + 5),
        }))}
        scrollX={scrollX}
        inActiveDotOpacity={0.6}
        dotStyle={styles.dotStyle}
        containerStyle={styles.dotContainer}
        activeDotColor="#6177EE"
        inActiveDotColor="white"
      />
    </View>
  );
};

export default CombinedCardList;