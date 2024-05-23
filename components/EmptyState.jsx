import { Image, Text, View } from 'react-native';
import { router } from 'expo-router';

import CustomButton from './CustomButton';
import { images } from '../constants';

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-cente flex items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="h-[216px] w-[250px]"
      />

      <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
      <Text className="mt-2 text-center font-psemibold text-xl text-white">
        {subtitle}
      </Text>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push('/home')}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
