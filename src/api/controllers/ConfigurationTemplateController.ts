import {ApiRoutes} from '@/enums/ApiRoutes';
import BaseController from '@/api/controllers/BaseController';
import ConfigurationTemplate from '@/api/models/ConfigurationTemplate';

export default class ConfigurationTemplateController extends BaseController {
  public static updateOne(template: ConfigurationTemplate) {
    return this.makePatchRequest(ConfigurationTemplate, `${ApiRoutes.ConfigurationTemplate}/${template.id}?include=items,items.configurationItem`, {
      data: {
        id: template.id,
        type: 'configuration_templates',
        attributes: {
          name: template.name,
          isActive: template.isActive,
        },
      },
    });
  }
}
