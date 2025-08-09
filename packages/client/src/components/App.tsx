import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import HomePage from '../pages/Home.tsx'
import AuthPage from '../pages/Auth.tsx'
import LoginPage from '../pages/Login.tsx'
import { useUserStore } from '../store/user/user.store.ts'
import NotFound from '../pages/NotFound.tsx'

const App = () => {
    const currentAuthorizedUser = useUserStore(selector => selector.currentAuthorizedUser)

    return (
        <div
            className="relative w-full h-screen
            bg-gray-100 dark:bg-gray-900">
            <ToastContainer
                autoClose={3000}
                closeOnClick={false}
                draggable={false}
                hideProgressBar={false}
                limit={3}
                pauseOnFocusLoss={false}
                pauseOnHover={true}
                position="top-center"
                toastStyle={{ width: '100%', boxSizing: 'border-box' }}
            />

            <BrowserRouter>
                <Routes>
                    {currentAuthorizedUser ? (
                        <Route element={<HomePage />} path="/*" />
                    ) : (
                        <>
                            <Route element={<AuthPage />} path="/auth" />
                            <Route element={<LoginPage />} path="/login" />
                            <Route element={<NotFound />} path="/test" />
                        </>
                    )}
                </Routes>

                <AuthPage />
            </BrowserRouter>
        </div>
    )
}

export default App
