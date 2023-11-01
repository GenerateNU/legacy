import {  View, Text, CircularProgress, } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import LegacyWordmark from "../../components/reusable/LegacyWordmark";
import HomeScreenTaskCard from "../../components/reusable/HomeScreenTaskCard";
import CircleProgressBar from "../../components/reusable/CircleProgressBar";
import Circle from "../../components/reusable/Circle";
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
      <SafeAreaView style={{ alignItems: 'center', flex: 1 }}>
        <View style={{width: '90%', flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end',}}>
                <LegacyWordmark/>
            </View>
            <View style={{ width: '100%', marginTop: 35, flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={{ width: '100%', color: '#252525', fontSize: 18, }}>
                {taskData.title}
              </Text>
              <CircleProgress progress={33}></CircleProgress>
            </View>

            <View style={{ width: '100%', marginTop: 20 }}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={{ color: '#252525', fontSize: 15, fontFamily: 'Open Sans', fontWeight: '700', lineHeight: 20 }}>
                  Upcoming Tasks
                </Text>
              </View>

              <View style={{ marginTop: 20, flexDirection: 'column', justifyContent: 'space-between' }}>
                {subtaskData.map((item, index) => (
                  <View key={index} style={{ marginBottom: 20 }}>
                    <TaskCard title={item.title} description={item.description} />
                  </View>
                ))}
              </View>
            </View>
        </View>
      </SafeAreaView>
    </>
  );
}