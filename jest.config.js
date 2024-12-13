export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];
export const moduleNameMapper = {
  '^.+\\.(css|less|scss)$': 'babel-jest',
  '^.+\\.(jpg|png|gif|svg)$': 'identity-obj-proxy',
};
export const preset = 'ts-jest';
export const testEnvironment = 'jsdom';
export const testMatch = ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'];
export const transform = {
  '^.+\\.tsx?$': 'ts-jest',
  '^.+\\.svg$': 'jest-transformer-svg',
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/fileTransformer.js',
};
export const transformIgnorePatterns = [
  '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$',
  '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$',
  '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$',
];
