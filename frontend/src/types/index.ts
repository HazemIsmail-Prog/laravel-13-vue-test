// components
export type ButtonVariant = 'accent' | 'secondary' | 'danger' | 'warning' | 'info' | 'success'| 'link' | 'outline' | 'ghost' | 'text'

// models
export interface User {
    id: number
    name: TranslatableObject
    name_en: string
    name_ar: string
    email: string
    can: string[]
    is_active: boolean
}

export interface UserForm {
    id?: number | null
    name_en: string
    name_ar: string
    email: string
    password?: string
    is_active: boolean
}

export type TranslatableObject = {
    ar: string
    en: string
} | undefined


export interface LoginForm {
    email: string
    password: string
}