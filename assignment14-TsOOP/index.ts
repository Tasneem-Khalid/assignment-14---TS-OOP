class User {
  public readonly id: number;
  public name: string;
  public email: string;
  private password: string;
  public phone: string;
  private _age!: number;
  protected notebooks: NoteBook[] = [];
  constructor(
    id: number,
    name: string,
    email: string,
    pass: string,
    phone: string,
    age: number,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = pass;
    this.phone = phone;
    this.age = age;
  }

  // age validation
  set age(age: number) {
    if (age < 18 || age > 60) {
      throw new Error("Age must be between 18 and 60");
    } else {
      this._age = age;
    }
  }

  get age(): number {
    return this._age;
  }

  public addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  public displayInfo() {
    console.log({
      Id: this.id,
      Name: this.name,
      Email: this.email,
      Phone: this.phone,
      Age: this._age,
    });
  }
}

class Admin extends User {
  manageNotes(
    notebook: NoteBook,
    action: "add" | "remove",
    noteId: number,
    title: string = "",
    content: string = "",
  ): void {
    if (action === "add") {
      notebook.addNote(noteId, title, content, this);
      console.log("Admin added a new note successfully");
    } else if (action === "remove") {
      notebook.removeNote(noteId);
      console.log(`Admin removed note #${noteId} successfully`);
    } else {
      console.log("Invalid Admin action");
    }
  }
}

class Note {
  public readonly id: number;
  public title: string;
  public content: string;
  public userId: User;

  constructor(id: number, title: string, content: string, userId: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
  }

  preview() {
    return this.content.slice(0, 100) + "...";
  }
}

class NoteBook {
  private _notes: Note[];
  constructor() {
    this._notes = [];
  }
  addNote(id: number, title: string, content: string, userId: User): void {
    this._notes.push(new Note(id, title, content, userId));
  }
  removeNote(noteIdToDelete: number): void {
    this._notes = this._notes.filter((note) => note.id !== noteIdToDelete);
  }
  get notes(): readonly Note[] {
    return this._notes;
  }
}

class MyStorage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(itemToRemove: T): void {
    this.items = this.items.filter((item) => item !== itemToRemove);
  }

  getAllItems(): readonly T[] {
    return this.items;
  }
}

/*
Testing:
*/

// let user = new User(1, "T", "T@gmail.com", "123", "0123456789", 22);
// let myNotebook = new NoteBook();
// user.addNotebook(myNotebook);
// myNotebook.addNote(
//   12,
//   "firstTest",
//   "The first test went like Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus.",
//   user,
// );
// myNotebook.addNote(
//   13,
//   "2ndTest",
//   "The first test went like Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus.",
//   user,
// );
// myNotebook.addNote(
//   14,
//   "3rdTest",
//   "The first test went like Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus.",
//   user,
// );
// console.log(
//   "NOTES BEFORE DELETION",
//   myNotebook.notes,
//   "\n\n/===========================/\n",
// );
// myNotebook.removeNote(12);
// console.log(
//   "NOTES AFTER DELETION",
//   myNotebook.notes,
//   "\n\n/===========================/\n",
// );

// let notePreview = myNotebook.notes[0].preview();
// console.log(notePreview);

// let myAdmin = new Admin(123, "T Admin", "T@admin", "12345", "098765432", 22);
// myAdmin.manageNotes(
//   myNotebook,
//   "add",
//   15,
//   "4thTest",
//   "The first test went like Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus.",
// );

// console.log(
//   "NOTES AFTER ADMIN ADDITION",
//   myNotebook.notes,
//   "\n\n/===========================/\n",
// );
