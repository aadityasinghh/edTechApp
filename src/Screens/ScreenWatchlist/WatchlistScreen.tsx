import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './ StyleWatchlist';
import { db } from '../../utils/storage/db';
import { AppStackParamList, WatchlistScreenProps } from '../../utils/interfaces/types';
import NavbarComponent from '../../CommonComponents/NavbarComponent';
import { WatchlistItem } from './utils/types';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = StackNavigationProp<AppStackParamList>;

const WatchlistScreen: React.FC<WatchlistScreenProps> = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
  const fetchWatchlist = async () => {
    const currentUser = auth().currentUser;
    const googleUser = await GoogleSignin.getCurrentUser();
  
    if (!currentUser && !googleUser) {
      Alert.alert('Error', 'User is not logged in.');
      return;
    }
  
    const userId = currentUser?.uid || googleUser?.user?.id;
  
    if (!userId) {
      Alert.alert('Error', 'Could not retrieve user ID.');
      return;
    }
  
    db.transaction(txn => {
      txn.executeSql(
        'SELECT id FROM users WHERE uid = ?',
        [userId],
        (txn, results) => {
          if (results.rows.length > 0) {
            const dbUserId = results.rows.item(0).id;
            txn.executeSql(
              'SELECT * FROM watchlist WHERE user_id = ?',
              [dbUserId],
              (txn, results) => {
                const rows: WatchlistItem[] = [];
                for (let i = 0; i < results.rows.length; i++) {
                  const row = results.rows.item(i);
                  rows.push({
                    ...row,
                    contentId: Number(row.contentId),
                    videoUri: row.videoUri || '',
                    description: row.description || '',
                  });
                }
                setWatchlist(rows);
              },
              error => {
                console.error('Error fetching watchlist: ', error);
                Alert.alert('Error', 'Failed to fetch watchlist.');
              }
            );
          } else {
            Alert.alert('Error', 'User does not exist in the database.');
          }
        },
        error => {
          console.error('Error fetching user: ', error);
          Alert.alert('Error', 'Failed to verify user in the database.');
        }
      );
    });
  };
  
    fetchWatchlist();
  }, []);

  
  const handleRemoveFromWatchlist = async (contentId: number) => {
    const currentUser = auth().currentUser;
    const googleUser = await GoogleSignin.getCurrentUser();
  
    if (!currentUser && !googleUser) {
      Alert.alert('Error', 'User is not logged in.');
      return;
    }
  
    const userId = currentUser?.uid || googleUser?.user?.id;
  
    if (!userId) {
      Alert.alert('Error', 'Could not retrieve user ID.');
      return;
    }
  
    db.transaction(txn => {
      txn.executeSql(
        'SELECT id FROM users WHERE uid = ?',
        [userId],
        (txn, results) => {
          if (results.rows.length > 0) {
            const dbUserId = results.rows.item(0).id;
            txn.executeSql(
              'DELETE FROM watchlist WHERE user_id = ? AND contentId = ?',
              [dbUserId, contentId], 
              () => {
                Alert.alert('Success', 'Video removed from watchlist.');
                setWatchlist(prevWatchlist => prevWatchlist.filter(video => video.contentId !== contentId));
              },
              error => {
                console.error('Error removing video from watchlist: ', error);
                Alert.alert('Error', 'Failed to remove video from watchlist.');
              }
            );
          } else {
            Alert.alert('Error', 'User does not exist in the database.');
          }
        },
        error => {
          console.error('Error fetching user: ', error);
          Alert.alert('Error', 'Failed to verify user in the database.');
        }
      );
    });
  };
  
  
  
  const navigateToVideoScreen = (item: WatchlistItem) => {
    console.log('Navigating to Video Screen with videoUri:', item.videoUri);
    console.log('Navigating to Video Screen with description:', item.description);
    navigation.navigate('Video', {
      title: item.title,
      contentId: item.contentId,
      thumbnailUrl: item.thumbnailUrl,
      videoUri: item.videoUri,
      description: item.description,
    });
  };

  const renderItem = ({ item }: { item: WatchlistItem }) => (
    <TouchableOpacity onPress={() => navigateToVideoScreen(item)} style={styles.itemContainer}>
      <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleRemoveFromWatchlist(item.contentId)}>
          <LinearGradient
            colors={['#C72FF8', '#6177EE', '#6177EE']} 
            start={{x: 0.9, y: -0.3}}
            style={styles.removeButtonContainer}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {watchlist.length === 0 ? (
        <Text style={styles.emptyMessage}>Your watchlist is empty. Start adding some videos!</Text>
      ) : (
        <FlatList
          data={watchlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.contentId.toString()}
        />
      )}
      <NavbarComponent />
    </View>
  );
};

export default WatchlistScreen;
