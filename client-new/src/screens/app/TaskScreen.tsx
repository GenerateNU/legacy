import {  View, Text, ScrollView, } from "native-base";
import { useAuth } from "../../contexts/AuthContext";
import LegacyWordmark from "../../components/reusable/LegacyWordmark";
import CircleProgress from "../../components/reusable/CircleProgress";
import TaskCard from "../../components/reusable/TaskCard";


export default function TaskScreen() {
  const { user, logout } = useAuth();
  const taskData = {
      title: 'Acknowledge Your Aversion to End-Of-Life-Planning',
      progress: 33
    };
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
      <ScrollView>
        <View margin={'20px'}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end',}}>
                <LegacyWordmark/>
            </View>
            <View width={'75%'} marginTop={'20px'}>
            <Text marginBottom= '10px' color= '#252525' fontSize='18' fontWeight={'bold'}>
                {taskData.title}
              </Text>
            </View>
            <View marginTop={'20px'}>
            <CircleProgress progress={73}></CircleProgress>
            </View>
            <View marginTop= '30' flexDirection='column' justifyContent= 'space-between'>
                {subtaskData.map((item, index) => (
                  <View key={index} marginBottom='2'>
                    <TaskCard title={item.title} description={item.description} />
                  </View>
                ))}
              </View>
              <View marginTop={'20px'}>
            <Text marginBottom= '10px' color= '#252525' fontSize='18' fontWeight={'bold'}>
                Suggestions for You
              </Text>
              <Text marginBottom= '10px' color= '#252525' fontSize='14'>
                Consider adding these steps into your process
              </Text>
            </View>

        </View>

      </ScrollView>
    </>
  );
}