import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./Login/LoginScreen";
import TabNavigator from "./Main/MainNavigator";

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Login: {
      screen: LoginScreen
    },
    Main: {
        screen: TabNavigator
    }
  })
);

export default AppContainer;
