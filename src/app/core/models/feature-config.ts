export interface SubHeaderTab {
    path: string;
    label: string;
}

export interface FeatureConfig {
    [featureName: string]: SubHeaderTab[];
}
