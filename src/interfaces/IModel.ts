export interface IModel<T> {
  create(obj: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(string: string): Promise<T | null>;
  update(string: string, obj: T): Promise<T | null>;
  delete(string: string): Promise<T | null>;
}
