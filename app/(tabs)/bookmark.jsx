import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Bookmark = () => {
  return (
    <SafeAreaView className="my-6 h-full bg-primary px-4">
      <Text className="font-psemibold text-2xl text-white">Bookmark</Text>
    </SafeAreaView>
  );
};

export default Bookmark;
