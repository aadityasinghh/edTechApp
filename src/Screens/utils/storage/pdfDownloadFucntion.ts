import RNFetchBlob from 'rn-fetch-blob';
import {Alert} from 'react-native';

const PDF_URL = 'https://bayes.wustl.edu/etj/articles/random.pdf';
const PDF_FILE_NAME = 'document.pdf';

export async function downloadPdf() {
  try {
    const {config, fs} = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    const filePath = `${downloads}/${PDF_FILE_NAME}`;

    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
        description: 'Downloading PDF document',
        mediaScannable: true,
      },
    })
      .fetch('GET', PDF_URL)
      .then(res => {
        Alert.alert('Success', 'PDF downloaded successfully.');
      })
      .catch(err => {
        console.warn(err);
        Alert.alert('Error', 'Failed to download PDF.');
      });
  } catch (err) {
    console.warn(err);
    Alert.alert('Error', 'Failed to download PDF.');
  }
}
