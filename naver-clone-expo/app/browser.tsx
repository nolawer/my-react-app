// ============================================================================
// IMPORT 문 - 필요한 라이브러리들을 가져옵니다
// ============================================================================

// React 라이브러리 - UI 컴포넌트를 만들기 위한 기본 라이브러리
import React from 'react';

// React Native 기본 컴포넌트들
// - View: 레이아웃을 담는 컨테이너 (div 같은 역할)
// - Text: 텍스트를 표시하는 컴포넌트
import { View, Text } from 'react-native';

// Expo Router에서 URL 파라미터를 가져오는 훅
// 이전 화면에서 전달한 데이터를 받을 때 사용
import { useLocalSearchParams } from 'expo-router';

// StyleSheet: 스타일을 정리하는 도구
// CSS의 class처럼 스타일을 재사용할 수 있게 해줌
import { StyleSheet } from 'react-native';

// SafeAreaView: 아이폰 노치나 하단 홈 인디케이터 영역을 피해서 렌더링
// 화면의 안전한 영역에만 내용을 표시함
import { SafeAreaView } from 'react-native-safe-area-context';

// WebView: 웹 페이지를 앱 안에서 보여주는 컴포넌트
// 마치 앱 안에서 브라우저를 여는 것과 같음
import WebView from 'react-native-webview';

// React 훅들 (useState, useMemo, useRef, useEffect)
// - useState: 컴포넌트의 상태(변수)를 관리 (값이 바뀌면 화면이 다시 그려짐)
// - useMemo: 연산을 캐싱해서 성능 향상 (계산된 값을 저장해둠)
// - useRef: 컴포넌트가 다시 그려져도 값을 유지하는 ref 생성
// - useEffect: 부작용(side effect)을 다루는 훅 (데이터 가져오기, 이벤트 리스너 등)
import { useState, useMemo, useRef, useEffect } from 'react';

// React Native Reanimated: 부드러운 애니메이션을 위한 라이브러리
// - useSharedValue: 애니메이션에서 사용할 값을 생성 (0~1 사이의 진행도 값)
// - useAnimatedStyle: 애니메이션 스타일을 만드는 함수
// - withTiming: 부드럽게 값이 변하도록 하는 애니메이션 함수
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// ============================================================================
// STYLE 정의 - 화면에 보일 UI 요소들의 디자인을 정의
// ============================================================================

const styles = StyleSheet.create({
    // safeArea: 전체 화면을 감싸는 컨테이너 스타일
    safeArea: { 
        flex: 1,  // flex: 1 = 남은 공간을 모두 차지 (100% 공간 사용)
        backgroundColor: 'black',  // 배경색을 검은색으로 설정
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    
    // urlTitle: 화면 상단에 표시될 URL 도메인을 보여주는 텍스트 스타일
    urlTitle: {
        fontSize: 12,              // 글자 크기 12
        backgroundColor: 'gray',     // 배경색 회색
        fontWeight: 'bold',         // 글자 굵게
        color: 'white',             // 글자색 흰색
        padding: 10,                // 안쪽 여백 10
        textAlign: 'center',        // 글자 중앙 정렬
    },
    
    // loadingBarBackground: 로딩 바의 배경 (전체 영역)
    loadingBarBackground: {
        backgroundColor: 'black',     // 배경색 빨강
        height: 10,                 // 높이 10
    },
    
    // loadingBar: 실제 로딩 진행 상황을 보여주는 막대
    loadingBar: {
        backgroundColor: 'orange',    // 배경색 파랑
        height: 10,                 // 높이 10
        width: '50%',               // 초기 너비 50% (나중에 애니메이션으로 변경됨)
    },
});

// ============================================================================
// BrowserScreen 컴포넌트 - 브라우저 화면을 렌더링하는 메인 컴포넌트
// ============================================================================

const BrowserScreen = () => {
    // 1. URL 파라미터 받아오기
    // ========================================================================
    // useLocalSearchParams(): 이전 화면에서 전달한 데이터를 가져옴
    // 예: router.push({ pathname: '/browser', params: { initialUrl: 'https://naver.com' } })
    // 그러면 params.initialUrl = 'https://naver.com' 이 됨
    const params = useLocalSearchParams();
    console.log("params======", params);  // 디버깅을 위해 값 확인

    // 2. 상태 관리: 현재 URL 주소
    // ========================================================================
    // useState: 컴포넌트의 상태(변하는 값)를 관리
    // - url: 현재 웹페이지의 주소 (초기값은 params에서 받아온 주소)
    // - setUrl: url 값을 변경하는 함수 (웹페이지를 이동하면 자동으로 바뀜)
    // as string: TypeScript 문법. "이 값은 문자열이다"라고 타입을 명시
    const [url, setUrl] = useState(params.initialUrl as string);
    
    // 3. URL에서 도메인만 추출하기
    // ========================================================================
    // useMemo: 비용이 큰 계산을 캐싱해서 성능을 향상시킴
    // url이 바뀔 때만 안의 함수를 실행하고, 값이 같으면 기존 결과를 재사용
    const UrlTitle = useMemo(() => {
        // url 예시: "https://www.naver.com/some/page"
        // split('/'): ["https:", "", "www.naver.com", "some", "page"]
        // [2]: 세 번째 요소인 "www.naver.com" (인덱스는 0부터 시작)
        return url.split('/')[2];
    }, [url]);  // url이 바뀔 때만 다시 계산
    console.log("UrlTitle======", UrlTitle);  // 디버깅

    // 4. 로딩 진행도 애니메이션을 위한 값 생성
    // ========================================================================
    // useSharedValue: 애니메이션이 사용할 값을 생성 (0~1 사이)
    // progress.value = 0.5 라면 50% 로딩 완료를 의미
    const progress = useSharedValue(0);  // 초기값 0 (아직 로딩 안 됨)
    
    // 로딩 상태 관리: true = 로딩 중, false = 로딩 완료
    const [isLoading, setIsLoading] = useState(true);

    // 5. 애니메이션 스타일 정의
    // ========================================================================
    // useAnimatedStyle: 애니메이션 값에 따라 스타일이 자동으로 변경됨
    const animatedStyle = useAnimatedStyle(() => {
        return {
            // progress.value가 0.5라면 → width는 "50%"
            // progress.value가 1.0이라면 → width는 "100%"
            width: `${progress.value * 100}%`,
            // progress가 1이 되면 투명하게 만들어서 사라지게 함
            opacity: progress.value >= 1 ? 0 : 1,
        };
    });

    // ========================================================================
    // JSX 반환: 실제 화면에 보이는 UI를 구성
    // ========================================================================
    
    return (
        // SafeAreaView: 아이폰 노치 등을 피해서 안전하게 렌더링
        <SafeAreaView 
        style={styles.safeArea}      // 위에서 정의한 스타일 적용
        edges={['bottom']}            // 하단만 안전 영역 적용 (상단은 헤더가 있어서)
        >
            {/* URL 표시 영역 */}
            <View>
                {/* 현재 웹페이지의 도메인을 보여줌 (예: "www.naver.com") */}
                <Text style={styles.urlTitle}>{UrlTitle}</Text>
            </View>
            
            {/* 로딩 진행 바 영역 - 로딩 중일 때만 표시 */}
            {isLoading && (
                <View style={styles.loadingBarBackground}>
                    {/* 
                        Animated.View: reanimated로 애니메이션되는 View
                        웹페이지 로딩이 진행될수록 파란색 바가 좌→우로 증가
                        로딩 완료 시 opacity가 0이 되어 사라짐
                    */}
                    <Animated.View 
                    style={[
                        styles.loadingBar,     // 기본 스타일 (파란색, 높이 10)
                        animatedStyle           // 애니메이션 스타일 (width가 동적으로 변함)
                    ]}
                    >
                    </Animated.View>
                </View>
            )}
            
            {/* 
                WebView: 실제 웹페이지를 보여주는 컴포넌트
                - source: 보여줄 웹페이지 주소
                - showsVerticalScrollIndicator={false}: 세로 스크롤바 숨김
                - showsHorizontalScrollIndicator={false}: 가로 스크롤바 숨김
                
                주요 이벤트:
                - onNavigationStateChange: 웹페이지 내비게이션 변경 (링크 클릭 등)
                - onLoadProgress: 로딩 진행도 (0~1)
                - onLoadStart: 로딩 시작
                - onLoadEnd: 로딩 완료
            */}
            <WebView 
            source={{ uri: params.initialUrl as string }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onNavigationStateChange={(navState) => {
                // 사용자가 링크를 클릭하거나 뒤로/앞으로 버튼을 누르면 navState.url에 새로운 URL이 들어옴
                setUrl(navState.url);
            }}
            onLoadProgress={(event) => {
                // event.nativeEvent.progress는 0~1 사이의 로딩 진행도 (0 = 시작, 1 = 완료)
                const newProgress = event.nativeEvent.progress;
                console.log("event======", newProgress);
                // progress.value에 새 값을 부드럽게 애니메이션해서 적용
                progress.value = withTiming(newProgress);
            }}
            onLoadEnd={() => {
                // 페이지 로딩이 완전히 끝났을 때 실행됨
                console.log("onLoadEnd======");
                setIsLoading(false);
            }}
            onLoadStart={() => {
                // 새 페이지 로딩이 시작될 때 실행됨
                setIsLoading(true);
                progress.value = 0;
            }}
            />
        </SafeAreaView>
        
    );
};

// ============================================================================
// EXPORT - 이 컴포넌트를 다른 파일에서 사용할 수 있게 내보냄
// ============================================================================
// export default: 이 파일에서 BrowserScreen 컴포넌트를 외부로 내보냄
// 다른 파일에서 import BrowserScreen from './browser' 처럼 가져다 쓸 수 있음

export default BrowserScreen;
