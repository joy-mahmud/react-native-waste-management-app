import { useTranslation } from 'react-i18next';
import '../i18n'; // Import the i18n configuration
const {t,i18n} = useTranslation()
export default function useLanguageText(text){
    return t(text)
}
