import clsx from 'clsx'
import React from 'react'

import LoginForm from '../components/forms/LoginForm.tsx'

export interface LoginPageProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string
}

const LoginPage = ({ ...props }: LoginPageProps): React.JSX.Element => {
    //#region [Section] Render
    return (
        <div
            {...props}
            className={clsx(
                'page page__login',
                props.className,
                'flex items-center justify-center h-screen'
            )}
        >
            <LoginForm />
        </div>
    )
    //#endregion
}

export default LoginPage
