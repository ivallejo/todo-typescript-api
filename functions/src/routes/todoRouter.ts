import { Request, Response, Router } from 'express';
import { validateContentType } from "../middleware/requestMiddleware";
import TodoController from '../controllers/todoController';

class TodoRouter {
  private router: Router;
  private controller: TodoController;

  constructor() {
    this.router = Router();
    this.controller = new TodoController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/todo', this.getAllTodos);
    this.router.get('/todo/:id', this.getTodoById);
    this.router.post('/todo', [ validateContentType ], this.createTodo);
    this.router.put('/todo/:id', [ validateContentType ], this.updateTodo);
    this.router.delete('/todo/:id', this.deleteTodo);
  }

  public getAllTodos = async (_req: Request, res: Response) => {
    try {
      const todos = await this.controller.getAllTodos();
      res.json(todos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  public getTodoById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const todo = await this.controller.getTodoById(id);
      if (todo) {
        res.json(todo);
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    try {
      const { title, text } = req.body;
      const id = await this.controller.createTodo({ title, text });
      res.json({ id });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    try { 
      const { id } = req.params;
      const { title, text } = req.body;
      await this.controller.updateTodo(id, { title, text });
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.controller.deleteTodo(id);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public getRouter() {
    return this.router;
  }
}

export default TodoRouter;