import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        allowedHosts: ['wih.hardman-dev.cc', 'wih.local', '*.trycloudflare.com', 'host.docker.internal'],
        host: true
    }
})
