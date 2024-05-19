export interface IAuthViewModel {
  loggedIn: boolean;
  userEmail?: string;
  login: (email: string) => void;
  logout: () => void;
}
