// plopfile.ts
import _ from 'lodash';
import type { Actions } from 'node-plop';
import type { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  // create your helpers here
  plop.setHelper('pascalCase', (txt) =>
    _.startCase(_.camelCase(txt)).replace(/ /g, ''),
  );
  plop.setHelper('kebabCase', (txt) => _.kebabCase(txt));
  plop.setHelper('camelCase', (txt) => _.camelCase(txt));
  plop.setHelper('lowerCase', (txt) => _.lowerCase(txt).replace(/ /g, ''));
  plop.setHelper('createPath', (txt) => txt.replace(/-/, '/'));
  plop.setHelper('upperCase', (txt) => txt.toUpperCase());

  // create your generators here
  plop.setGenerator('⚛️  components', {
    description: 'Generate React components following Atomic Design',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'Select the component level (Atomic Design):',
        choices: ['atom', 'molecule', 'organism', 'template', 'page'],
        default: 'atom',
      },
      {
        type: 'input',
        name: 'componentsName',
        message: 'Component name (e.g., Button, UserCard, LoginForm):',
      },
      {
        type: 'confirm',
        name: 'shouldCreateStyle',
        message: 'Do you want to create a CSS module file?',
      },
      {
        type: 'confirm',
        name: 'shouldCreateSASSStyle',
        message: 'Do you want to create a SASS module file?',
      },
      {
        type: 'confirm',
        name: 'shouldCreateService',
        message: 'Do you want to create a service file for API/business logic?',
      },
    ],
    actions(data) {
      const actions: Actions = [];
      const destPath = './src/components/{{type}}s';
      const templatePath = './.plop/templates/components';

      if (!data) throw new Error('No input data for Component generation!');
      if (!data.componentsName)
        throw new Error(
          'Component name is required! Please provide a valid name for your Component (e.g., "Button", "UserCard", "LoginForm").',
        );

      // Modify component name if it's a page
      if (data.type === 'page') {
        const componentName =
          data.componentsName.endsWith('page') ||
          data.componentsName.endsWith('Page')
            ? data.componentsName
            : `${data.componentsName} page`;
        data.componentsName = componentName;
      }

      actions.push({
        type: 'modify',
        pattern: /(\/\*\s*PLOP_INJECT_IMPORT\s*\*\/)/g,
        path: `${destPath}/index.ts`,
        template: 'export * from "./{{pascalCase componentsName}}";\n$1',
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{pascalCase componentsName}}/{{pascalCase componentsName}}.tsx`,
        templateFile: `${templatePath}/componentTemplate.tsx.hbs`,
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{pascalCase componentsName}}/{{pascalCase componentsName}}.types.ts`,
        templateFile: `${templatePath}/typesTemplate.ts.hbs`,
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{pascalCase componentsName}}/index.ts`,
        templateFile: `${templatePath}/indexTemplate.ts.hbs`,
      });

      if (data.shouldCreateStyle) {
        actions.push({
          type: 'add',
          path: `${destPath}/{{pascalCase componentsName}}/{{pascalCase componentsName}}.styles.css`,
          templateFile: `${templatePath}/stylesTemplate.css.hbs`,
        });
      }
      if (data.shouldCreateSASSStyle) {
        actions.push({
          type: 'add',
          path: `${destPath}/{{pascalCase componentsName}}/{{pascalCase componentsName}}.styles.scss`,
          templateFile: `${templatePath}/stylesTemplate.scss.hbs`,
        });
      }

      if (data.shouldCreateService) {
        actions.push({
          type: 'add',
          path: `${destPath}/{{pascalCase componentsName}}/{{pascalCase componentsName}}.service.ts`,
          templateFile: `${templatePath}/serviceTemplate.ts.hbs`,
        });
      }

      return actions;
    },
  });

  plop.setGenerator('🛠 services', {
    description: 'Generate service modules',
    prompts: [
      {
        type: 'input',
        name: 'serviceName',
        message: 'Enter the name for your Service:',
      },
    ],
    actions(data) {
      const actions: Actions = [];
      const destPath = './src/services';
      const templatePath = './.plop/templates/services';

      if (!data) throw new Error('No input data for Service generation!');
      if (!data.serviceName)
        throw new Error(
          'Service name is required! Please provide a valid name for your Service (e.g., "AuthService", "ModalService").',
        );

      actions.push({
        type: 'modify',
        pattern: /(\/\*\s*PLOP_INJECT_IMPORT\s*\*\/)/g,
        path: `${destPath}/index.ts`,
        template: "export * from './{{pascalCase serviceName}};\n$1",
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{pascalCase serviceName}}/{{pascalCase serviceName}}.ts`,
        templateFile: `${templatePath}/serviceTemplate.ts.hbs`,
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{pascalCase serviceName}}/index.ts`,
        templateFile: `${templatePath}/indexTemplate.ts.hbs`,
      });

      return actions;
    },
  });

  plop.setGenerator('🎨 svgs', {
    description: 'Generate SVG components',
    prompts: [
      {
        type: 'input',
        name: 'svgName',
        message: 'Enter the name for your SVG component:',
      },
    ],
    actions(data) {
      const actions: Actions = [];
      const destPath = './src/assets/images/svg';
      const templatePath = './.plop/templates/svgs';

      if (!data) throw new Error('No input data for SVG generation!');
      if (!data.svgName)
        throw new Error(
          'SVG name is required! Please provide a valid name for your SVG component (e.g., "IconArrow", "LogoMain").',
        );

      actions.push({
        type: 'modify',
        pattern: /(\/\*\s*PLOP_INJECT_IMPORT\s*\*\/)/g,
        path: `${destPath}/index.ts`,
        template:
          'export { {{pascalCase svgName}} } from "./{{kebabCase svgName}}.tsx";\n$1',
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{kebabCase svgName}}.tsx`,
        templateFile: `${templatePath}/svgTemplate.svg.hbs`,
      });

      return actions;
    },
  });

  // Zmodyfikowany generator "hooks"
  // plop.setGenerator("hooks", {
  //   description: "generate a new custom hook",
  //   prompts: [
  //     {
  //       type: "input",
  //       name: "hookName",
  //       message: "What is the hook's name? (do not include 'use')",
  //     },
  //     {
  //       type: "confirm",
  //       name: "shouldCreateTest",
  //       message: "Should a test file be created?",
  //     },
  //   ],
  //   actions(data) {
  //     const actions: Actions = [];
  //     const destPath = "./src/hooks";
  //     const templatePath = "./.plop/templates/hooks";

  //     if (!data) return actions;

  //     // Teraz hook umieszczamy w folderze use{{pascalCase hookName}} jako index.ts
  //     actions.push({
  //       type: "add",
  //       path: `${destPath}/use{{pascalCase hookName}}/index.ts`,
  //       templateFile: `${templatePath}/hookTemplate.ts.hbs`,
  //     });

  //     return actions;
  //   },
  // });
}
