/**
 * Generated by orval v6.16.0 🍺
 * Do not edit manually.
 * labs-api
 * 
        This project provides a reference Python API built using FastAPI, the 
        aim of the project is:

        - To maintain a good know source of habits
        - Demonstrate how applications are meant to be put together at Anomaly
        - Democratize design of robust API    
    
 * OpenAPI spec version: 0.1.0
 */
import type { ValidationErrorLocItem } from './validationErrorLocItem';

export interface ValidationError {
  loc: ValidationErrorLocItem[];
  msg: string;
  type: string;
}