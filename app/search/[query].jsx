import { useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import useAppwrite from '../../lib/useAppwrite';
import { searchPosts } from '../../lib/appwrite';
import { EmptyState, SearchInput, VideoCard } from '../../components';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="my-6 flex px-4">
              <Text className="font-pmedium text-sm text-gray-100">
                Search Results
              </Text>
              <Text className="mt-1 font-psemibold text-2xl text-white">
                {query}
              </Text>

              <View className="mb-8 mt-6">
                <SearchInput initialQuery={query} refetch={refetch} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
