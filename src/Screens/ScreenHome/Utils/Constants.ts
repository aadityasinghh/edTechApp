import {CardContainerProps} from './Types';

export const cardsData: CardContainerProps[] = [
  {
    Images: require('../../../Assets/Images/Java.png'),
    CourseTitle: 'Java',
    CourseDescription:
      'Java is a multiplatform, object-oriented programming language thats used to code many types of applications, including mobile apps, enterprise software, and web applications',
    NoOfEnrollments: 120,
  },
  {
    Images: require('../../../Assets/Images/Python.png'),
    CourseTitle: 'Python',
    CourseDescription:
      'Python is a general-purpose, open-source programming language that can be used to create a variety of programs for many different purposes.Its often used for building websites and conducting data analysis. ',
    NoOfEnrollments: 200,
  },
  {
    Images: require('../../../Assets/Images/react-native.png'),
    CourseTitle: 'React Native',
    CourseDescription:
      'React Native (also known as RN) is a popular JavaScript-based mobile app framework that allows you to build natively-rendered mobile apps for iOS and Android',
    NoOfEnrollments: 200,
  },
  {
    Images: require('../../../Assets/Images/Nodejs.png'),
    CourseTitle: 'Node',
    CourseDescription:
      'Node is used extensively for server-side programming, making it possible for developers to use JavaScript for client-side and server-side code without needing to learn an additional language..',
    NoOfEnrollments: 200,
  },
];
