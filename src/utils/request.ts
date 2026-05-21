import axios, { type AxiosRequestConfig } from 'axios'

/** 标准 API 返回结构 */
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

/** 文章数据模型 */
export interface ArticleRecord {
  id: number
  image: string
  slug: string
  title: string
  date: string
  category: string
  readTime: string
  excerpt: string
  content: string
}

// ======================== Axios 实例 ========================

/** 创建 axios 实例，指向 json-server */
const http = axios.create({
  baseURL: 'http://localhost:4396',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// ======================== 请求拦截器 ========================
http.interceptors.request.use((config) => {
  // 从本地存储读取 token，自动注入 Authorization 头
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ======================== 响应拦截器 ========================
http.interceptors.response.use(
  // 成功响应直接透传
  (res) => res,
  // HTTP 错误统一处理
  (err) => {
    const status = err.response?.status ?? '网络错误'
    const msg = `[请求失败] HTTP 状态码: ${status}\n信息: ${err.message ?? '未知错误'}`
    console.error(`[API] ${msg}`)

    // 401 未授权：清除 token 并重定向至首页
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject(err)
  },
)

// ======================== 请求方法封装 ========================

/** GET 请求 */
export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await http.get<T>(url, config)
  return res.data
}

/** POST 请求 */
export async function post<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await http.post<T>(url, data, config)
  return res.data
}

/** PUT 请求 */
export async function put<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await http.put<T>(url, data, config)
  return res.data
}

/** DELETE 请求 */
export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await http.delete<T>(url, config)
  return res.data
}

export default http
