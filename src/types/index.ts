export class Todo {
  constructor(
    public text: string,
    public date: string,
    public completed = false,
    public id = crypto.randomUUID()
  ) {}
}
