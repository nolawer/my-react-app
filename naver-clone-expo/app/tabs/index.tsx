import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
  });

const HomeScreen = () => {
    return (
        // <View>
        //     <Text>Home</Text>
        // </View>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <WebView 
            source={{ uri: 'https://www.naver.com' }} 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onShouldStartLoadWithRequest={(request) => {
                // console.log(request.url);
                if (
                  request.url.startsWith('https://m.naver.com/')
                ) {
                    // console.log('true', request.url);
                  return true;
                }

                if (request.url != null && request.url.startsWith('https://')){
                    // console.log('false', request.url);
                    router.push({ pathname: '/browser', params: { initialUrl: request.url } });
                    return false;
                }
                return true;
              }}
            
        />
        </SafeAreaView>
    );
};

export default HomeScreen;
