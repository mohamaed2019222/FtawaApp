import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import qustions from '../Screens/qustions';
import ViewScreen from '../Screens/ViewScreen';
import Sections from '../Screens/Sections';
import ChangeColor from '../Screens/ChangeColor';
import Splash from '../Screens/Splash';
import Home from '../Screens/Home'
import Search from '../Screens/search'
import QuastionUser from './QuastionUser'
import Pager from './Pager'
import Logo from '../Screens/firstLogo'
const Stack = createStackNavigator({
 Splash:Splash,
 View: ViewScreen,
 Search:Search,
 User:QuastionUser,
 Home:Home,
 Sections:Sections,
 qustions:qustions,
 Pager:Pager
});
const AppContainer = createAppContainer(Stack);

export default class Route extends Component{
    render(){
        return(
            <AppContainer/>
        )
    }
}
