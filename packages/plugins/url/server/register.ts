import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'url',
    plugin: 'url',
    type: 'string',
  });
};
