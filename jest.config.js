// https://github.com/thymikee/jest-preset-angular#brief-explanation-of-config
module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  coverageDirectory: 'reports',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@core': ['<rootDir>/src/app/@core'],
    '@core/(.*)': ['<rootDir>/src/app/@core/$1'],
    '@shared': ['<rootDir>/src/app/@shared'],
    '@shared/(.*)': ['<rootDir>/src/app/@shared/$1'],
    '@pages': ['<rootDir>/src/app/@pages'],
    '@pages/(.*)': ['<rootDir>/src/app/@pages/$1'],
    '@env': '<rootDir>/src/environments/environment',
  },
  globals: {
    'ts-jest': {
      allowSyntheticDefaultImports: true,
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  // Do not ignore librairies such as ionic, ionic-native or bootstrap to transform them during unit testing.
  // transformIgnorePatterns: ['node_modules/(?!(jest-test))'],
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  transformIgnorePatterns: ['node_modules/(?!@angular)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
};
