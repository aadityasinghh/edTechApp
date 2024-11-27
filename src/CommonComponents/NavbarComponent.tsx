import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import NavbarIconHome from '../Assets/ImagesData/HomeLogo';
import NavbarDownloadIcon from '../Assets/ImagesData/DownLoadIcon';
import Wishlist from '../Assets/ImagesData/Watchlist'; 
import { AppStackParamList } from '../utils/interfaces/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './StylesNavbar';
import Bookmark from '../Assets/ImagesData/BookMark';

type NavigationProp = StackNavigationProp<AppStackParamList>;
type Route = RouteProp<AppStackParamList>;

const NavbarComponent: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<Route>();

  const isHomeActive = route.name === 'Home';
  const isDownloadsActive = route.name === 'Downloads';
  const isWishlistActive = route.name === 'Watchlist'; 

  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Home')}>
        <NavbarIconHome stroke={isHomeActive ? 'blue' : '#1b199c'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Watchlist')}>
        <Bookmark stroke={isWishlistActive ? 'blue' : '#1b199c'}  /> 
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Downloads')}>
        <NavbarDownloadIcon stroke={isDownloadsActive ? 'blue' : '#1b199c'} />
      </TouchableOpacity>
    </View>
  );
};

export default NavbarComponent;
