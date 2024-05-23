import { View, Text, Image, ScrollView } from 'react-native';
import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import { CustomButton, Loader } from '../components';
import { useGlobalContext } from '../context/GlobalProvider';

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="h-full bg-primary">
      <Loader isLoading={loading} />

      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="flex h-full w-full items-center justify-center px-4">
          <View className="flex flex-row items-center gap-2 overflow-hidden">
            <Image
              source={images.logoSmall}
              resizeMode="contain"
              className="h-10 w-10"
            />

            <Text className="font-psemibold text-3xl font-semibold tracking-widest text-white">
              Vidify
            </Text>
          </View>

          <Image
            source={images.cards}
            className="h-[298px] w-full max-w-[380px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-center text-3xl font-bold text-white">
              Discover Endless{'\n'}
              Possibilities with{' '}
              <Text className="text-secondary-200">Vidify</Text>
            </Text>

            <Image
              source={images.path}
              className="absolute -bottom-2 -right-8 h-[15px] w-[136px]"
              resizeMode="contain"
            />
          </View>

          <Text className="mt-7 text-center font-pregular text-sm text-gray-100">
            Where Creativity Meets Innovation: Explore Limitless Possibilities
            with Vidify
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
