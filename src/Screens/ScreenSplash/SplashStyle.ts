import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,

} from '../../utils/Dimensions'; 

import colors from '../../utils/Theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.White,
  },loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
