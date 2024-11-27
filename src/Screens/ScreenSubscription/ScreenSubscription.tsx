import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { subscribe } from './redux/subscriptionSlice';
import { createTables } from '../../utils/storage/db';
import { db } from '../../utils/storage/db';
import PlanItem from './Components/PlanItem/PlanItem';
import SubscribeButton from './Components/SubscribeButton/SubscribeButton';
import { Plan } from './utils/interfaces';
import { styles } from './StylesSubscription';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SubscriptionPageNavigationProp } from '../../utils/interfaces/types';


const SubscriptionPage: React.FC<SubscriptionPageNavigationProp> = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    createTables();
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM plans', [], (txn, results) => {
        const rows = results.rows;
        const plansArray: Plan[] = [];
        for (let i = 0; i < rows.length; i++) {
          plansArray.push(rows.item(i));
        }
        setPlans(plansArray);
      });
    });
  };
  const subscribeToPlan = async () => {
    if (selectedPlan === null) {
    Alert.alert('Please select a plan first.');
    return;
    }
    
    const currentUser = auth().currentUser;
    const googleUser = GoogleSignin.getCurrentUser();
    
    let uid, email, name;
    
    if (currentUser) {
    uid = currentUser.uid;
    email = currentUser.email;
    name = currentUser.displayName;
    } else if (googleUser) {
    uid = googleUser.user.id;
    email = googleUser.user.email;
    name = googleUser.user.name;
    } else {
    Alert.alert('User not signed in.');
    return;
    }
    
    
    db.transaction((txn) => {
    txn.executeSql(
    `INSERT OR REPLACE INTO users (uid, email, name, subscribed_plan_id)
    VALUES (?, ?, ?, ?)`,
    [uid, email, name, selectedPlan],
    async () => {
    dispatch(subscribe(selectedPlan));
    Alert.alert('Subscription successful');
    },
    (error) => {
    console.error('Error subscribing to plan: ', error);
    }
    );
    });
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.subscriptionContainer}>
          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <Text style={styles.title}>Choose Your Plan</Text>
          {plans.map(plan => (
            <PlanItem
              key={plan.id}
              plan={plan}
              selectedPlan={selectedPlan}
              onSelectPlan={setSelectedPlan}
            />
          ))}
          <SubscribeButton onPress={subscribeToPlan} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionPage;

