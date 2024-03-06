import { Identifiable } from '.';

export default interface IUsers extends Identifiable {
  username: string;
  password: string;
  email: string;
  role: string;
}
