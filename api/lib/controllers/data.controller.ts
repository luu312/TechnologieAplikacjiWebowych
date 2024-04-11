import { Request, Response, NextFunction, Router } from "express";

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController {
  public path = "/api/post";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(this.path, this.addPost);
    this.router.delete(`${this.path}/:id`, this.deletePostById);
    this.router.post(`${this.path}/:num`, this.getNPosts);
    this.router.get("/api/posts", this.getAllPosts);
    this.router.delete("/api/posts", this.deleteAllPosts);
  }

  private getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).send("Invalid ID format");
      }

      const post = testArr.find((_, index) => index === id);
      if (post !== undefined) {
        return res.status(200).send(post.toString());
      } else {
        return res.status(404).send("Post not found");
      }
    } catch (error) {
      next(error);
    }
  };

  private addPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { elem } = req.body;
      testArr.push(elem);
      res.status(201).send(testArr);
    } catch (error) {
      next(error);
    }
  };

  private deletePostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      testArr = testArr.filter((_, index) => index !== parseInt(id));
      res.status(200).send(testArr);
    } catch (error) {
      next(error);
    }
  };

  private getNPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { num } = req.params;
      const posts = testArr.slice(0, parseInt(num));
      res.status(200).send(posts);
    } catch (error) {
      next(error);
    }
  };

  private deleteAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      testArr = [];
      res.status(200).send([]);
    } catch (error) {
      next(error);
    }
  };

  private getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      res.status(200).send(testArr);
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
