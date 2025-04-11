# Oh! Money
<div align="center">
<img width="329" alt="image" src="./src/assets/logo.png">
</div>

### 어머니의 가르침 그대로 ! 가계부 관리 Oh! Money는 가계부 작성을 쉽고 즐겁게 도와주는 웹 서비스입니다.

👉 [oh! 머니 서비스 이용해보기](https://ohmoney.vercel.app/) <br>
🎨 [Figma 디자인 보기](https://www.figma.com/design/9hw811J4WlwLjKFF8Tohrp/오머니?node-id=276-882&p=f&t=W3jNMTcOh4n6V6dQ-0)

###  Development Environment
![VSCode](https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
---
###  Config & Package
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![json-server](https://img.shields.io/badge/json--server-000000?style=for-the-badge&logo=JSON&logoColor=white)
---
###  Frontend
![Vue.js](https://img.shields.io/badge/Vue%203-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FADA5E?style=for-the-badge&logo=pinia&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap%205-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font%20Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)
---
### Communication & Collaboration
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
---
### Version Control & Deployment
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
---
## 아키텍쳐
### 시스템 구성도
![Image](https://github.com/user-attachments/assets/a0a73050-eacb-452f-aea6-e013c69723fd)

### 디렉토리 구조
```bash

├── App.vue
├── api
│   └── analysis.js
├── assets
│   ├── background.png
│   ├── base.css
│   ├── logo.png
│   ├── main.css
│   ├── mobile_background.png
│   └── profile.png
├── components
│   ├── accounts
│   │   ├── AccountDetailTable.vue
│   │   ├── AccountFilter.vue
│   │   └── AccountHeader.vue
│   ├── calendar
│   │   ├── CalendarHeader.vue
│   │   ├── CalendarTable.vue
│   │   └── DailyAccount.vue
│   └── charts
│       ├── CategoryCircleChart.vue
│       ├── IncomeExpenseChart.vue
│       ├── MonthlyAnalysisChart.vue
│       ├── MonthlySpendingChart.vue
│       ├── ThreeMonthsAnalysisChart.vue
│       └── WeeklyAnalysisChart.vue
├── layouts
│   ├── DefaultLayout.vue
│   ├── HeaderView.vue
│   └── NavBar.vue
├── main.js
├── pages
│   ├── HomeVue.vue
│   ├── account
│   │   ├── AccountCreatePage.vue
│   │   ├── AccountEditPage.vue
│   │   ├── AccountListPage.vue
│   │   └── accountAssets
│   │       ├── AccountIcon.vue
│   │       └── AccountIconGroup.vue
│   ├── analysis
│   │   ├── AnalysisCategory.vue
│   │   ├── AnalysisDashboard.vue
│   │   └── CategoryGroup.vue
│   ├── detail
│   │   └── DetailHistory.vue
│   └── user
│       ├── SigninView.vue
│       ├── SignupView.vue
│       └── newMypageView.vue
├── router
│   └── index.js
└── stores
    ├── analysisStore.js
    ├── categoryStore.js
    ├── filterStore.js
    ├── transactionStore.js
    ├── useCalendarStore.js
    └── userStore.js
```
