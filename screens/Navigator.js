import { StackNavigator } from 'react-navigation';
import HomeScreen from './Home';
import DetailsScreen from './Details';

const Routes = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Biletujo',
    }
  },

  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      headerTitle: 'Details',
    }
  }
};

const Settings = {
  navigationOptions: {
    headerStyle: { backgroundColor: "#011627", elevation: 0 },
    headerTintColor: "#fdfffc"
  }
};

export default Navigator = StackNavigator(Routes, Settings);
