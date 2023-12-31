import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
    displayName: string
    email: string
    photoURL: string
    accessToken: string
}

interface UserState {
    user: User | null
    setUser: (user: User | null) => void;
    authError?: string
    setError: (authError: string) => void;
}

const persistKey = () => `${process.env.INVITELY_LOCAL_STORAGE_PREFIX}User`;

const useStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => {
                return set({ user });
            },
            setError: (authError) => {
                return set({ authError })
            }
        }),
        { name: persistKey() }
    )
)

export const useSignedUser = () => ({
    signedUser: useStore(state => state.user),
    setSignedUser: useStore(state => state.setUser),
    authError: useStore(state => state.authError),
    setAuthError: useStore(state => state.setError),
});