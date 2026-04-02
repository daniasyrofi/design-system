import { createApp } from 'vue'
import './styles/globals.css'
import { i18n } from './i18n'
import DocsPage from './DocsPage.vue'

createApp(DocsPage).use(i18n).mount('#docs-app')
