import { Platform, Dimensions, View, ActivityIndicator } from 'react-native';

const Loader = ({ isLoading }) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get('screen').height;

  if (!isLoading) return null;

  return (
    <View
      className="absolute z-10 flex h-full w-full items-center justify-center bg-primary/60"
      style={{
        height: screenHeight,
      }}
    >
      <ActivityIndicator
        animating={isLoading}
        color="#fff"
        size={osName === 'ios' ? 'large' : 50}
      />
    </View>
  );
};

export default Loader;
