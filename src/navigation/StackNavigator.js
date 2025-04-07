
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import ExpenseDetailScreen from '../screens/ExpenseDetailScreen';
import CategoryScreen from '../screens/CategoryScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='AddExpense' component={AddExpenseScreen} />
            <Stack.Screen name='ExpenseDetail' component={ExpenseDetailScreen} />
            <Stack.Screen name='Category' component={CategoryScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default StackNavigator;