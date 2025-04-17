// StatisticsScreen.js
// Statistics screen that displays the user's expenses graphically.

import { Dimensions, SafeAreaView, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import i18n from '../locales/i18n';
import spacing from '../theme/spacing';
import randomColors from '../theme/randomColor';
import fonts from '../theme/fonts';
import colors from '../theme/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import formatMonthYear from '../utils/formatDate';
import GoBackButton from '../components/GoBackButton';
import * as Animatable from 'react-native-animatable'
import { useExpenseContext } from '../contexts/ExpenseContext';
import LottieView from 'lottie-react-native';
import statAnim from '../assets/animations/statistic.json'



const StatisticsScreen = ( { route, navigation }) => {
    const { expenses } = useExpenseContext();
    const [chartData, setChartData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false)


    // Loads expense data according to the selected date and updates the PieChart data
    useEffect(() => {
        loadExpenses();
    }, [selectedDate]);


    const loadExpenses = () => {
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

        const data = Object.keys(categoryTotals).map((category, index) => ({
            name: category,
            amount: categoryTotals[category],
            color: randomColors(index),
            legendFontColor: '#7F7F7F',
            legendFontSize: spacing.medium,
        }));

        setChartData(data);    
    }
        
    const getTotalExpense  = () => {
        return chartData.reduce((total, item) => total + item.amount, 0).toFixed(2);
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{marginTop: 20}}>
            <GoBackButton />
            </View>

            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ fontSize: fonts.large, marginBottom: 20 }}>{i18n.t('monthlyStatistics')}</Text>
                    <Text style={{ marginTop: 10, fontSize: fonts.large, color: colors.text }}>
                        {formatMonthYear(selectedDate)}
                    </Text>

                    <Animatable.View animation='fadeInUpBig' duration={1200}>
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
                            paddingLeft= {15}
                            absolute
                        />
                    ) : (
                        <Text>{i18n.t('noData')}</Text>
                    )}
                    </Animatable.View>
                </View>
            <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{
                    backgroundColor: 'black',
                    padding: 10,
                    margin: 10,
                    borderRadius: spacing.small,
                    alignItems: 'center',
                    alignSelf: 'center',
                }}
                >
                <Text style={{ color: colors.secondary, fontWeight: 'bold' }}>{i18n.t('enterDate')}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                value={selectedDate}
                mode='date'
                display='default'
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
            </ScrollView>


            <LottieView
            source={statAnim}
            autoPlay
            loop
            style={{ width: 250, height: 250, position: 'absolute', bottom: 60, alignSelf: 'center' }}
            />
        </SafeAreaView>
    )
}


export default StatisticsScreen;