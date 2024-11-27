import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import { styles } from './StyleLanding';
import { LandingScreenProps } from '../../utils/interfaces/types';
import LinearGradient from 'react-native-linear-gradient';

const ScreenLanding: React.FC<LandingScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Image source={require('../../Assets/Images/LandingImage.png')} style={styles.LandingImage} />
      <View style={styles.card}>
        <Text style={styles.Headertitle}>Welcome to </Text>
        <Text style={styles.BrandHeader}>EDUTECH</Text>
        <Text style={styles.infotext}>
        Edutech is a cutting-edge online education platform designed to empower learners with the tools they need to succeed in today's digital world.</Text>
        <LinearGradient
          colors={['#C72FF8', '#6177EE', '#6177EE']}
          start={{x: 0.9, y: -0.3}}
          style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.gradientButton}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default ScreenLanding;
