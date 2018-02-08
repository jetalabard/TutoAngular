// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// url_todos = url d'accès à l'api (4200 --> parce qu'on passe par le proxy => 4200 serveur angular)
export const environment = {
  production: false,
  url_todos: 'http://localhost:4200/api'
};
