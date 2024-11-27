import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export interface User {
  email: string;
  name: string;
  password: string;
}
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
export interface MediaPlayerProps {
  videoUri: string;
  canDownload: boolean;
  contentId?: number;
  title?: string;
  thumbnailUrl?: string;
}

export type AuthStackParamList = {
  Landing: undefined;
  Signup: undefined;
  Login: undefined;
};
export type AppStackParamList = {
  Home: undefined;
  Video: {
    videoUri: string;
    title: string;
    contentId: number;
    thumbnailUrl: string;
    description: string;
  };
  Watchlist:undefined;
  Downloads: undefined;
};

export type RootStackParamList = {
  WelcomePageSub: undefined;
  ScreenSubscription: undefined;
};

export interface VideoMetadata {
  contentId: number;
  title: string;
  thumbnailUrl: string;
  videoPath: string;
}
export interface ProgressState {
  currentTime: number;
  seekableDuration: number;
}
export interface VideoPlayerProps {
  videoUri: string;
  onFullScreenToggle: (fullScreen: boolean) => void;
}
export type LandingScreenProps = StackScreenProps<
  AuthStackParamList,
  'Landing'
>;
export type SignupScreenProps = StackScreenProps<AuthStackParamList, 'Signup'>;
export type LoginScreenProps = StackScreenProps<AuthStackParamList, 'Login'>;
export type HomeScreenProps = StackScreenProps<AppStackParamList, 'Home'>;
export type WelcomePageProps = StackScreenProps<
  RootStackParamList,
  'WelcomePageSub'
>;
export type WatchlistScreenProps =StackScreenProps<AppStackParamList,'Watchlist'>;
export type SubscriptionPageNavigationProp = StackScreenProps<
  RootStackParamList,
  'ScreenSubscription'
>;

export interface VideosScreenProps
  extends StackScreenProps<AppStackParamList, 'Video'> {}
