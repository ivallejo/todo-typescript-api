import BaseController from './BaseController';

type Todo = {
  id?: string;
  title: string;
  text: string;
}

class TodoController extends BaseController<Todo> {
  constructor() {
    super('todo');
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.getAllDocuments();
  }

  async getTodoById(id: string): Promise<Todo | null> {
    return this.getDocumentById(id);
  }

  async createTodo(data: Todo): Promise<string> {
    return this.createDocument(data);
  }

  async updateTodo(id: string, data: Partial<Todo>): Promise<void> {
    return this.updateDocument(id, data);
  }

  async deleteTodo(id: string): Promise<void> {
    return this.deleteDocument(id);
  }
}

export default TodoController;