import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ShoppingScreen = () => {
    return (
        <View>
            <Text>Shopping</Text>
            <TouchableOpacity onPress={() => {
                router.navigate('/browser')
            }}>
                <Text>Click me</Text>
            </TouchableOpacity>
            <MaterialCommunityIcons name="cart" size={24} color="black" />
        </View>
    );
};

export default ShoppingScreen;
