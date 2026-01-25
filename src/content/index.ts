/**
 * Content Layer Index
 * 內容層統一入口
 * 
 * 所有頁面的內容配置都從這裡導出
 * 便於快速換皮和管理
 */

// 首頁內容
export * from "./home";

// 定價頁內容
export * from "./pricing";

// 重新導出常用配置
export { siteConfig } from "@/config/site-config";


