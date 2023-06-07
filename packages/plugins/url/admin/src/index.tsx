import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginId from './pluginId';
import PluginIcon from './components/PluginIcon';
import getTrad from './utils/getTrad';

export default {
  register(app: any) {
    app.customFields.register({
      name: 'url',
      pluginId: 'url',
      type: 'string',
      fieldSize: {
        default: 6,
        isResizable: false,
      },
      icon: PluginIcon,
      intlLabel: {
        id: getTrad('url.label'),
        defaultMessage: 'Url',
      },
      intlDescription: {
        id: getTrad('url.desc'),
        defaultMessage: 'Select an Url or link',
      },
      components: {
        Input: async () =>
          import(/* webpackChunkName: "url-input-component" */ './components/UrlInput'),
      },
      options: {
        base: [
          {
            intlLabel: {
              id: getTrad('url.options.allowedTypes'),
              defaultMessage: 'Allowed Types',
            },
            name: 'options.allowedTypes',
            type: 'multiselect',
            options: [
              {
                metadatas: {
                  intlLabel: {
                    id: getTrad('url.Variant'),
                    defaultMessage: 'Variant',
                  },
                },
                key: 'Variant',
                value: 'Variant',
              },
              {
                metadatas: {
                  intlLabel: {
                    id: getTrad('url.Product'),
                    defaultMessage: 'Product',
                  },
                },
                key: 'Product',
                value: 'Product',
              },
              {
                metadatas: {
                  intlLabel: {
                    id: getTrad('url.Category'),
                    defaultMessage: 'Category',
                  },
                },
                key: 'Category',
                value: 'Category',
              },
              {
                metadatas: {
                  intlLabel: {
                    id: getTrad('url.Page'),
                    defaultMessage: 'Page',
                  },
                },
                key: 'Page',
                value: 'Page',
              },
              {
                metadatas: {
                  intlLabel: {
                    id: getTrad('url.External'),
                    defaultMessage: 'External',
                  },
                },
                key: 'External',
                value: 'External',
              },
              {
                metadatas: {
                  intlLabel: {
                    id: getTrad('url.Overlay'),
                    defaultMessage: 'Overlay',
                  },
                },
                key: 'Overlay',
                value: 'Overlay',
              },
            ],
            enum: ['Variant', 'Product', 'Category', 'Page', 'External', 'Overlay'],
            defaultValue: 'External',
            description: {
              id: getTrad('url.options.allowedTypes'),
              defaultMessage: 'The type of url that is allowed to select',
            },
          },
        ],
        advanced: [],
      },
    });
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
