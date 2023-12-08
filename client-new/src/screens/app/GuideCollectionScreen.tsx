import GuideCard from '@/components/guideCollection/GuideCard';
import { IGuide } from '@/interfaces/IGuide';
import { fetchAllGuides } from '@/services/GuideService';
import { useQuery } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import { Input, ScrollView, Text, View } from 'native-base';

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, RefreshControl } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

import { moderateScale } from '../../utils/FontSizeUtils';

export default function GuideCollectionScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [tagsGuides, setTagsGuides] = useState<Map<string, IGuide[]>>(
    new Map<string, IGuide[]>()
  );
  const [filteredGuides, setFilteredGuides] = useState<IGuide[]>([]);
  const {
    isPending,
    data: guides,
    error,
    refetch
  } = useQuery({
    queryKey: [],
    queryFn: async () => await fetchAllGuides()
  });

  const initCollectionAll = () => {
    const newTagsGuides = new Map<string, IGuide[]>();
    if (!guides) {
      return;
    }
    guides.forEach((guide) => {
      guide.tags.forEach((tag) => {
        if (!newTagsGuides.has(tag.name)) {
          newTagsGuides.set(tag.name, []);
          newTagsGuides.get(tag.name).push(guide);
        } else {
          newTagsGuides.get(tag.name).push(guide);
        }
      });
    });
    setTagsGuides(newTagsGuides);
  };

  const initCollectionSearch = (filteredGuides) => {
    const newTagsGuides = new Map<string, IGuide[]>();
    if (!guides) {
      return;
    }
    filteredGuides.forEach((guide) => {
      guide.tags.forEach((tag) => {
        if (!newTagsGuides.has(tag.name)) {
          newTagsGuides.set(tag.name, []);
          newTagsGuides.get(tag.name).push(guide);
        } else {
          newTagsGuides.get(tag.name).push(guide);
        }
      });
    });
    setTagsGuides(newTagsGuides);
  };

  const resetSearch = () => {
    setSearch('');
  };

  useEffect(() => {
    console.log(guides);
    initCollectionAll();
  }, [guides]);

  const filterTasks = () => {
    if (search.length > 0) {
      const options = {
        keys: ['guide_name', 'title', 'sub_title', 'author', 'full_text'],
        threshold: 0.2
      };
      const fuse = new Fuse(guides, options);
      const result = fuse.search(search);
      initCollectionSearch(result);
    } else {
      initCollectionAll();
    }
  };

  if (isPending) {
    return (
      <View
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        bg={'#FFF9EE'}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        bg={'#FFF9EE'}
      >
        <Text>Error!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF9EE'
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isPending}
            onRefresh={async () => {
              refetch();
              initCollectionAll();
              resetSearch();
            }}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            tintColor={'#ff0000'}
          />
        }
        bgColor={'#FFF9EE'}
        contentContainerStyle={{ alignItems: 'center' }}
        paddingLeft={w('1.5%')}
        paddingRight={w('1.5%')}
      >
        <View alignItems={'center'}>
          <Text
            fontSize={moderateScale(32)}
            fontFamily={'rocaOne'}
            fontWeight={'Regular'}
            fontStyle={'normal'}
            color={'barkBrown'}
            margin={h('2%')}
          >
            Guides
          </Text>

          <View>
            <Input
              placeholder={'Search'}
              size="md"
              isDisabled={isPending ? true : false}
              width={w('85%')}
              backgroundColor={'creamyCanvas'}
              borderRadius={20}
              marginBottom={'20px'}
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
        </View>
        <View>
          {[...tagsGuides.keys()].map((tag, key) => (
            <View flexDirection={'column'}>
              <Text
                fontSize={moderateScale(20)}
                fontFamily={'rocaOne'}
                fontWeight={'Regular'}
                fontStyle={'normal'}
                color={'barkBrown'}
                paddingTop={key === 0 ? 0 : h('3%')}
                paddingBottom={h('.5%')}
              >
                {tag}
              </Text>
              <View flexDirection={'row'}>
                <ScrollView horizontal={true}>
                  {tagsGuides.get(tag).map((guide, key2) => (
                    <Pressable
                      onPress={() =>
                        navigation.navigate('Guide Screen', {
                          guideName: guide.guide_name
                        })
                      }
                    >
                      <View paddingLeft={key2 === 0 ? 0 : h('1.5%')}>
                        <GuideCard
                          key={guide.id}
                          guideName={guide.guide_name}
                        />
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
