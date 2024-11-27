import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from 'react-redux';
import {loginUser, loginWithGoogle} from '../utils/firebaseAuthentication';
import {LoginFormData} from './utils/interface';
import schema from './utils/validation';
import {LoginScreenProps} from '../../utils/interfaces/types';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {styles} from './StylesLogin';
import GradientCircles from '../../Assets/ImagesData/StyleLogo';
import LinearGradient from 'react-native-linear-gradient';
import GoogleIcon from '../../Assets/ImagesData/ImageGoogle';
import FacebookIcon from '../../Assets/ImagesData/ImageFacebook';
import PhoneIcon from '../../Assets/ImagesData/ImagePhone';

const Login: React.FC<LoginScreenProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
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

  const onSubmit = (data: LoginFormData) => {
    loginUser(data.email, data.password, dispatch);
  };

  const handleGoogleLogin = () => {
    loginWithGoogle(dispatch);
  };

  return (
      <View style={[styles.container, styles.card]}>
        <View style={styles.StyleIcon}>
          <GradientCircles />
        </View>
        <Text style={styles.Headingtext}>Sign-In</Text>
        <KeyboardAvoidingView behavior= 'padding'>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.LoginInput}
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
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.LoginInput}
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
          style={styles.Loginbutton}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text style={styles.LoginbuttonText}>Log in</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['#C72FF8', '#6177EE', '#6177EE']}
          start={{x: 0.9, y: -0.3}}
          style={styles.Signupbutton}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.SignupbuttonText}>Sign up</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.Iconcard}>
          <TouchableOpacity onPress={handleGoogleLogin}>
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

export default Login;
