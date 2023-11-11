import { View, Text } from 'native-base';

type HSGCProps = {
  title: string;
  description: string;
};

const HomeScreenGuideCard: React.FC<HSGCProps> = (props) => {
  return (
    <View
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#FFB017',
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#0F4D3F',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      }}
    >
      <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 8, color: '#2F1D12'}}>{props.title}</Text>
        <Text style={{ fontSize: 12, color: '#2F1D12', marginBottom: 8, width: 100 }} numberOfLines={2}>
          {props.description}
        </Text>
      </View>
    </View>
  );
};

export default HomeScreenGuideCard;
