import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  FetchedItemProps,
  ScreenVideoNavigationProp,
} from '../Utils/Types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../utils/Dimensions';
import {styles} from './StylsCardCourse';
import DurationIcon from '../../../Assets/ImagesData/Durationlogo';
import EyeIcon from '../../../Assets/ImagesData/EyeIcon';

const FetchedItem: React.FC<FetchedItemProps> = ({item}) => {
  const navigation = useNavigation<ScreenVideoNavigationProp>();

  const handlePress = () => {
    navigation.navigate('Video', {
      videoUri: item.videoUrl,
      title: item.title,
      contentId: item.id,
      thumbnailUrl: item.thumbnailUrl,
      description: item.description,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.fetchedDataContainer}>
        <Image source={{uri: item.thumbnailUrl}} style={styles.thumbnail} />
        <View style={styles.fetchedTextContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.durationContainer}>
            <DurationIcon width={wp('3.5%')} height={hp('2%')} />
            <Text style={styles.text}> {item.duration}</Text>
          </View>
          <View style={styles.viewsContainer}>
            <EyeIcon width={wp('5%')} height={hp('3%')} />
            <Text style={styles.text}> {item.views}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FetchedItem;
