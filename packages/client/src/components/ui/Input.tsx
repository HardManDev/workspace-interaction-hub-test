import clsx from 'clsx'
import React, { useState } from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'

export interface InputProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    variant?: 'success' | 'danger' | 'warning' | 'primary'
}

const Input = ({ variant = 'primary', className, disabled, type, ...props }: InputProps): React.JSX.Element => {
    //#region [Section] State
    //#region Global state (stores)
    //#endregion
    //#region Local state
    const [showPassword, setShowPassword] = useState(false)
    //#endregion
    //#endregion
    //#region [Section] Handlers
    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    //#endregion
    //#region [Section] Hooks
    //#endregion

    const baseStyles = [
        'px-4 py-2 rounded-sm',
        'bg-transparent border',
        'cursor-text disabled:cursor-not-allowed',
        'disabled:opacity-35',
        'focus:outline-none focus:ring-1 focus:ring-offset-0',
        'text-text dark:text-text-dark',
        'placeholder:text-gray-400',
        // Добавляем padding-right для иконки в password
        type === 'password' && 'pr-10'
    ]

    const colorBase: Record<string, string> = {
        primary: 'border-primary text-primary focus:ring-primary',
        success: 'border-success text-success focus:ring-success',
        warning: 'border-warning text-warning focus:ring-warning',
        danger: 'border-danger text-danger focus:ring-danger'
    }

    const interactiveStyles: Record<string, Array<string>> = {
        primary: ['hover:border-primary-hover', 'active:border-primary-active'],
        success: ['hover:border-success-hover', 'active:border-success-active'],
        warning: ['hover:border-warning-hover', 'active:border-warning-active'],
        danger: ['hover:border-danger-hover', 'active:border-danger-active']
    }

    const classes = clsx(
        'input',
        `input__${variant}`,
        baseStyles,
        colorBase[variant],
        !disabled && interactiveStyles[variant],
        className
    )

    //#region [Section] Render
    return (
        <div className="relative">
            <input
                {...props}
                className={classes}
                disabled={disabled}
                type={type === 'password' && showPassword ? 'text' : type}
            />
            {type === 'password' && (
                <button
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className={clsx(
                        'absolute right-3 top-1/2 -translate-y-1/2',
                        'text-gray-400 hover:text-gray-600',
                        'disabled:opacity-35',
                        'focus:outline-none'
                    )}
                    disabled={disabled}
                    type="button"
                    onClick={handleTogglePassword}>
                    {showPassword ? (
                        <EyeClosedIcon className="h-5 w-5 cursor-pointer" />
                    ) : (
                        <EyeOpenIcon className="h-5 w-5 cursor-pointer" />
                    )}
                </button>
            )}
        </div>
    )
    //#endregion
}

export default Input
