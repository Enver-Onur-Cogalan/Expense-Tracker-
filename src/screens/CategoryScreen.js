// CategoryScreen.js
// Screen where the user can list and manage expense categories.

import React, { useCallback, useEffect, useState } from 'react';
import spacing from '../theme/spacing';
import colors from '../theme/colors';
import { FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import fonts from '../theme/fonts';
import i18n from '../locales/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import CategoryItem from '../components/CategoryItem';
import * as Animatable from 'react-native-animatable';

const CategoryScreen = ({ navigation, route }) => {
    const [categories, setCategories] = useState([]);  // Keeps the category list
    const [newCategory, setNewCategory] = useState('');  // Holds the name of the newly added category

    const mode = route.params?.mode || 'filter';  // Keeps track of which mode the user is in (selection or filtering)

    const [prevLocale, setPrevLocale] = useState(i18n.locale);  // Keeps the previous language, used to control language change

    const defaultCategories = {
        tr: ['Gıda', 'Ulaşım', 'Eğlence', 'Kişisel Bakım', 'Sağlık'],
        en: ['Food', 'Transport', 'Entertainment', 'Personal Care', 'Health'],
    };

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const storedCategories = await AsyncStorage.getItem('categories');
                if (storedCategories) {
                    setCategories(JSON.parse(storedCategories));
                } else {
                    const defaults = defaultCategories[i18n.locale] || [];
                    await AsyncStorage.setItem('categories', JSON.stringify(defaults));
                    setCategories(defaults);
                }
            } catch (error) {
                console.log('An error occurred while loading categories:', error);
            }
        };

        loadCategories();
    }, []);


    // Refreshes the categories every time the screen is focused.
    useFocusEffect(
        useCallback(() => {
            const fetchCategories = async () => {
                try {
                    const storedCategories = await AsyncStorage.getItem('categories');
                    if (storedCategories) {
                        setCategories(JSON.parse(storedCategories));
                    }
                } catch (error) {
                    console.log("Error loading category in Focus:", error);
                }
            };

            fetchCategories();
        }, [])
    );

    // Updates default categories when language changes.
    useEffect(() => {
        const updatedCategoriesForLanguageChange = async () => {
            try {
                const storedCategories = await AsyncStorage.getItem('categories');
                const currentCategories = storedCategories ? JSON.parse(storedCategories) : [];

                const allDefaults = [...defaultCategories['tr'], ...defaultCategories['en']];

                const userAddedCategories = currentCategories.filter(cat => !allDefaults.includes(cat));

                const newDefaults = defaultCategories[i18n.locale] || [];

                const updatedCategories = [...newDefaults, ...userAddedCategories];

                await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
                setCategories(updatedCategories);
            } catch (error) {
                console.log('An error occurred while updating categories on language change:', error)
            }
        };
        updatedCategoriesForLanguageChange();
    }, [i18n.locale]);


    // When the category list changes, it saves the new list to AsyncStorage.
    useEffect(() => {
        const saveCategories = async () => {
            try {
                await AsyncStorage.setItem('categories', JSON.stringify(categories));
            } catch (error) {
                console.log('An error occurred while saving categories:', error);
            }
        };

        if (categories.length > 0) {
            saveCategories();
        }
    }, [categories]);


    // Adds new category and saves it to AsyncStorage.
    const addCategory = async () => {
        if (newCategory.trim() === '') return;

        try {
            const storedCategories = await AsyncStorage.getItem('categories');
            const currentCategories = storedCategories ? JSON.parse(storedCategories) : [];

            if (!currentCategories.includes(newCategory.trim())) {
                const updatedCategories = [...currentCategories, newCategory.trim()];
                await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
                setCategories(updatedCategories);
                setNewCategory('');
            }
        } catch (error) {
            console.log('An error occurred while adding a category:', error);
        }
    };

    // Deletes the selected category and updates the AsyncStorage.
    const deleteCategory = (categoryToDelete) => {
        Alert.alert(
            i18n.t('deleteCategory'),
            i18n.t('confirmDeleteCategory'),
            [
                { text: i18n.t('cancel'), style: 'cancel' },
                {
                    text: i18n.t('delete'),
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const storedCategories = await AsyncStorage.getItem('categories');
                            const currentCategories = storedCategories ? JSON.parse(storedCategories) : [];

                            const updatedCategories = currentCategories.filter(cat => cat !== categoryToDelete);
                            await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
                            setCategories(updatedCategories);
                        } catch (error) {
                            console.log('An error occurred while deleting a category:', error);
                        }
                    }
                }
            ]
        );
    };


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
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{i18n.t('category')}</Text>
            </View>

            <View style={styles.listContainer}>
                {categories.length === 0 && (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: colors.text }}>
                        {i18n.t('noCategories')}
                    </Text>
                )}
            </View>

            <Animatable.View animation='fadeInUp' delay={100} duration={1000}>
            <FlatList
                data={categories}
                keyExtractor={(item, index) => `${item}-${index}`}
                // Render list items for each category (with selection and deletion operations)
                renderItem={({ item }) => (  
                    <CategoryItem
                        item={item}
                        onSelect={handleCategorySelect}
                        onDelete={deleteCategory}
                    />
                )}
            />
            </Animatable.View>

            <TextInput
                placeholder={i18n.t('addCategory')}
                value={newCategory}
                onChangeText={setNewCategory}
                style={styles.input}
                placeholderTextColor={colors.text}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={addCategory} style={styles.addCategoryButton}>
                    <Text style={styles.buttonText}>{i18n.t('save')}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.addCategoryButton}>
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
    title: {
        fontSize: fonts.xl,
        fontWeight: 'bold',
        marginBottom: spacing.medium,
        color: colors.text,
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
        fontWeight: '600',
        color: colors.textLight,
        opacity: 0.7,
    },
    listContainer: {
        flex: 1,
    },
    categoryItem: {
        padding: spacing.medium,
        marginBottom: spacing.small,
        borderRadius: 8,
    },
    categoryText: {
        color: '#fff',
        fontSize: fonts.large,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        padding: spacing.small,
        marginBottom: spacing.small,
        borderRadius: 6,
        color: colors.text,
    },
    buttonContainer: {
        marginTop: spacing.small,
    },
    catergoryItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        padding: spacing.medium,
        marginBottom: spacing.small,
    },
    addCategoryButton: {
        backgroundColor: colors.primary,
        padding: spacing.medium,
        borderRadius: spacing.small,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.small,
    },
    buttonText: {
        color: colors.background,
        fontSize: fonts.medium,
        fontWeight: 'bold',
    },
});