class User {
  constructor({ name, id, profession, age }) {
    this.id = parseInt(id);
    this.name = name;
    this.profession = profession;
    this.birthDay = new Date().getFullYear() - parseInt(age);
  }
}

module.exports = User;
