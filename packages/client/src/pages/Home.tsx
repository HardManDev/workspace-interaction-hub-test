import clsx from 'clsx'
import React from 'react'

import { useUserStore } from '../store/user/user.store'

export interface HomePageProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string
}

const HomePage = (
    {
        className,
        ...props
    }: HomePageProps
): React.JSX.Element => {
    //#region [Section] State
    //#region Global state (stores)
    const currentAuthorizedUser = useUserStore((selector) => selector.currentAuthorizedUser)
    //#endregion
    //#region Local state
    //#endregion
    //#endregion
    //#region [Section] Handlers
    //#endregion
    //#region [Section] Hooks
    //#endregion

    //#region [Section] Render
    return (
        <div
            {...props}
            className={clsx(
                'page page_home',
                className,
                'flex items-center justify-center h-screen bg-transparent'
            )}
        >
            <h1 className="text-2xl text-center font-medium text-gray-800 dark:text-gray-100">
                Добро пожаловать, {currentAuthorizedUser?.username}!
            </h1>
        </div>
    )
    //#endregion
}

export default HomePage
