import { View, Text } from 'native-base';

type HSGCProps = {
  title: string; 
};

const HomeScreenGuideCard: React.FC<HSGCProps> = (props) => {
  return (
    <View
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: 'white',
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#EFEFEF',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      }}
    >
      <View style={{ flex: 1, marginLeft: 5, marginRight: 5}}>
        <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 8 }}>{props.title}</Text>
      </View>
    </View>
  );
};

export default HomeScreenGuideCard;
