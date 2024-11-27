import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { localStyles } from './StylesSubscribeButton';

interface SubscribeButtonProps {
  onPress: () => void;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ onPress }) => {
  return (
    <LinearGradient
      colors={['#C72FF8', '#6177EE', '#6177EE']}
      start={{ x: 0.9, y: -0.3 }}
      style={localStyles.subscribeButton}
    >
      <TouchableOpacity onPress={onPress} style={localStyles.gradientButton}>
        <Text style={localStyles.subscribeButtonText}>Subscribe Now</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
export default SubscribeButton;