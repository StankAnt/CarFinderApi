import * as mongoose from 'mongoose';
import { IUserModel, User } from '../db/';
import { IUser } from '../interfaces/index';

export const create = async (user: IUser) => {
  const newcomer = new User(user);
  await newcomer.save(error => {
    return error as any;
  });
};

export const update = async (email: string, payload: any) => {
  await User.update({ email }, payload);
};

export const get = async (email: string): Promise<IUserModel> => {
  return (await User.findOne({ email }, { __v: 0 })) as IUserModel;
};
