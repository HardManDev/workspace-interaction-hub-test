import clsx from 'clsx'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { HttpErrorViewModel } from '@workspace-interaction-hub/core'
import { useLocation, useNavigate } from 'react-router-dom'

import { authController } from '../api/controllers/auth/auth.controller.ts'
import { useUserStore } from '../store/user/user.store.ts'
import { useApi } from '../hooks/useApi.ts'

export interface AuthPageProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string
}

const AuthPage = ({ ...props }: AuthPageProps): React.JSX.Element => {
    //#region [Section] State
    //#region Global state (stores)
    const setCurrentAuthorizedUser = useUserStore(selector => selector.setCurrentAuthorizedUser)
    //#endregion
    //#region Local state
    const location = useLocation()
    const from = (location.state as { from?: Location })?.from?.pathname || '/'

    const navigate = useNavigate()
    const apiAuth = useApi(async () => {
        return await authController.auth()
    })
    //#endregion
    //#endregion
    //#region [Section] Handlers
    const onMount = () => {
        apiAuth.fetch().then()
    }

    const onApiAuthStatusChange = () => {
        switch (apiAuth.status) {
            case 'pending':
                toast('Выполняется авторизация. Пожалуйста, подождите...', {
                    toastId: 'apiAuthStatus',
                    isLoading: true
                })
                break
            case 'success':
                if (apiAuth.data) {
                    setCurrentAuthorizedUser(apiAuth.data)

                    toast.update('apiAuthStatus', {
                        type: 'success',
                        isLoading: false,
                        autoClose: 1500,
                        render: `Добро пожаловать, ${apiAuth.data.username}!`
                    })
                }

                navigate(from, { replace: true })
                break
            case 'error':
                if (apiAuth.error && apiAuth.error instanceof HttpErrorViewModel && apiAuth.error.statusCode === 403) {
                    toast.update('apiAuthStatus', {
                        isLoading: true,
                        render: 'Не удалось выполнить авторизацию. Перенаправление на страницу входа...'
                    })

                    navigate('/login')
                    toast.update('apiAuthStatus', {
                        type: 'info',
                        isLoading: false,
                        autoClose: 1500,
                        render: 'Пожалуйста, авторизуйтесь используя свои учётные данные!'
                    })
                    return
                }

                toast.update('apiAuthStatus', {
                    type: 'error',
                    isLoading: false,
                    render: 'Не удалось выполнить авторизацию. Неизвестная ошибка! Обратитесь к администратору!'
                })
                break
            case 'networkError':
                toast.update('apiAuthStatus', {
                    type: 'error',
                    isLoading: false,
                    render: 'Не удалось выполнить авторизацию. Проверьте подключение к сети!'
                })
                break
        }
    }
    //#endregion
    //#region [Section] Hooks
    useEffect(onMount, [])
    useEffect(onApiAuthStatusChange, [apiAuth.status])
    //#endregion

    //#region [Section] Render
    return <div {...props} className={clsx('page page__auth', props.className)}></div>
    //#endregion
}

export default AuthPage
