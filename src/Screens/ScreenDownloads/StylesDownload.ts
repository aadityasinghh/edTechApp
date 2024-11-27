import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utils/Dimensions';
import colors from '../../utils/Theme';
import { Fonts } from '../../utils/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.IconCardColor,
    paddingHorizontal: wp('4%'),
    paddingTop: hp('2%'),
  },
  noVideosText: {
    fontFamily:Fonts.PoppinsRegular,
    textAlign: 'center',
    marginTop: hp('30%'),
    fontSize: wp('5%'),
    color: colors.HeadingColor,
  },
  videoItem: {
    backgroundColor: colors.White,
    borderRadius: 8,
    marginBottom: hp('2%'),
    padding: wp('4%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  videoTitle: {
    fontFamily:Fonts.PoppinsBold,
    fontSize: wp('4.5%'),
    // fontWeight: '600',
    color: colors.TextColor,
    marginBottom: hp('1%'),
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: hp('1%'),
  },
  deleteButton: {
    fontFamily:Fonts.PoppinsBold,
    color: colors.Primary,
    fontSize: wp('4%'),
    // fontWeight: '600',
  },
});

export default styles;
