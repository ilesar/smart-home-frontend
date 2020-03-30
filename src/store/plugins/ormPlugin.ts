import VuexORM, { Database, Query, Model } from '@vuex-orm/core';
import models from '@/api/models';
import modules from '@/store/modules';
import { curry } from 'lodash';

/**
 * Database register model and modules
 */
export const registerDatabase = (dbModels: any, dbModules: any): Database => {
  const database = new Database();
  Object.keys(dbModels).map((key) => {
    console.log(`Registering ORM for ${key} model`);
    database.register(dbModels[key], dbModules[key] || {});
  });
  return database;
};

export const curriedRegisterDatabase = curry(registerDatabase);
export const curriedDatabase = curriedRegisterDatabase(models)(modules);

/**
 * Register database as Vuex plugin
 */
export const ormDatabase = registerDatabase(models, modules);

const ormPlugin = VuexORM.install(ormDatabase);

export default ormPlugin;
