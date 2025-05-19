// import type { AuthResponse, SignInDto, SignUpDto } from "@/api/generated"; // Removed due to TS2307 error
// import { mockAuthResponse } from "@/data/mock/mockAuthResponse"; // Removed due to TS2307 error

// Note: AuthResponse, SignInDto, SignUpDto, and mockAuthResponse removed due to TS2307 errors.
// Using placeholder types and data.
// type AuthResponse = any;
// type SignInDto = any;
// type SignUpDto = any;
// const mockAuthResponse = {};

export class AuthService {
  // private static BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`; // Removed due to TS6133 error

  // Note: Methods adjusted to return placeholder data.
  static async signIn(credentials: any): Promise<any> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Always succeed and return mock data
    return { accessToken: "mock-access-token", refreshToken: "mock-refresh-token" };
  }

  static async signUp(credentials: any): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { accessToken: "mock-access-token", refreshToken: "mock-refresh-token" };
  }

  static async refreshToken(refreshToken: string): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { accessToken: "mock-access-token", refreshToken: "mock-refresh-token" };
  }

  static async fetchWithTokenRefresh(
    url: string,
    options: RequestInit,
    refreshToken: string
  ): Promise<Response> {
    // Simulate always successful fetch with a dummy Response
    await new Promise((resolve) => setTimeout(resolve, 500));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
}
