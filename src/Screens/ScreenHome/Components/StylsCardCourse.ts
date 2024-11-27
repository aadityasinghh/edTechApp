import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../utils/Dimensions';
import colors from '../../../utils/Theme';
import { Fonts } from '../../../utils/Fonts';

export const styles = StyleSheet.create({
  CardCoursecontainer: {
    marginTop: hp('1%'),
    backgroundColor: colors.White,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
    height: wp('173%'),
    marginHorizontal: wp('4.5%'),
    // marginBottom: hp('2.5%'),
    width: wp('90.5%'),
    padding: wp('3.75%'),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardCourseImage: {
    width: '100%',
    height: hp('20.75%'),
    borderRadius: 8,
  },
  CardCourseTitle: {
    fontFamily:Fonts.PoppinsBold,
    marginLeft: wp('1.25%'),
    marginTop: hp('1.25%'),
    fontSize: wp('5%'),
    // fontWeight: '700',
    color: colors.HeadingColor,
  },
  separator: {
    height: hp('0.25%'),
    backgroundColor: colors.SapratorColor,
    marginVertical: hp('1%'),
  },
  fetchedItemsList: {
    maxHeight: hp('55%'),
    paddingHorizontal: wp('1.25%'),

    marginBottom: hp('-2%'),
  },
  text: {
    fontFamily:Fonts.PoppinsRegular,
    fontSize: wp('3.75%'),
    color: colors.TextColor,
    marginBottom: hp('0.5%'),
  },
  thumbnail: {
    width: wp('43%'),
    height: hp('12.5%'),
    borderRadius: 8,
  },
  title: {
    fontFamily:Fonts.PoppinsBold,
    fontSize: wp('4%'),
    // fontWeight: 'bold',
    color: colors.HeadingColor,
    marginBottom: hp('1%'),
  },
  fetchedDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1.25%'),
  },
  fetchedTextContainer: {
    flex: 1,
    marginLeft: wp('1.25%'),
  },
  error: {
    fontFamily:Fonts.PoppinsRegular,
    color: colors.ErrorColor,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('0.75%'),
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('0.25%'),
  },
  dotStyle: {
    width: wp('1%'),
    height: hp('.7%'),
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor:'white'
  },
  dotContainer: {
    position: 'absolute',
    bottom: hp('4.5%'),
    alignSelf: 'center',
  },
});