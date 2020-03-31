import VuexORM, { Database, Query, Model } from '@vuex-orm/core';
import models from '@/api/models';
import modules from '@/store/modules';
import { appAxios } from '@/axios/appAxios';
import VuexORMAxios from '@vuex-orm/plugin-axios';

import { curry } from 'lodash';
import Vue from 'vue';

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

// export const curriedRegisterDatabase = curry(registerDatabase);
// export const curriedDatabase = curriedRegisterDatabase(models)(modules);

/**
 * Register database as Vuex plugin
 */
export const ormDatabase = registerDatabase(models, modules);

VuexORM.use(VuexORMAxios, appAxios);
const ormPlugin = VuexORM.install(ormDatabase);

export default ormPlugin;
