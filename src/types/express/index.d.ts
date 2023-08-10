import express from "express";
import { user } from "../../interfaces/user";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string,any> 
    }
  }
}
