import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        allowedHosts: [
            'wih.hardman-dev.cc', // твой Cloudflare домен
            '*.trycloudflare.com', // на случай quick tunnel,c
            'host.docker.internal'
        ],
        host: true // чтобы слушал на всех интерфейсах
    }
})
