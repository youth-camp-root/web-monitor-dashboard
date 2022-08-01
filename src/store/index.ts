import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/userinfo';
import useTabBarStore from './modules/tab-bar';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore };
export default pinia;
