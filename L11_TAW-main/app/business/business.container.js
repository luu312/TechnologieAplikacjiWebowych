import userManager from "./user.manager";
import postManager from "./post.manager"; 

function getter(manager) {
  return function (request) {
    return manager;
  };
}

export default {
  getUserManager: getter(userManager.create()),
  getPostManager: getter(postManager.create()), 
};
