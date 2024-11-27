import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions, PixelRatio } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utils/Theme';
import { widthPercentageToDP, heightPercentageToDP } from '../utils/Dimensions'; 
import { Fonts } from '../utils/Fonts';

interface OfflineAlertAlertProps {
  isVisible: boolean;
  onDismiss: () => void;
  onNavigateToDownloads?: () => void;
}

const OfflineAlertAlert: React.FC<OfflineAlertAlertProps> = ({ isVisible, onDismiss, onNavigateToDownloads }) => {
  const refRBSheet = useRef<RBSheet>(null);

  useEffect(() => {
    if (isVisible) {
      refRBSheet.current?.open();
    } else {
      refRBSheet.current?.close();
    }
  }, [isVisible]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.5)" />
      <RBSheet
        ref={refRBSheet}
        height={heightPercentageToDP('40%')} 
        draggable={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: colors.IconCardColor,
          },
          draggableIcon: {
            backgroundColor: colors.Primary,
          },
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>No Internet Connection</Text>
          <Text style={styles.message}>You are currently offline. Please check your internet connection.</Text>
          
          <LinearGradient
            colors={['#C72FF8', '#6177EE', '#6177EE']}
            start={{ x: 0.9, y: -0.3 }}
            style={styles.button}
          >
            <TouchableOpacity onPress={onNavigateToDownloads} style={styles.buttonContent}>
              <Text style={styles.buttonText}>Go to Downloads</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['#C72FF8', '#6177EE', '#6177EE']}
            start={{ x: 0.9, y: -0.3 }}
            style={styles.button}
          >
            <TouchableOpacity onPress={onDismiss} style={styles.buttonContent}>
              <Text style={styles.buttonText}>Dismiss</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: widthPercentageToDP('4%'), 
  },
  title: {
    fontFamily:Fonts.PoppinsBold,
    fontSize: widthPercentageToDP('5%'), 
    color: colors.HeadingColor,
    marginBottom: heightPercentageToDP('2%'), 
  },
  message: {
    fontFamily:Fonts.PoppinsRegular,
    fontSize: widthPercentageToDP('4.2%'), 
    color: colors.TextColor,
    marginBottom: heightPercentageToDP('4%'), 
  },
  button: {
    borderRadius: 10,
    paddingVertical: heightPercentageToDP('2%'), 
    paddingHorizontal: widthPercentageToDP('5%'), 
    marginVertical: heightPercentageToDP('0.5%'), 
    width: widthPercentageToDP('80%'), 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    height:heightPercentageToDP('6%'), 
  },
  buttonContent: {
    width: widthPercentageToDP('80%'), 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily:Fonts.PoppinsBold,
    color: colors.White,
    fontSize: widthPercentageToDP('3.7%'), 
  
  },
});

export default OfflineAlertAlert;
