├── app
│   ├── minsky-electron [The Electron App]
│   ├── minsky-web [The Angular Web-App]
│   ├── utility [Utility App for generate/check signature scripts]
│   ├── minsky-web-e2e [e2e test cases (currently we are not using this)]
│   │   ├── **/\*.css
│   ├── favicon.ico
│   ├── images
│   ├── index.html
│   ├── js
│   │   ├── **/\*.js
│   └── partials/template
├── dist [The dist folder with executable will be generated after exporting the app using npm scripts]
├── libs  
│   ├── core [Core angular services that maintains the state of frontend and talks with Electron]
│   ├── menu [The popup UIs for Electron Menus]
│   ├── minsky-server [The Socket.IO server (We are no longer using this. Kept here as a backup)]
│   ├── shared [Shared Resources across projects (like shared constants, functions,interfaces, css themes etc)]
│   └── shared-ui [Angular UI components for context menus, non menu popups etc]
├── minsky-docs [HELP menu related resources]
├── README.md
├── package.json
├── signature.json [The signature file used to compare signatures between minsky-httpd binaries]
└── .gitignore
