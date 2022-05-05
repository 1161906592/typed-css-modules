import * as fs from 'fs';
const declareTemplate = (selectors) => `declare namespace AppCSSModuleNamespace {
  export interface AppCSSModule {
    ${selectors.map((d) => `${d.includes('-') ? `'${d}'` : d}: string`).join('\n    ')}
  }
}

declare const AppModuleCSSModule: AppCSSModuleNamespace.AppCSSModule & {
  locals: AppCSSModuleNamespace.AppCSSModule
}

export = AppModuleCSSModule
`;
export const getJSON = (cssFileName, modules) => {
    fs.writeFile(`${cssFileName}.d.ts`, declareTemplate(Object.keys(modules)), (err) => {
        if (err) {
            console.log(err);
        }
    });
};
