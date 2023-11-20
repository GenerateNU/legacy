import {  View, Text, ScrollView, Button, } from "native-base";
import { useAuth } from "../../contexts/AuthContext";
import LegacyWordmark from "../../components/reusable/LegacyWordmark";
import HomeScreenTaskCard from "../../components/homescreen components/HomeScreenTaskCard";

export default function TaskScreen() {
  const { user, logout } = useAuth();
  const tagData = ['Emotional', 'Financial', 'Value Based', 'Holistic'];
  const subtaskData = [
    {
        title: 'Research Resources',
        description: 'Research resources on overcoming death'
    }, {
        title: 'Connect with Local Support Group',
        description: 'View marketplace for places to find individuals facing similar fears'
    }, {
        title: 'Explore Mindfulness & Meditation Practices',
        description: 'View guides to access partnership with Calm to help manage anxiety related end-of-life topics'
    }];

  return (
    <>
      <ScrollView backgroundColor={'#FFFAF2'}>
        <View margin={'30px'} marginTop={'60px'}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <LegacyWordmark/>
            </View>
            <View width={'75%'} marginTop={'20px'}>
            <Text marginBottom= '20px' fontSize='24' fontWeight={'200'} fontFamily={"madeDillan"}>
                All Tasks
              </Text>
              <View flexDirection={'row'}>
              {tagData.map((item) => (
                  <Button 
                  variant="unstyled" 
                  marginRight={'5px'} 
                  marginBottom={'5px'}
                  paddingLeft={'10px'}
                  paddingRight={'10px'}
                  paddingTop={'10px'}
                  paddingBottom={'10px'}
                  borderRadius={'100px'}
                  borderWidth={'1px'}
                  borderColor={'#0F4F43'}>{item}</Button>
                ))}
              </View>
            </View>
            <View marginTop= '20px' flexDirection='column' justifyContent= 'space-between'>
                {subtaskData.map((item, index) => (
                  <View key={index} marginBottom='10px'>
                    <HomeScreenTaskCard title={item.title} description={item.description} progress={10} />
                  </View>
                ))}
              </View>
              <View marginTop={'20px'}>
            </View>

        </View>

      </ScrollView>
    </>
  );
}