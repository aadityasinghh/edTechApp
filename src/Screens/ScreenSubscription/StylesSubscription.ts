import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utils/Dimensions';
import { Fonts } from '../../utils/Fonts';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollViewContent: {
    marginTop: hp('5%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  subscriptionContainer: {
    flex: 1,
    paddingVertical: hp('3%'),
  },
  title: {
    fontFamily:Fonts.PoppinsRegular,
    fontSize: wp('7%'),
    // fontWeight: 'bold',
    color: '#6177EE',
    marginBottom: hp('3%'),
    textAlign: 'center',
    letterSpacing: wp('0.3%'),
  },
});
