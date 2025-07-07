// Admin authentication utility functions
export class AdminAuth {
  private static TOKEN_KEY = 'adminToken';
  private static COOKIE_NAME = 'adminToken';

  static setToken(token: string): void {
    // Store in localStorage
    localStorage.setItem(this.TOKEN_KEY, token);
    
    // Store in cookies for middleware access
    const maxAge = 86400; // 24 hours
    document.cookie = `${this.COOKIE_NAME}=${token}; path=/; max-age=${maxAge}; SameSite=Strict`;
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken(): void {
    // Remove from localStorage
    localStorage.removeItem(this.TOKEN_KEY);
    
    // Remove from cookies
    document.cookie = `${this.COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static logout(): void {
    this.removeToken();
    // Redirect to login page
    window.location.href = '/admin/login';
  }

  static async checkAuthAndRedirect(): Promise<boolean> {
    const token = this.getToken();
    if (!token) {
      window.location.replace('/admin/login');
      return false;
    }
    return true;
  }
}
