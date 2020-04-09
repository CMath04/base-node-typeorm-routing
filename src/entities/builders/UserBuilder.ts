import { User } from '../user.entity';

export class UserBuilder {
  private id: number;
  private firstname: string;
  private lastname: string;
  private email: string;
  private password: string;
  private createdDate: Date;
  private updatedDate: Date;

  static aNormalUser(): UserBuilder {
    return new UserBuilder();
  }

  withId(id: number): UserBuilder {
    this.id = id;
    return this;
  }

  withFirstname(firstname: string): UserBuilder {
    this.firstname = firstname;
    return this;
  }

  withLastname(lastname: string): UserBuilder {
    this.lastname = lastname;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this.password = password;
    return this;
  }

  withCreateddate(createdDate: Date): UserBuilder {
    this.createdDate = createdDate;
    return this;
  }

  withUpdateddate(updatedDate: Date): UserBuilder {
    this.updatedDate = updatedDate;
    return this;
  }

  build(): User {
    const user = new User();
    user.id = this.id;
    user.firstname = this.firstname;
    user.lastname = this.lastname;
    user.email = this.email;
    user.password = this.password;
    user.createdDate = this.createdDate;
    user.updatedDate = this.updatedDate;
    return user;
  }
}
