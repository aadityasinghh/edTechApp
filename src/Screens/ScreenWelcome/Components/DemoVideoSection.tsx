import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import MediaPlayer from '../../ScreenVideoPlayer/Component/ComponentMediaPlayer';
import { styles } from './DmeoStyles';

const DemoVideoSection = () => {
  const [videoVisible, setVideoVisible] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const handleVideoPress = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setVideoVisible(true);
  };

  const handleFullScreenToggle = (fullScreen: boolean) => {
    setIsFullScreen(fullScreen);
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.videoCardContainer}>
       
        <TouchableOpacity
          style={styles.videoCard}
          onPress={() => handleVideoPress('https://www.w3schools.com/html/mov_bbb.mp4')}
        >
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
            }}
            style={styles.DemoThumbnail}
          />
          <Text style={styles.videoButtonText}>Watch Introduction to edTech</Text>
        </TouchableOpacity>
       
       
        <TouchableOpacity
          style={styles.videoCard}
          onPress={() => handleVideoPress('https://www.w3schools.com/html/mov_bbb.mp4')}
        >
          <Image
            source={{ uri: 'https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp' }}
            style={styles.DemoThumbnail}
          />
          <Text style={styles.videoButtonText}>Discover Our Learning Modules</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={videoVisible} transparent={false} animationType="slide">
        <View style={[styles.modalContainer, { flex: 1 }]}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setVideoVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {selectedVideo && (
              <View style={styles.mediaPlayerContainer}> 
                <MediaPlayer
                  videoUri={selectedVideo}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DemoVideoSection;
