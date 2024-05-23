import { useState } from 'react';
import { View, Text, ScrollView, Dimensions, Alert, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../../constants';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { CustomButton, FormField } from '../../components';

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = form;

  const submit = async () => {
    if (form.username === '' || form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setSubmitting(true);
    try {
      const result = await createUser(email, password, username);
      setUser(result);
      setIsLogged(true);

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View
          className="my-6 flex h-full w-full justify-center px-4"
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <View className="flex flex-row overflow-hidden items-center gap-2">
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
            Sign up to Vidify
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-gray-100">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="font-psemibold text-lg text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
