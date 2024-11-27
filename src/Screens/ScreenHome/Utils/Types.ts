import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {AppStackParamList} from '../../../utils/interfaces/types';

export interface CardData {
  thumbnailUrl: string;
  views: number;
  duration: string;
  videoUrl: string;
  title: string;
  id: number;
  description: string;
}

export interface HomeState {
  data: CardData[];
  loading: boolean;
  error: string | null;
}
export interface CardContainerProps {
  Images: any;
  CourseTitle: string;
  CourseDescription: string;
  NoOfEnrollments: number;
}
export interface CardCourseProps {
  item: CardContainerProps & {fetchedItems: CardData[]};
}

export interface FetchedItemProps {
  item: CardData;
}

export type ScreenVideoNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'Video'
>;
