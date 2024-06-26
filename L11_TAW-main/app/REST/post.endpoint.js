
import business from "../business/business.container";
import applicationException from "../service/applicationException";
import auth from "../middleware/auth";

const postEndpoint = (router) => {
  router.get("/api/posts", async (request, response, next) => {
    try {
      let result = await business.getPostManager(request).getAll();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.post("/api/posts", auth, async (request, response, next) => {
    try {
      const result = await business
        .getPostManager(request)
        .createNew(request.body);
      response.status(201).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get("/api/posts/:id", async (request, response, next) => {
    try {
      let result = await business
        .getPostManager(request)
        .getById(request.params.id);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.put("/api/posts/:id", auth, async (request, response, next) => {
    try {
      const post = await business.getPostManager(request).getById(request.params.id);
      if (post.userId !== request.user.userId) {
        return response.status(403).send('Forbidden');
      }
      const result = await business
        .getPostManager(request)
        .updateById(request.params.id, request.body);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.delete("/api/posts/:id", auth, async (request, response, next) => {
    try {
      const post = await business.getPostManager(request).getById(request.params.id);
      if (post.userId !== request.user.userId) {
        return response.status(403).send('Forbidden');
      }
      await business.getPostManager(request).deleteById(request.params.id);
      response.status(204).send();
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

export default postEndpoint;
