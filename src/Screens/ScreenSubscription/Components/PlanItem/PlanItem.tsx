import React from 'react';
import { TouchableOpacity, Text,View } from 'react-native';
import { PlanItemProps } from '../../utils/interfaces';
import { styles } from './StylesPlanItem';


const PlanItem: React.FC<PlanItemProps> = ({ plan, selectedPlan, onSelectPlan }) => {
  return (
    <TouchableOpacity
      style={[
        styles.planButton,
        selectedPlan === plan.id && styles.selectedPlanButton,
      ]}
      onPress={() => onSelectPlan(plan.id)}
    >
      <Text style={styles.planName}>{plan.name}</Text>
      <Text style={styles.planPrice}>${plan.price} / month</Text>
      <View style={styles.planContent}>
        <Text style={styles.planDetail}>✓ Unlimited Access</Text>
        <Text style={styles.planDetail}>✓ Premium Support</Text>
        <Text style={styles.planDetail}>✓ 30-Day Free Trial</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlanItem;


