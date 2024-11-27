
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utils/Dimensions';
import colors from '../../utils/Theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Fonts } from '../../utils/Fonts';


export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:colors.White,

  },
  scrollContainer: {
    flexGrow: 1,
  },
  WelcomeContainer: {
    flex: 1,
    paddingTop: hp('1%'),
    marginTop: hp('8%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: colors.White,
    justifyContent: 'center',
  },
  WelcomeTitle: {
    fontFamily:Fonts.PoppinsBold,
    fontSize: wp('6%'),
    marginBottom: hp('2%'),
    textAlign: 'center',
    // fontWeight: 'bold',
    color: colors.HeadingColor,
  },
  WelcomeText: {
    fontFamily:Fonts.PoppinsRegular,
    fontSize: wp('4.5%'),
    marginBottom: hp('2%'),
    textAlign: 'center',
    color: colors.HeadingColor,
  },
  subTitle: {
    fontFamily:Fonts.PoppinsRegular,
    fontSize: wp('5%'),
    marginBottom: hp('1%'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.HeadingColor,
  },
  subscribeButton: {
    borderRadius: wp('2%'),
    overflow: 'hidden',
    marginBottom: hp('3%'),
  },
  gradientButton: {
    padding: hp('2%'),
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontFamily:Fonts.PoppinsBold,
    color: colors.White,
    fontSize: wp('4%'),
    // fontWeight: 'bold',
  },
  videoCardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  videoCard: {
    padding: hp('2%'),
    borderRadius: wp('2%'),
    backgroundColor: colors.White,
    marginBottom: hp('2%'),
    alignItems: 'center',
    shadowColor: '#888',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: colors.SapratorColor,
    flexDirection: 'row',
    width: wp('90%'),
    height: hp('20%'),
  },
  videoButtonText: {
    fontFamily:Fonts.PoppinsRegular,
    fontSize: wp('4%'),
    color: colors.HeadingColor,
    marginLeft: wp('2.5%'),
    flex: 1,
    textAlign: 'center',
  },
  thumbnail: {
    width: wp('30%'),
    height: hp('12%'),
    borderRadius: wp('2%'),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    padding: hp('1.5%'),
    backgroundColor: colors.Primary,
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
  },
  closeButtonText: {
    fontFamily:Fonts.PoppinsRegular,
    color: colors.White,
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  video: {
    width: wp('90%'),
    height: hp('25%'),
  },
});
