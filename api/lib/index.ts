import App from "./app";
import IndexController from "./controllers/index.controller";
import DataController from "./controllers/data.controller";
import DataService from "./modules/services/data.service";
import UserController from "./controllers/user.controller";

const dataService = new DataService();

const dataController = new DataController(dataService);

const app: App = new App([
  new IndexController(),
  dataController,
  new UserController(),
]);

app.listen();
