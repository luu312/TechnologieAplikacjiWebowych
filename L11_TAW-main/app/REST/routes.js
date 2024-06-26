
import userEndpoint from "./user.endpoint";
import postEndpoint from "./post.endpoint";
import checkLogin from "../middleware/checkLogin"; 

const routes = function (router) {
  userEndpoint(router); 
  postEndpoint(router); 
  router.use("/api/posts", checkLogin);
};

export default routes;
