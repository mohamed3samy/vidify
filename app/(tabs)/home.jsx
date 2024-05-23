import { useState } from 'react';
import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../../constants';
import useAppwrite from '../../lib/useAppwrite';
import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
import { EmptyState, SearchInput, Trending, VideoCard } from '../../components';

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  

  return (
    <SafeAreaView className="bg-primary">
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
          <View className="my-6 flex space-y-6 px-4">
            <View className="mb-6 flex flex-row items-start justify-between">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  Vidify
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="h-10 w-9"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pb-8 pt-5">
              <Text className="mb-3 font-pregular text-lg text-gray-100">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
