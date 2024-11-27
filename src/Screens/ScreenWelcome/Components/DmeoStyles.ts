import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../utils/Dimensions';
import colors from '../../../utils/Theme';
import { Fonts } from '../../../utils/Fonts';

export const styles = StyleSheet.create({

    videoCardContainer: {
      padding: wp('4%'),
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    videoCard: {
      width: wp('90%'), 
      borderRadius: 10,
      backgroundColor: colors.White,
      alignItems: 'center',
      padding: wp('2%'),
      marginVertical: hp('2%'),
    },
    DemoThumbnail: {
      width: '90%', 
      height: hp('20%'),
      borderRadius: 10,
    },
    videoButtonText: {
      marginTop: hp('1%'),
      fontSize: wp('4%'),
      color: colors.TextColor,
      textAlign: 'center',
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButton: {
      alignSelf: 'flex-end',
      marginTop: hp('20%'),
      marginRight: wp('4%'),
      backgroundColor: colors.Primary,
      padding: wp('3%'),
      borderRadius: 10,
    },
    closeButtonText: {
      fontFamily:Fonts.PoppinsRegular,
      color: colors.White,
      fontSize: wp('4%'),
      textAlign: 'center',
    },
    mediaPlayerContainer: {
      marginTop: hp('40%'),
      borderWidth: 4,
      height: hp('100%'),
      width: wp('100%'),
      marginBottom: hp('2%'),
      overflow: 'hidden',
    },
  });
  

