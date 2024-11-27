import React, {useEffect} from 'react';
import {View, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import {signupUser, loginWithGoogle} from '../utils/firebaseAuthentication';
import {User} from './utils/interface';
import {SignupScreenProps} from '../../utils/interfaces/types';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GoogleIcon from '../../Assets/ImagesData/ImageGoogle';
import FacebookIcon from '../../Assets/ImagesData/ImageFacebook';
import PhoneIcon from '../../Assets/ImagesData/ImagePhone';
import {styles} from './StylesSingup';
import {schema} from './utils/validation';
import GradientCircles from '../../Assets/ImagesData/StyleLogo';
import {unsubscribe} from '../ScreenSubscription/redux/subscriptionSlice';

const Signup: React.FC<SignupScreenProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<User>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId:
        '565978315125-fafv1cnccofkjm1r7fe4lok2r7oseqti.apps.googleusercontent.com',
    });
  }, []);

  const onSubmit = (data: User) => {
    signupUser(data, dispatch);
    dispatch(unsubscribe());
  };

  const handleGoogleSignup = () => {
    loginWithGoogle(dispatch);
  };

  return (
    <View style={[styles.container, styles.card]}>

      <View style={styles.StyleIcon}>
        <GradientCircles />
      </View>
      <Text style={styles.Headingtext}>Sign Up</Text>

      <KeyboardAvoidingView behavior="padding">
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.SignupInput}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="name"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.SignupInput}
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.SignupInput}
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
        />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <LinearGradient
        colors={['#C72FF8', '#6177EE', '#6177EE']}
        start={{x: 0.9, y: -0.3}}
        style={styles.Signupbutton}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={styles.SignupbuttonText}>Sign Up</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.Iconcard}>
        <TouchableOpacity onPress={handleGoogleSignup}>

          <GoogleIcon />
        </TouchableOpacity>
        <TouchableOpacity>
          <FacebookIcon />
        </TouchableOpacity>

        <TouchableOpacity>
          <PhoneIcon />
        </TouchableOpacity>
      </View>
          </KeyboardAvoidingView>
    </View>
  );
};

export default Signup;
