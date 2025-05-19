import { AuthResponse, SignInDto, SignUpDto } from "@/api/generated";
import { mockAuthResponse } from "@/data/mock/mockAuthResponse";

export class AuthService {
  private static BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

  static async signIn(credentials: SignInDto): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Always succeed and return mock data
    return mockAuthResponse;
  }

  static async signUp(credentials: SignUpDto): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockAuthResponse;
  }

  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockAuthResponse;
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
