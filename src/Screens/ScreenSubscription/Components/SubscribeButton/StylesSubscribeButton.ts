
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../../utils/Dimensions';
import colors from "../../../../utils/Theme";
import { Fonts } from "../../../../utils/Fonts";
export const localStyles = StyleSheet.create({
  subscribeButton: {
    borderRadius: wp('6%'),
    overflow: 'hidden',
    marginTop: hp('3%'),
    alignItems: 'center',
    width: wp('90%'),
    alignSelf: 'center',
  },
  gradientButton: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    width: '100%',
  },
  subscribeButtonText: {
    fontFamily:Fonts.PoppinsRegular,
    color: colors.White,
    fontSize: wp('4.5%'), 
    // fontWeight: '600',
  },
});
