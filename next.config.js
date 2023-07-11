/** @type {import('next').NextConfig} */
const nextConfig = {}
const withSvgr = require('next-plugin-svgr');


module.exports =  withSvgr({
    fileLoader: true,
    svgrOptions: {
      titleProp: true,
      icon: true,
      /* jsx:{
        babelConfig: {
            plugins: [
                [
                    '@svgr/babel-plugin-remove-jsx-attribute',
                    {
                        elements: ['svg'],
                        attributes: ['fill'],
                    }
                ],
                [
                    '@svgr/babel-plugin-add-jsx-attribute',
                    {
                        elements: ['svg', 'path'],
                        attributes: [
                            {
                                fill: 'currentColor'
                            }
                        ],
                    }
                ]
            ]
        }
      } */
    },
  });
