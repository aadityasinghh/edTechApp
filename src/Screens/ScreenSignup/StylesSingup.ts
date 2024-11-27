import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utils/Dimensions';
import colors from '../../utils/Theme';
import { Fonts } from '../../utils/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  Headingtext: {
    fontFamily:Fonts.PoppinsBold,
    // fontWeight: '400',
    fontSize: wp('11%'),
    color: colors.White,
    position: 'absolute',
    top: hp('12%'),
    left: wp('5%'),
  },
  SignupInput: {
    fontFamily:Fonts.PoppinsRegular,
    borderRadius: 12,
    borderWidth: 1.5,
    padding: hp('2%'),
    marginVertical: hp('1%'),
    width: wp('80%'),
    alignSelf: 'center',
    borderColor: colors.Primary,
    top: hp('17.5%'),
  },
  errorText: {
    fontFamily:Fonts.PoppinsRegular,
    color: colors.ErrorColor,
    top: hp('17%'),

    marginLeft: wp('7%'),
  },
  Signupbutton: {
    height: hp('7.5%'),
    borderRadius: wp('7%'),
    width: wp('80%'),
    alignSelf: 'center',
    top: hp('18.6%'),
    alignItems: 'center',
  },
  SignupbuttonText: {
    fontFamily:Fonts.PoppinsBold,
    color: colors.White,
    fontSize: wp('5.5%'),
    // fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: hp('8%'),
  },

  card: {
    backgroundColor: colors.White,
    borderRadius: wp('7.5%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp('0.5%')},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position: 'absolute',
    elevation: 5,
    height: hp('105%'),
    width: wp('100%'),
    alignSelf: 'center',
    padding: wp('5%'),
  },
  Iconcard: {
    backgroundColor: colors.IconCardColor,
    shadowOffset: {width: 0, height: hp('0.5%')},
    shadowOpacity: 0.25,
    elevation: 1,
    height: hp('7%'),
    width: wp('90%'),
    borderRadius: wp('2.5%'),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    top: hp('23%'),
  },
  StyleIcon: {
    width: wp('1.5%'),
    right: wp('100%'),
    position:'absolute',
    bottom:hp('60%')
   
  },
});
