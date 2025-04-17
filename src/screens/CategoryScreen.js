// CategoryScreen.js
// Screen where the user can list and manage expense categories.

import React, { useEffect, useState } from 'react';
import spacing from '../theme/spacing';
import colors from '../theme/colors';
import { FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import fonts from '../theme/fonts';
import i18n from '../locales/i18n';
import CategoryItem from '../components/CategoryItem';
import * as Animatable from 'react-native-animatable';
import { useExpenseContext } from '../contexts/ExpenseContext';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/Ionicons'

const CategoryScreen = ({ navigation, route }) => {
    const { categories, updateState } = useExpenseContext();
    const [newCategory, setNewCategory] = useState('');  // Holds the name of the newly added category

    const { locale } = useLanguage();

    const mode = route.params?.mode || 'filter';  // Keeps track of which mode the user is in (selection or filtering)

    const [prevLocale, setPrevLocale] = useState(i18n.locale);  // Keeps the previous language, used to control language change

    const addCategory = async () => {
        if (newCategory.trim() === '') return;

        if (!categories.includes(newCategory.trim())) {
            const updated = [...categories, newCategory.trim()];
            updateState({ categories: updated });
            setNewCategory('');
        }
    };

    const deleteCategory = (categoryToDelete) => {
        Alert.alert(
            i18n.t('deleteCategory'),
            i18n.t('confirmDeleteCategory'),
            [
                { text: i18n.t('cancel'), style: 'cancel' },
                {
                    text: i18n.t('delete'),
                    style: 'destructive',
                    onPress: () => {
                        const updated = categories.filter(cat => cat !== categoryToDelete);
                        updateState({ categories: updated });
                    }
                }
            ]
        );
    };
    
    useEffect(() => {
        const defaults = i18n.t('categories.default', { defaultValue: [] });
        updateState({ categories: defaults });
    }, [locale]);

    // When a category is selected, it directs to the relevant screen.
    const handleCategorySelect = (category) => {
        if (mode === 'select') {
            navigation.navigate('AddExpense', {
                selectedCategory: category,
                title: route.params?.title,
                amount: route.params?.amount,
                date: route.params?.date,
            });
        } else {
            navigation.navigate('Home', { filterCategory: category });
        }
    };



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{i18n.t('category')}</Text>
                {categories.length === 0 && (
                    <Text style={styles.emptyText}>{i18n.t('noCategories')}</Text>
                )}
            </View>

            <Animatable.View animation='fadeInUp' delay={100} duration={1000}>
            <FlatList
                data={categories}
                keyExtractor={(item, index) => `${item}-${index}`}
                // Render list items for each category (with selection and deletion operations)
                renderItem={({ item, index }) => (  
                    <CategoryItem
                        item={item}
                        onSelect={handleCategorySelect}
                        onDelete={deleteCategory}
                        align={index % 2 === 0 ? 'flex-start' : 'flex-end'}
                    />
                )}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'center', marginBottom: spacing.small }}
                contentContainerStyle={{ paddingBottom: spacing.medium }}
            />
            </Animatable.View>

            </View>
            <TextInput
                placeholder={i18n.t('addCategory')}
                value={newCategory}
                onChangeText={setNewCategory}
                style={styles.input}
                placeholderTextColor={colors.text}
            />

            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={addCategory} style={styles.saveButton}>
                    <Text style={styles.buttonText}>{i18n.t('save')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeButton}>
                    <Text style={styles.buttonText}>{i18n.t('backHome')}</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default CategoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        padding: spacing.medium,
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.large,
        marginBottom: spacing.medium,
    },
    headerTitle: {
        fontSize: fonts.xl,
        fontWeight: 'bold',
        color: colors.textLight,
        opacity: 0.7,
    },
    emptyText: {
        textAlign: 'center',
        color: colors.text,
        marginVertical: spacing.large,
        fontSize: fonts.medium,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        padding: spacing.small,
        marginBottom: spacing.small,
        borderRadius: 8,
        color: colors.text,
        marginHorizontal: spacing.small,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:spacing.medium,
        paddingHorizontal: spacing.medium,
    },
    saveButton: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 8,
        marginLeft: spacing.small,
        alignItems: 'center',
    },
    homeButton: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 8,
        marginLeft: spacing.small,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.background,
        fontSize: fonts.medium,
        fontWeight: 'bold',
    },
});