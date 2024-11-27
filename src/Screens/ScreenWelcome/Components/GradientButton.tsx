import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../StylesWelcome';

interface GradientButtonProps {
  text: string;
  onPress: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.gradientButton}>
      <Text style={styles.subscribeButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default GradientButton;
