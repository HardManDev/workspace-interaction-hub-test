import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { LoginDto, LoginDtoValidationErrorTokens } from '@workspace-interaction-hub/core'

import { authController } from '../../api/controllers/auth/auth.controller.ts'
import { useUserStore } from '../../store/user/user.store.ts'
import { useObjectValidation } from '../../hooks/useObjectValidation.ts'
import Input from '../ui/Input.tsx'
import Button from '../ui/Button.tsx'
import { useApi } from '../../hooks/useApi.ts'

const LoginForm = (): React.JSX.Element => {
    //#region [Section] State
    //#region Global state (stores)
    const setCurrentAuthorizedUser = useUserStore(selector => selector.setCurrentAuthorizedUser)
    //#endregion
    //#region Local state
    const navigate = useNavigate()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const loginDtoValidationObject = useObjectValidation(LoginDto, { username, password })
    const loginApi = useApi(async () => {
        return await authController.login({
            username,
            password
        })
    })
    //#endregion
    //#endregion

    //#region [Section] Handlers
    const onMount = () => {
        // toast.clearWaitingQueue()
    }

    const onUsernameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const onPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onValidationErrorsChange = () => {
        if (loginDtoValidationObject.error && loginDtoValidationObject.error.errorTokens?.length > 0) {
            loginDtoValidationObject.error.resolveActionByToken(
                LoginDtoValidationErrorTokens.USERNAME_IS_REQUIRED,
                () => {
                    toast.error('Имя пользователя не может быть пустым!', {
                        autoClose: 3000
                    })
                }
            )

            loginDtoValidationObject.error.resolveActionByToken(
                LoginDtoValidationErrorTokens.PASSWORD_IS_REQUIRED,
                () => {
                    toast.error('Пароль не может быть пустым!', {
                        autoClose: 3000
                    })
                }
            )
        }
    }

    const onLoginStatusChange = () => {
        switch (loginApi.status) {
            case 'pending':
                toast('Выполняется вход. Пожалуйста, подождите...', {
                    toastId: 'loginStatus',
                    isLoading: true
                })
                break
            case 'success':
                if (loginApi.data) {
                    setCurrentAuthorizedUser(loginApi.data)
                }

                toast.update('loginStatus', {
                    type: 'success',
                    isLoading: false,
                    autoClose: 1500,
                    render: 'Вы успешно вошли в систему!'
                })

                navigate('/')
                break
            case 'error':
                toast.update('loginStatus', {
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                    render: 'Не удалось войти в систему! Проверьте правильность введённых данных!'
                })
                break
            case 'networkError':
                toast.update('loginStatus', {
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                    render: 'Не удалось войти в систему! Проверьте подключение к сети!'
                })
                break
        }
    }

    const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const isDtoValid = await loginDtoValidationObject.validate()

        if (isDtoValid) {
            await loginApi.fetch()
        }
    }
    //#endregion

    //#region [Section] Hooks
    useEffect(onMount, [])
    useEffect(onValidationErrorsChange, [loginDtoValidationObject.error])
    useEffect(onLoginStatusChange, [loginApi.status])
    //#endregion

    //#region [Section] Render
    return (
        <form
            className="flex flex-col items-center justify-center w-full
                container max-w-md bg-white dark:bg-gray-800
                rounded-lg drop-shadow-xl p-8 space-y-6
            "
            onSubmit={onLoginSubmit}>
            <h2 className="text-2xl text-center font-medium text-gray-800 dark:text-gray-100">Вход в учётную запись</h2>
            <div className="w-full space-y-4">
                <div className="space-y-1">
                    <label className="block text-md text-gray-700 dark:text-gray-100" htmlFor="username">
                        Имя пользователя
                    </label>
                    <Input
                        className="w-full"
                        disabled={loginApi.status === 'pending'}
                        id="username"
                        placeholder="Введите имя пользователя"
                        type="text"
                        value={username}
                        variant={
                            loginDtoValidationObject.error?.checkErrorToken(
                                LoginDtoValidationErrorTokens.USERNAME_IS_REQUIRED
                            )
                                ? 'danger'
                                : 'primary'
                        }
                        onChange={onUsernameInputChange}
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-md text-gray-700 dark:text-gray-100" htmlFor="password">
                        Пароль
                    </label>
                    <Input
                        className="w-full"
                        disabled={loginApi.status === 'pending'}
                        id="password"
                        placeholder="Введите пароль"
                        type="password"
                        value={password}
                        variant={
                            loginDtoValidationObject.error?.checkErrorToken(
                                LoginDtoValidationErrorTokens.PASSWORD_IS_REQUIRED
                            )
                                ? 'danger'
                                : 'primary'
                        }
                        onChange={onPasswordInputChange}
                    />
                </div>
                <Button
                    className="w-full mt-2"
                    disabled={
                        loginApi.status === 'pending' || username.trim().length < 1 || password.trim().length < 1
                    }>
                    {loginApi.status === 'pending' ? 'Вход...' : 'Войти'}
                </Button>
            </div>
        </form>
    )
    //#endregion
}

export default LoginForm
