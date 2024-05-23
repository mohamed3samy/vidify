import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { icons } from '../../constants';
import useAppwrite from '../../lib/useAppwrite';
import { getUserPosts, signOut } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { EmptyState, InfoBox, VideoCard } from '../../components';

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace('/sign-in');
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="mb-12 mt-6 flex w-full items-center justify-center px-4">
            <TouchableOpacity
              onPress={logout}
              className="mb-10 flex w-full items-end"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="h-6 w-6"
              />
            </TouchableOpacity>

            <View className="flex h-16 w-16 items-center justify-center rounded-lg border border-secondary">
              <Image
                source={{ uri: user?.avatar }}
                className="h-[90%] w-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
