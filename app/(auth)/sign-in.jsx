import { useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions, Alert, Image } from 'react-native';

import { images } from '../../constants';
import { CustomButton, FormField } from '../../components';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const submit = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setSubmitting(true);

    try {
      await signIn(email, password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      // Alert.alert('Success', 'User signed in successfully');
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', 'Please check the email and password');
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      {/* hide scrollbar */}
      <ScrollView>
        <View
          className="my-6 flex h-full w-full flex-col justify-center px-4"
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <View className="flex flex-row items-center gap-2 overflow-hidden">
            <Image
              source={images.logoSmall}
              resizeMode="contain"
              className="h-10 w-10"
            />

            <Text className="font-psemibold text-2xl font-semibold tracking-widest text-white">
              Vidify
            </Text>
          </View>

          <Text className="mt-10 font-psemibold text-2xl font-semibold text-white">
            Log in to Vidify
          </Text>

          <FormField
            title="Email"
            value={email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign in"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-gray-100">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="font-psemibold text-lg text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
