import { create } from 'zustand'
import type { UserEntityViewModel } from '@workspace-interaction-hub/core'
import { devtools } from 'zustand/middleware'

export interface IUserStore {
    currentAuthorizedUser?: UserEntityViewModel,
    setCurrentAuthorizedUser: (user: UserEntityViewModel) => void
}

export const useUserStore = create<IUserStore>()(
    devtools((set) => {
        return {
            currentAuthorizedUser: undefined,
            setCurrentAuthorizedUser: (user) => {
                return set({ currentAuthorizedUser: user })
            }
        }
    }, { name: 'user' })
)
