import { Request, Response, NextFunction, Router } from "express";
import DataService from "../modules/services/data.service";
import Joi from "joi";

class PostController {
  public path = "/api/post";
  public router = Router();
  private dataService: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(this.path, this.addPost);
    this.router.delete(`${this.path}/:id`, this.deletePostById);
    this.router.get("/api/posts", this.getAllPosts);
    this.router.delete("/api/posts", this.deleteAllPosts);
  }

  private getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    try {
      const post = await this.dataService.getById(id);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).send("Post not found");
      }
    } catch (error) {
      if (error.message === "Nieprawidłowe ID") {
        res.status(400).send(error.message);
      } else {
        next(error);
      }
    }
  };

  private addPost = async (req: Request, res: Response, next: NextFunction) => {
    const postSchema = Joi.object({
      title: Joi.string().required(),
      text: Joi.string().required(),
      image: Joi.string().uri().required(),
    });

    try {
      const { value, error } = postSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ message: "Validation failed", details: error.details });
      }
      const newPost = await this.dataService.createPost(value);
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  };

  private deletePostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    try {
      await this.dataService.deleteById(id);
      res.status(204).send();
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
      const posts = await this.dataService.query({});
      res.status(200).json(posts);
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
      await this.dataService.deleteAllPosts();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
