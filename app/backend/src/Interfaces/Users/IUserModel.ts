import ILogin from './ILogin';

export default interface IUserModel {
  findByEmail(email: ILogin['email']): Promise<ILogin | null>
}
