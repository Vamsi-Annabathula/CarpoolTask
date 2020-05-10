export interface IUserState {
  isAuthenticated: boolean;
  userID: string;
  userInfo: any;
  loader: boolean;
  error: boolean;
  errorInfo: string;
  response: string;
  displayResponse: boolean;
}
