
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import ExpenseDetailScreen from '../screens/ExpenseDetailScreen';
import CategoryScreen from '../screens/CategoryScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='AddExpense' component={AddExpenseScreen} />
            <Stack.Screen name='ExpenseDetail' component={ExpenseDetailScreen} />
            <Stack.Screen name='Category' component={CategoryScreen} />
            <Stack.Screen name='Statistics' component={StatisticsScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default StackNavigator;