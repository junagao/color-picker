import {defineConfig, loadEnv} from 'vite'
import {VitePluginRadar} from 'vite-plugin-radar'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}

  console.log('debug', process.env.GA_TRACKING_ID)

  return defineConfig({
    plugins: [
      react(),
      VitePluginRadar({
        analytics: {
          id: process.env.GA_TRACKING_ID,
        },
      }),
    ],
  })
}
