import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import "./root-styles.scss";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    console.log(`Loading app: ${name}`);
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

console.log("ROOT CONFIG ROUTES -> ", routes);
applications.forEach((app) => {
  console.log(`Registering application: ${app.name}`);
  registerApplication(app);
});

layoutEngine.activate();

start();
console.log('Single-SPA started');