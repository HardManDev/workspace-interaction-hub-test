import clsx from 'clsx'
import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'success' | 'danger' | 'warning' | 'primary'
    modifier?: 'solid' | 'outline'
}

const Button = ({
    variant = 'primary',
    modifier = 'solid',
    className,
    children,
    disabled,
    ...props
}: ButtonProps): React.JSX.Element => {
    //#region [Section] State
    //#region Global state (stores)
    //#endregion
    //#region Local state
    //#endregion
    //#endregion
    //#region [Section] Handlers
    //#endregion
    //#region [Section] Hooks
    //#endregion

    const isSolid = modifier === 'solid'
    const isOutline = modifier === 'outline'

    const baseStyles = [
        'py-2 px-4 rounded-sm font-semibold drop-shadow-md',
        'cursor-pointer disabled:cursor-not-allowed',
        'disabled:opacity-35 disabled:drop-shadow-none',
        isSolid && 'text-text-on-primary',
        isOutline && 'bg-transparent border'
    ]

    const colorBase: Record<string, string> = {
        primary: isOutline ? 'border-primary text-primary' : 'bg-primary border-primary',
        success: isOutline ? 'border-success text-success' : 'bg-success border-success',
        warning: isOutline ? 'border-warning text-warning' : 'bg-warning border-warning',
        danger: isOutline ? 'border-danger text-danger' : 'bg-danger border-danger'
    }

    const interactiveStyles: Record<string, Array<string>> = {
        primary: isOutline
            ? [
                  'hover:bg-primary',
                  'hover:text-text-on-primary',
                  'active:bg-primary-active',
                  'active:text-text-on-primary'
              ]
            : ['hover:bg-primary-hover', 'active:bg-primary-active'],
        success: isOutline
            ? [
                  'hover:bg-success',
                  'hover:text-text-on-primary',
                  'active:bg-success-active',
                  'active:text-text-on-primary'
              ]
            : ['hover:bg-success-hover', 'active:bg-success-active'],
        warning: isOutline
            ? [
                  'hover:bg-warning',
                  'hover:text-text-on-primary',
                  'active:bg-warning-active',
                  'active:text-text-on-primary'
              ]
            : ['hover:bg-warning-hover', 'active:bg-warning-active'],
        danger: isOutline
            ? [
                  'hover:bg-danger',
                  'hover:text-text-on-primary',
                  'active:bg-danger-active',
                  'active:text-text-on-primary'
              ]
            : ['hover:bg-danger-hover', 'active:bg-danger-active']
    }

    const classes = clsx(
        'btn',
        `btn__${variant}_${modifier}`,
        baseStyles,
        colorBase[variant],
        !disabled && interactiveStyles[variant],
        className
    )

    //#region [Section] Render
    return (
        <button {...props} className={classes} disabled={disabled}>
            {children}
        </button>
    )
    //#endregion
}

export default Button
