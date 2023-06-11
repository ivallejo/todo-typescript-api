import { Request, Response } from 'express';
import TodoRouter from '../src/routes/todoRouter';
import TodoController from '../src/controllers/todoController';

jest.mock('../src/controllers/todoController');

describe('TodoRouter', () => {
  let todoRouter: TodoRouter;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    todoRouter = new TodoRouter();
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn()
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllTodos', () => {
    it('should return all todos', async () => {
      const mockTodos = [{ id: '1', title: 'Todo 1', text: 'Text 1' }];
      const getAllTodosSpy = jest.spyOn(TodoController.prototype, 'getAllTodos').mockResolvedValueOnce(mockTodos);

      await todoRouter.getAllTodos(mockRequest as Request, mockResponse as Response);

      expect(getAllTodosSpy).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockTodos);
    });

    it('should handle errors and return status 500', async () => {
      const errorMessage = 'Internal Server Error';
      const getAllTodosSpy = jest.spyOn(TodoController.prototype, 'getAllTodos').mockRejectedValueOnce(new Error(errorMessage));

      await todoRouter.getAllTodos(mockRequest as Request, mockResponse as Response);

      expect(getAllTodosSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getTodoById', () => {
    it('should return a specific todo when it exists', async () => {
      const mockId = '1';
      const mockTodo = { id: mockId, title: 'Todo 1', text: 'Text 1' };
      const getTodoByIdSpy = jest.spyOn(TodoController.prototype, 'getTodoById').mockResolvedValueOnce(mockTodo);

      mockRequest.params = { id: mockId };

      await todoRouter.getTodoById(mockRequest as Request, mockResponse as Response);

      expect(getTodoByIdSpy).toHaveBeenCalledWith(mockId);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTodo);
    });

    it('should return status 404 when the todo does not exist', async () => {
      const mockId = '1';
      const getTodoByIdSpy = jest.spyOn(TodoController.prototype, 'getTodoById').mockResolvedValueOnce(null);

      mockRequest.params = { id: mockId };

      await todoRouter.getTodoById(mockRequest as Request, mockResponse as Response);

      expect(getTodoByIdSpy).toHaveBeenCalledWith(mockId);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Todo not found' });
    });

    it('should handle errors and return status 500', async () => {
      const mockId = '1';
      const errorMessage = 'Internal Server Error';
      const getTodoByIdSpy = jest.spyOn(TodoController.prototype, 'getTodoById').mockRejectedValueOnce(new Error(errorMessage));

      mockRequest.params = { id: mockId };

      await todoRouter.getTodoById(mockRequest as Request, mockResponse as Response);

      expect(getTodoByIdSpy).toHaveBeenCalledWith(mockId);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('createTodo', () => {
    it('should create a new todo and return its ID', async () => {
      const mockTodoData = { title: 'New Todo', text: 'New Text' };
      const mockId = '1';
      const createTodoSpy = jest.spyOn(TodoController.prototype, 'createTodo').mockResolvedValueOnce(mockId);

      mockRequest.body = mockTodoData;

      await todoRouter.createTodo(mockRequest as Request, mockResponse as Response);

      expect(createTodoSpy).toHaveBeenCalledWith(mockTodoData);
      expect(mockResponse.json).toHaveBeenCalledWith({ id: mockId });
    });

    it('should handle errors and return status 500', async () => {
      const mockTodoData = { title: 'New Todo', text: 'New Text' };
      const errorMessage = 'Internal Server Error';
      const createTodoSpy = jest.spyOn(TodoController.prototype, 'createTodo').mockRejectedValueOnce(new Error(errorMessage));

      mockRequest.body = mockTodoData;

      await todoRouter.createTodo(mockRequest as Request, mockResponse as Response);

      expect(createTodoSpy).toHaveBeenCalledWith(mockTodoData);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('updateTodo', () => {
    it('should update an existing todo', async () => {
      const mockId = '1';
      const mockTodoData = { title: 'Updated Todo', text: 'Updated Text' };
      const updateTodoSpy = jest.spyOn(TodoController.prototype, 'updateTodo');

      mockRequest.params = { id: mockId };
      mockRequest.body = mockTodoData;

      await todoRouter.updateTodo(mockRequest as Request, mockResponse as Response);

      expect(updateTodoSpy).toHaveBeenCalledWith(mockId, mockTodoData);
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
    });

    it('should handle errors and return status 500', async () => {
      const mockId = '1';
      const mockTodoData = { title: 'Updated Todo', text: 'Updated Text' };
      const errorMessage = 'Internal Server Error';
      const updateTodoSpy = jest.spyOn(TodoController.prototype, 'updateTodo').mockRejectedValueOnce(new Error(errorMessage));

      mockRequest.params = { id: mockId };
      mockRequest.body = mockTodoData;

      await todoRouter.updateTodo(mockRequest as Request, mockResponse as Response);

      expect(updateTodoSpy).toHaveBeenCalledWith(mockId, mockTodoData);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('deleteTodo', () => {
    it('should delete an existing todo', async () => {
      const mockId = '1';
      const deleteTodoSpy = jest.spyOn(TodoController.prototype, 'deleteTodo');

      mockRequest.params = { id: mockId };

      await todoRouter.deleteTodo(mockRequest as Request, mockResponse as Response);

      expect(deleteTodoSpy).toHaveBeenCalledWith(mockId);
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
    });

    it('should handle errors and return status 500', async () => {
      const mockId = '1';
      const errorMessage = 'Internal Server Error';
      const deleteTodoSpy = jest.spyOn(TodoController.prototype, 'deleteTodo').mockRejectedValueOnce(new Error(errorMessage));

      mockRequest.params = { id: mockId };

      await todoRouter.deleteTodo(mockRequest as Request, mockResponse as Response);

      expect(deleteTodoSpy).toHaveBeenCalledWith(mockId);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
