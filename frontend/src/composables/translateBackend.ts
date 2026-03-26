import { i18n } from "@/lib/i18n"
import type { TranslatableObject } from "@/types"

export const useTranslateBackend = () => {
    const translated = (translatableObject: TranslatableObject): string => {
        const locale = i18n.global.locale.value
        return translatableObject?.[locale] || ''
    }

    return {
        translated
    }
}