import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MediaPlayer from './Component/ComponentMediaPlayer';
import { downloadVideo } from '../utils/storage/storageFunctions';
import { DownloadButton } from '../../Assets/constants';
import styles from './StyleVideoPlayer';
import { VideosScreenProps } from '../../utils/interfaces/types';
import { downloadPdf } from '../utils/storage/pdfDownloadFucntion';
import NavbarComponent from '../../CommonComponents/NavbarComponent';
import { db } from '../../utils/storage/db';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const VideoPlayer: React.FC<VideosScreenProps> = ({ navigation, route }) => {
  const { videoUri, title, contentId, thumbnailUrl, description } = route.params;
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false); 

  useEffect(() => {
    const checkIfInWatchlist = async () => {
      const currentUser = auth().currentUser;
      const googleUser = GoogleSignin.getCurrentUser();

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
          'SELECT * FROM watchlist WHERE contentId = ? AND user_id = (SELECT id FROM users WHERE uid = ?)',
          [contentId, userId],
          (txn, results) => {
            if (results.rows.length > 0) {
              setIsInWatchlist(true);
            }
          },
          error => {
            console.error('Error checking watchlist: ', error);
          }
        );
      });
    };

    checkIfInWatchlist();
  }, [contentId]);


  const handleDownloadPdf = async () => {
    await downloadPdf();
  };

  const handleAddToWatchlist = async () => {
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
              `INSERT OR IGNORE INTO watchlist (user_id, contentId, title, thumbnailUrl, description, videoUri) VALUES (?, ?, ?, ?, ?, ?)`,
              [dbUserId, contentId, title, thumbnailUrl, description, videoUri],
              () => {
                setIsInWatchlist(true); 
                Alert.alert('Success', 'Video added to watchlist.');
              },
              error => {
                console.error('Error adding video to watchlist: ', error);
                Alert.alert('Error', 'Failed to add video to watchlist.');
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
  return (
    <View style={styles.container}>
      <NavbarComponent />
      <View style={styles.mediaPlayerContainer}>
        <MediaPlayer videoUri={videoUri} canDownload={true}
          contentId={contentId}  
          title={title}
          thumbnailUrl={thumbnailUrl} />
      </View>
      <View style={styles.detailsContainer}>

        <View style={styles.downloadContainer}>
          <LinearGradient
            colors={['#C72FF8', '#6177EE', '#6177EE']}
            start={{ x: 0.9, y: -0.3 }}
            style={styles.downloadButton}
          >
            <TouchableOpacity onPress={handleDownloadPdf}>
              <View style={styles.buttonContent}>
                <Image source={DownloadButton} style={styles.downloadIcon} />
                <Text style={styles.downloadText}>PDF</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#C72FF8', '#6177EE', '#6177EE']}
            start={{ x: 0.9, y: -0.3 }}
            style={styles.watchlistButton}
          >
            <TouchableOpacity onPress={handleAddToWatchlist} disabled={isInWatchlist}>
              <Text style={styles.downloadText}>
                {isInWatchlist ? 'Already in Watchlist' : 'Add to Watchlist'}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <Text style={styles.descriptionTitle}>About Course</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  );
};

export default VideoPlayer;
