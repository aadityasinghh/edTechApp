import RNFetchBlob from 'rn-fetch-blob';
import {Alert, DeviceEventEmitter} from 'react-native';

const STORAGE_DIR = `${RNFetchBlob.fs.dirs.CacheDir}/MyAppVideos`;

export const checkAvailableStorage = async (
  requiredSpaceMB: number,
): Promise<boolean> => {
  try {
    const stat = await RNFetchBlob.fs.df();

    console.log('Disk space information:', stat);
    const availableSpaceBytes = parseInt(stat.internal_free, 10);
    if (isNaN(availableSpaceBytes)) {
      Alert.alert('Error', 'Unable to retrieve storage information.');
      return false;
    }

    const availableSpaceMB = availableSpaceBytes / (1024 * 1024);
    return availableSpaceMB >= requiredSpaceMB;
  } catch (error) {
    console.error('Failed to check storage:', error);
    Alert.alert('Error', 'Failed to check available storage.');
    return false;
  }
};
export const downloadVideo = async (
  contentId: number,
  videoUrl: string,
  title: string,
  thumbnailUrl: string,
  onDownloadComplete: () => void,
  onDownloadFailed: () => void,
): Promise<void> => {
  const videoPath = `${STORAGE_DIR}/${contentId}.mp4`;

  try {
    const existingData = await fetchDownloadedVideos();
    const videoAlreadyDownloaded = existingData.some(
      video => video.contentId === contentId,
    );
    if (videoAlreadyDownloaded) {
      Alert.alert('Info', 'This video has already been downloaded.');
      onDownloadFailed();
      return;
    }

    const hasEnoughSpace = await checkAvailableStorage(2);
    if (!hasEnoughSpace) {
      Alert.alert('Error', 'Not enough storage available.');
      return;
    }
    RNFetchBlob.config({
      path: videoPath,
    })
      .fetch('GET', videoUrl)
      .progress({interval: 100}, (received, total) => {
        const progress = Math.floor((received / total) * 100);
        DeviceEventEmitter.emit('DownloadProgress', progress);
      })
      .then(() => {
        saveDownloadMetadata(contentId, title, thumbnailUrl, videoPath);
        onDownloadComplete();
      })
      .catch(() => {
        Alert.alert('Error', 'Failed to download video.');
      });
  } catch (error) {
    Alert.alert('Error', 'Failed to download video.');
  }
};

const saveDownloadMetadata = async (
  contentId: number,
  title: string,
  thumbnailUrl: string,
  videoPath: string,
) => {
  const metadata = {contentId, title, thumbnailUrl, videoPath};
  const existingData = await fetchDownloadedVideos();
  existingData.push(metadata);
  await RNFetchBlob.fs.writeFile(
    `${STORAGE_DIR}/metadata.json`,
    JSON.stringify(existingData),
    'utf8',
  );
};

export const fetchDownloadedVideos = async (): Promise<any[]> => {
  const filePath = `${STORAGE_DIR}/metadata.json`;
  const exists = await RNFetchBlob.fs.exists(filePath);
  if (exists) {
    const data = await RNFetchBlob.fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  }
  return [];
};

export const deleteVideo = async (contentId: string): Promise<void> => {
  const videoPath = `${STORAGE_DIR}/${contentId}.mp4`;
  const metadataPath = `${STORAGE_DIR}/metadata.json`;

  try {
    await RNFetchBlob.fs.unlink(videoPath);

    const existingData = await fetchDownloadedVideos();
    const updatedData = existingData.filter(
      item => item.contentId !== contentId,
    );
    await RNFetchBlob.fs.writeFile(
      metadataPath,
      JSON.stringify(updatedData),
      'utf8',
    );

    Alert.alert('Success', 'Video deleted successfully.');
  } catch (error) {
    Alert.alert('Error', 'Failed to delete video.');
  }
};
