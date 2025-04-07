// StatisticsScreen.js
// Statistics screen that displays the user's expenses graphically.

import { Dimensions, SafeAreaView, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../locales/i18n';
import spacing from '../theme/spacing';
import randomColors from '../theme/randomColor';
import fonts from '../theme/fonts';
import colors from '../theme/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import formatMonthYear from '../utils/formatDate';
import GoBackButton from '../components/GoBackButton';
import * as Animatable from 'react-native-animatable'



const StatisticsScreen = () => {
    const [chartData, setChartData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false)


    // Loads expense data according to the selected date and updates the PieChart data
    useEffect(() => {
        loadExpenses();
    }, [selectedDate]);


    // Loads expense data from AsyncStorage and filters it by selected month
    const loadExpenses = async () => {
        try {
            const storedExpenses = await AsyncStorage.getItem('expenses');
            const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];

            const now = new Date();
            const selectedMonth = selectedDate.getMonth();
            const selectedYear = selectedDate.getFullYear();

            const monthlyExpenses = expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return (
                    expenseDate.getMonth() === selectedMonth &&
                    expenseDate.getFullYear() === selectedYear
                );
            });

            const categoryTotals = {};
            monthlyExpenses.forEach(expense => {
                if (categoryTotals[expense.category]) {
                    categoryTotals[expense.category] += parseFloat(expense.amount);
                } else {
                    categoryTotals[expense.category] = parseFloat(expense.amount);
                }
            });

            // Data objects to be used in the PieChart component are created for each category in the categoryTotals object.
            // A color is assigned to each category and the necessary legend settings are made for the chart.
            const data = Object.keys(categoryTotals).map((category, index) => ({
                name: category,
                amount: categoryTotals[category],
                color: randomColors(index),
                legendFontColor: '#7F7F7F',
                legendFontSize: spacing.medium,
            }));

            setChartData(data);
        } catch (error) {
            console.log('An error occurred while loading expense data:', error);
        }
    };

    const getTotalExpense  = () => {
        return chartData.reduce((total, item) => total + item.amount, 0).toFixed(2);
    };

    return (
        <SafeAreaView>
            <GoBackButton />

            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ fontSize: fonts.large, marginBottom: 20 }}>{i18n.t('monthlyStatistics')}</Text>
                    <Text style={{ marginTop: 10, fontSize: fonts.large, color: colors.text }}>
                        {formatMonthYear(selectedDate)}
                    </Text>

                    <Animatable.View animation='zoomIn' duration={1000}>
                    {chartData.length > 0 ? (
                        <PieChart
                            data={chartData}
                            width={Dimensions.get('window').width - 40}
                            height={220}
                            chartConfig={{
                                backgroundColor: 'white',
                                backgroundGradientFrom: 'white',
                                backgroundGradientTo: 'white',
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                strokeWidth: 2,
                            }}
                            accessor='amount'
                            backgroundColor='transparent'
                            paddingLeft='15'
                            absolute
                        />
                    ) : (
                        <Text>{i18n.t('noData')}</Text>
                    )}
                    </Animatable.View>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{
                    backgroundColor: colors.background,
                    padding: 10,
                    margin: 10,
                    borderRadius: spacing.small,
                    alignItems: 'center'
                }}
            >
                <Text style={{ color: colors.secondary, fontWeight: 'bold' }}>{i18n.t('enterDate')}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode='date'
                    display='spinner'
                    onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date) {
                            setSelectedDate(date);
                        }
                    }}
                />
            )}

            <Text style={{ 
                fontSize: fonts.large,
                color: colors.text,
                marginVertical: spacing.medium,
                fontWeight: 'bold',
                textAlign: 'center',
                }}>
                {i18n.t('totalExpense')}: {getTotalExpense()} ₺
            </Text>
        </SafeAreaView>
    )
}


export default StatisticsScreen;