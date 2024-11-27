import React, { useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, WelcomePageProps } from '../../utils/interfaces/types';
import { styles } from './StylesWelcome';
import LinearGradient from 'react-native-linear-gradient';
import DemoVideoSection from './Components/DemoVideoSection';
import GradientButton from './Components/GradientButton';

type WelcomePageNavigationProp = StackNavigationProp<RootStackParamList, 'ScreenSubscription'>;

const WelcomePage:React.FC<WelcomePageProps>= () => {
  const navigation = useNavigation<WelcomePageNavigationProp>();
  const handleSubscriptionPress = () => {
    navigation.navigate('ScreenSubscription');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.WelcomeContainer}>
          <Text style={styles.WelcomeTitle}>Welcome to edTech</Text>
          <Text style={styles.WelcomeText}>
            Unlock a world of knowledge with edTech. Subscribe now to access exclusive courses, interactive lessons, and premium educational content!
          </Text>

          <LinearGradient
            colors={['#C72FF8', '#6177EE', '#6177EE']}
            start={{ x: 0.9, y: -0.3 }}
            style={styles.subscribeButton}
          >
            <GradientButton text="Choose Your Plans" onPress={handleSubscriptionPress} />
          </LinearGradient>

          <Text style={styles.subTitle}>Explore Demo Lessons</Text>

          <DemoVideoSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomePage;
