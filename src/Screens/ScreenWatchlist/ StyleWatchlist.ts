import { StyleSheet } from 'react-native';
import colors from '../../utils/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utils/Dimensions';
import { Fonts } from '../../utils/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.IconCardColor,
    padding: wp('4.5%'), 
  },
  header: {
    fontFamily:Fonts.PoppinsBold,
    fontSize: wp('7%'), 
    // fontWeight: 'bold',
    color: colors.HeadingColor,
    marginBottom: hp('3%'), 
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.White,
    borderRadius: wp('3%'), 
    padding: wp('3%'), 
    marginBottom: hp('2%'), 
    elevation: 4,
    shadowColor: colors.HeadingColor,
    shadowOffset: { width: 0, height: hp('1%') },
    shadowOpacity: 0.15, 
    shadowRadius: wp('1.5%'), 
  },
  thumbnail: {
    width: wp('30%'), 
    height: hp('15%'), 
    borderRadius: wp('3%'), 
    marginRight: wp('4%'), 
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily:Fonts.PoppinsBold,
    fontSize: wp('5%'), 
    // fontWeight: '500',
    color: colors.HeadingColor,
    marginBottom: hp('0.5%'), 
  },
  removeButton: {
    fontFamily:Fonts.PoppinsRegular,
    fontSize: wp('4.5%'), 
    color: colors.DarkBlue,
    marginTop: hp('1%'), 
  },
  emptyMessage: {
    fontFamily:Fonts.PoppinsRegular,
    fontSize: wp('5%'), 
    color: colors.HeadingColor,
    textAlign: 'center',
    marginTop: hp('30%'), 
  },
  
  removeButtonContainer: {
    marginTop: hp('2%'),
    backgroundColor: colors.DarkBlue,
    paddingVertical: hp('0.8%'), 
    paddingHorizontal: wp('2%'), 
    marginLeft:wp('16%'),
    borderRadius: wp('10%'),
    alignItems: 'center',
    width: wp('30%'), 
  },
  
  removeButtonText: {
    fontFamily:Fonts.PoppinsRegular,
    fontSize: wp('4%'),
    color: colors.White,
  },
  
});

export default styles;
