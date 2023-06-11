import TodoController from '../src/controllers/todoController';

jest.mock('firebase-admin/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase-admin/firestore', () => ({
  getFirestore: jest.fn(),
  Firestore: jest.fn(),
}));

describe('TodoController', () => {
  let todoController: TodoController;

  beforeEach(() => {
    todoController = new TodoController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllTodos', () => {
    it('should call getAllDocuments method and return all todos', async () => {
      const todos = [
        { id: '1', title: 'Todo 1', text: 'Todo 1 description' },
        { id: '2', title: 'Todo 2', text: 'Todo 2 description' },
      ];

      const getAllDocumentsSpy = jest.spyOn(todoController, 'getAllTodos').mockResolvedValueOnce(todos);

      const result = await todoController.getAllTodos();

      expect(getAllDocumentsSpy).toHaveBeenCalled();
      expect(result).toEqual(todos);
    });
  });

  describe('getTodoById', () => {
    it('should call getDocumentById method and return the todo with the specified id', async () => {
      const todoId = '1';
      const todo = { id: todoId, title: 'Todo 1', text: 'Todo 1 description' };

      const getDocumentByIdSpy = jest.spyOn(todoController, 'getTodoById').mockResolvedValueOnce(todo);

      const result = await todoController.getTodoById(todoId);

      expect(getDocumentByIdSpy).toHaveBeenCalledWith(todoId);
      expect(result).toEqual(todo);
    });

    it('should call getDocumentById method and return null if the todo with the specified id does not exist', async () => {
      const todoId = '1';

      const getDocumentByIdSpy = jest.spyOn(todoController, 'getTodoById').mockResolvedValueOnce(null);

      const result = await todoController.getTodoById(todoId);

      expect(getDocumentByIdSpy).toHaveBeenCalledWith(todoId);
      expect(result).toBeNull();
    });
  });

  describe('createTodo', () => {
    it('should call createDocument method and return the created todo id', async () => {
      const todo = { title: 'New Todo', text: 'New Todo description' };
      const createdTodoId = '1';

      const createDocumentSpy = jest.spyOn(todoController, 'createTodo').mockResolvedValueOnce(createdTodoId);

      const result = await todoController.createTodo(todo);

      expect(createDocumentSpy).toHaveBeenCalledWith(todo);
      expect(result).toBe(createdTodoId);
    });
  });

  describe('updateTodo', () => {
    it('should call updateDocument method with the specified id and data', async () => {
      const todoId = '1';
      const updatedData = { title: 'Updated Todo' };

      const updateDocumentSpy = jest.spyOn(todoController, 'updateTodo').mockResolvedValueOnce();

      await todoController.updateTodo(todoId, updatedData);

      expect(updateDocumentSpy).toHaveBeenCalledWith(todoId, updatedData);
    });
  });

  describe('deleteTodo', () => {
    it('should call deleteDocument method with the specified id', async () => {
      const todoId = '1';

      const deleteDocumentSpy = jest.spyOn(todoController, 'deleteTodo').mockResolvedValueOnce();

      await todoController.deleteTodo(todoId);

      expect(deleteDocumentSpy).toHaveBeenCalledWith(todoId);
    });
  });
});
