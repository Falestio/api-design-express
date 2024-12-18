import { Request, Response } from "express";
import { UserService } from "./user.service"; // Import the UserService
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto'; // Import the DTO

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(); // Initialize the UserService
  }

  // Get all users
  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      res.send(users);
    } catch (error) {
      console.error("Database connection error: ", error);
      res.status(500).send("Database connection error");
    }
  };

  // Create a new user
  public createUser = async (req: Request, res: Response) => {
    const createUserDto = plainToClass(CreateUserDto, req.body);
    const errors = await validate(createUserDto);
    
    if (errors.length > 0) {
      res.status(400).send({ errors: errors.map(err => err.constraints) });
    }

    try {
      const newUser = await this.userService.createUser(createUserDto.name, createUserDto.email);
      res.status(201).send(newUser);
    } catch (error) {
      console.error("Error creating user: ", error);
      res.status(500).send("Error creating user");
    }
  };

  // Get a user by ID
  public getUserById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      const user = await this.userService.getUserById(id);
      if (!user) {
        res.status(404).send("User not found");
      }
      res.status(200).send(user);
    } catch (error) {
      // console.error("Error fetching user: ", error);
      res.status(500).send("Error fetching user");
    }
  };

  // Update a user
  public updateUser = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const updatedUser = await this.userService.updateUser(id, name, email);
      if (!updatedUser) {
        res.status(404).send("User not found");
      }
      res.send(updatedUser);
    } catch (error) {
      console.error("Error updating user: ", error);
      res.status(500).send("Error updating user");
    }
  };

  // Delete a user
  public deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      const deleted = await this.userService.deleteUser(id);
      if (!deleted) {
        res.status(404).send("User not found");
      }
      res.status(204).send(); // No content
    } catch (error) {
      console.error("Error deleting user: ", error);
      res.status(500).send("Error deleting user");
    }
  };
}
