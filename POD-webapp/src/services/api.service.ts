// API service for backend communication
// This will handle all HTTP requests to the Spring Boot backend

export class ApiService {
  private static baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  // Generic HTTP methods will be implemented here

  static async get(endpoint: string): Promise<any> {
    // Implementation placeholder
    throw new Error('Not implemented');
  }

  static async post(endpoint: string, data: any): Promise<any> {
    // Implementation placeholder
    throw new Error('Not implemented');
  }

  static async put(endpoint: string, data: any): Promise<any> {
    // Implementation placeholder
    throw new Error('Not implemented');
  }

  static async delete(endpoint: string): Promise<any> {
    // Implementation placeholder
    throw new Error('Not implemented');
  }
}
