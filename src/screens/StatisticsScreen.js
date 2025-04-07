import { Dimensions, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../locales/i18n';
import { parse } from 'react-native-svg';
import spacing from '../theme/spacing';
import randomColors from '../theme/randomColor';
import { Text } from '@react-navigation/elements';
import fonts from '../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';

const StatisticsScreen = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const loadExpenses = async () => {
            try {
                const storedExpenses = await AsyncStorage.getItem('expenses');
                const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];

                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                const monthlyExpenses = expenses.filter(expense => {
                    const expenseDate = new Date(expense.date);
                    return (
                        expenseDate.getMonth() === currentMonth &&
                        expenseDate.getFullYear() === currentYear
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
            } catch (error) {
                console.log('Harcam verileri yüklenirken hata oluştu:', error);
            }
        };
        loadExpenses();
    }, []);


    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    padding: 10,
                    margin: 10,
                    borderRadius: spacing.small,
                    backgroundColor: colors.primary,
                    alignSelf: 'flex-start',
                }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>⏎ {i18n.t('back')}</Text>
            </TouchableOpacity>

            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ fontSize: fonts.large, marginBottom: 20 }}>{i18n.t('monthlyStatistics')}</Text>
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
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default StatisticsScreen;