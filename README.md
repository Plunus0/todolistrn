# TodoList (by React Native)

React Native로 프론트엔드를 작성하고 Spring Boot로 API 서버를 만들어 두 프로젝트를 조합해 실행시켜 본다.

---

## 리액트 네이티브란?

- **리액트**: Meta(구 페이스북)가 개발한 웹 개발 JavaScript 라이브러리.
- **네이티브**: 각 플랫폼의 기본 언어와 기술로 작성된 앱.
- **리액트 네이티브**: 리액트를 기반으로 네이티브 앱을 개발할 수 있는 프레임워크.

---

## How to Install

### 1. Node.js 설치

- [Node.js 다운로드](https://nodejs.org/ko)
- 설치 후 버전 확인:
  ```bash
  node --version
  ```
  - **Node.js란?**
    Node.js는 브라우저 환경 밖에서 JavaScript 또는 TypeScript를 실행할 수 있도록 도와주는 JavaScript 런타임 환경입니다. JVM(Java Virtual Machine)이 Java를 실행하는 것처럼, Node.js는 JavaScript를 실행할 수 있는 환경을 제공합니다.
    - **주요 구성 요소**:
      - **V8 엔진**: Google Chrome에서 사용되는 JavaScript 엔진으로, JavaScript 코드를 빠르게 실행.
      - **내장 라이브러리**: 파일 시스템, HTTP 등 기본적인 기능을 제공.
      - **npm**: Node.js의 패키지 매니저로, 오픈소스 라이브러리를 쉽게 설치하고 관리할 수 있음.
    - **TSX란?**
      TSX는 TypeScript와 JSX(JavaScript XML)가 결합된 확장자로, 타입 안정성과 React 컴포넌트 개발을 위한 XML 기반의 태그 표현을 지원합니다.

### 2. Chocolatey 설치

- [Chocolatey 설치 가이드](https://chocolatey.org/)
- 관리자 권한으로 PowerShell 실행 후 설치 스크립트를 실행.

### 3. JDK 설치

- Chocolatey로 설치:
  ```bash
  choco install -y openjdk11
  ```
- 설치 확인:
  ```bash
  java -version
  javac -version
  ```

### 4. Android Studio 설치

- [Android Studio 다운로드](https://developer.android.com/studio?hl=ko)
- 설치 시 다음 항목을 선택:
  - **SDK Components**: Android SDK, Android SDK Platform, Android Virtual Device.
  - **SDK Platforms**: Android SDK Platform 30, Google APIs, Google Play System Image.
  - **SDK Tools**: Android SDK Build-Tools 30.0.2, Platform-Tools, Emulator 등.

### 5. 환경 변수 설정

- **ANDROID_HOME**:
  - `%LOCALAPPDATA%\Android\Sdk`
- **Path**:
  - `%LOCALAPPDATA%\Android\Sdk\platform-tools`
- PowerShell에서 확인:
  ```bash
  Get-ChildItem -Path Env:\
  ```

### 6. Android Emulator 설정

- Android Studio의 **Virtual Device Manager**에서 디바이스 생성 (예: Pixel 4 + API 33).
- 에뮬레이터 실행 문제 시 [Visual C++ Redistributable 최신 버전](https://learn.microsoft.com/ko-kr/cpp/windows/latest-supported-vc-redist?view=msvc-170) 설치.

### 7. VS Code 설치

- [VS Code 다운로드](https://code.visualstudio.com/download).

---

## 프로젝트 생성 및 실행

1. 프로젝트 생성:

   ```bash
   npx create-expo-app@latest
   ```

2. 프로젝트 디렉토리 이동:

   ```bash
   cd 프로젝트명
   ```

3. 프로젝트 리셋:

   ```bash
   npm run reset-project
   ```

4. 프로젝트 실행:

   ```bash
   npm run start
   ```

5. 에뮬레이터 실행:
   - 실행 상태에서 `a`를 눌러 Android Studio 연결.
   - `r`을 눌러 리로드.

---

\*프로젝트 설정 및 실행과 관련된 모든 명령어는 `package.json`에서 확인할 수 있습니다.

## 추천 확장 프로그램

1. **Prettier**: 코드 스타일 자동 포맷팅.
2. **ESLint**: 코드 스타일 및 문법 오류 검사.
3. **ES7+ Snippets**: 자주 사용하는 코드 스니펫 제공.

---

## 리액트 네이티브 주요 태그

### 파일 기반 라우팅 (React Navigation)

- React Native에서는 파일 경로에 따라 화면이 매핑됩니다. 다음은 파일 기반 라우팅에서 자주 사용하는 태그와 옵션들입니다:

- **`<Stack>`**:

  - 계층 구조 기반으로 화면을 관리하는 컨테이너로, 각 화면을 스택 형식으로 쌓아 올립니다.
  - 주로 화면 전환이 필요한 경우 사용됩니다.

- **`<Tabs>`**:

  - 하단에 탭 네비게이션 바를 생성하여 여러 화면 간 전환을 제공합니다.
  - 예: 홈, 검색, 설정 등의 하단 탭 구성.

- **`<Drawer>`**:

  - 화면 좌측 또는 우측에서 슬라이드로 열리는 메뉴를 제공하는 네비게이션 컨테이너.
  - 설정 메뉴나 부가적인 기능을 표시하는 데 유용합니다.
  - 주요 속성:
    - `drawerType`: 슬라이드 방식 (예: `front`, `back`, `slide`).
    - `initialRouteName`: 첫 화면 지정.
    - `screenOptions`: Drawer 전반의 옵션.

- **`<Stack.Screen>`**:

  - 개별 화면을 정의하는 태그로, 화면의 이름(`name`)과 컴포넌트를 지정합니다.
  - 주요 속성:
    - `name`: 라우트 이름.
    - `component`: 렌더링할 컴포넌트.

- **`<Tabs.Screen>`**:
  - 탭 네비게이션에서 개별 탭을 정의하는 태그입니다.
  - 주요 속성:
    - `name`: 탭의 이름.
    - `component`: 렌더링할 컴포넌트.

### 주요 태그와 속성 요약

- **Stack Navigation 주요 속성**:

  - `initialRouteName`: 첫 화면 지정.
  - `screenOptions`: 모든 화면에 공통으로 적용할 옵션.
  - `headerShown`: 헤더 표시 여부.
  - `presentation`: 화면 전환 방식 (예: `modal`, `card`).

- **Drawer Navigation 주요 속성**:

  - `drawerType`: Drawer 열림 방식 설정.
  - `overlayColor`: Drawer가 열릴 때의 오버레이 색상.
  - `headerShown`: Drawer와 함께 사용할 헤더 표시 여부.

- **기본 태그**:
  - `<View>`: 화면 레이아웃을 구성하는 기본 컨테이너로, CSS 스타일을 적용하여 영역을 정의합니다.
  - `<Text>`: 텍스트를 표시하는 태그로, 스타일을 사용해 폰트, 크기 등을 조정할 수 있습니다.
  - `<TextInput>`: 사용자 입력을 받을 수 있는 태그로, 기본 텍스트 입력 필드입니다.
  - `<Button`: 간단한 클릭 이벤트를 처리하는 버튼 컴포넌트입니다.
  - `<Pressable>`: 터치 이벤트를 처리하는 태그로, 커스터마이즈가 가능한 버튼으로 자주 사용됩니다.
  - `<Image>`: 이미지를 렌더링하는 태그로, 네트워크 또는 로컬 이미지를 불러올 수 있습니다.
  - `<ScrollView>`: 스크롤이 가능한 영역을 제공합니다. 화면 크기를 초과하는 콘텐츠를 표시할 때 유용합니다.
  - `<FlatList>`: 긴 리스트를 효율적으로 렌더링할 수 있는 컴포넌트로, 가상 DOM과 비슷하게 필요한 아이템만 렌더링합니다.
  - `<SectionList>`: 여러 섹션으로 나뉜 데이터를 표시할 때 사용되는 컴포넌트로, 각 섹션의 헤더와 아이템을 관리.
