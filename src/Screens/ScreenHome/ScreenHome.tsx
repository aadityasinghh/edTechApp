import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchDataRequest } from './Redux/Slices/HomeSlice';
import CombinedCardList from './Components/CombinedCardList';
import { styles } from './StylesHome';
import Header from './Components/ComponentHeader';
import { HomeScreenProps, VideosScreenProps } from '../../utils/interfaces/types';
import NavbarComponent from '../../CommonComponents/NavbarComponent';

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  return (
    <View style={styles.container}>
     
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Header/>
      <CombinedCardList />  
      <NavbarComponent/>
    </View>
  );
};

export default HomeScreen;
