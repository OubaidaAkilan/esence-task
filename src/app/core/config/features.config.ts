import { FeatureConfig } from '../models/feature-config';

export const FEATURE_DISPLAY_NAMES: Record<string, string> = {
    administration: 'مجموعة المستلمين للجهات الخارجية',
    recipients: 'اداره المعاملات',
};

export const FEATURES: FeatureConfig = {
    administration: [
        { path: 'administration/dashboard', label: 'لوحة القياده' },
        { path: 'administration/settings', label: 'اعدادات النظام' }
    ],
};
