import AppDataSource from "@/infrastructure/db/dataSourceLocal";
import { User } from "./user.entity"; // Adjust the import as necessary
import { Repository } from "typeorm";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  // Create a new user
  public async createUser(name: string, email: string): Promise<User> {
    const user = this.userRepository.create({ name, email });
    return await this.userRepository.save(user);
  }

  // Get all users
  public async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Get a user by ID
  public async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  // Update a user
  public async updateUser(
    id: string,
    name: string,
    email: string
  ): Promise<User | null> {
    const user = await this.getUserById(id);
    if (!user) {
      return null; // User not found
    }
    user.name = name;
    user.email = email;
    return await this.userRepository.save(user);
  }

  // Delete a user
  public async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected !== 0; // Return true if a user was deleted
  }
}
