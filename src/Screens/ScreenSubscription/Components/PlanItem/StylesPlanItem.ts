import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../../utils/Dimensions';
import colors from "../../../../utils/Theme";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Fonts } from "../../../../utils/Fonts";

export const styles = StyleSheet.create({
  planButton: {
    padding: hp('3%'), 
    marginVertical: hp('1.5%'),  
    backgroundColor: colors.SkyBlue,
    color: colors.HeadingColor,
    borderRadius: wp('2.5%'), 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: hp('0.5%')},
    shadowRadius: wp('2%'),
    width: wp('90%'),
    alignSelf: 'center',
  },
  selectedPlanButton: {
    backgroundColor: colors.DarkBlue,
    color: colors.White,
  },
  planName: {
    fontSize: wp('5.5%'),
    fontWeight: '600',
    color: colors.HeadingColor,
  },
  planPrice: {
    fontFamily:Fonts.PoppinsRegular,
    fontSize: wp('5%'),
    // fontWeight: 'bold',

    color: colors.HeadingColor,
    marginVertical: hp('1%'), 
  },
  planContent: {
    marginTop: hp('1.5%'),
  },
  planDetail: {
    fontFamily:Fonts.PoppinsRegular,
    fontSize: wp('4.5%'), 
    color: colors.HeadingColor,
    marginVertical: hp('0.5%'),  
  },
});
