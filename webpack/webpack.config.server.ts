import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  context: path.join(process.cwd(), './src/server/'),

  entry: {
    server: './index.tsx'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },

  target: 'node',

  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        // include: [
        //   path.resolve(process.cwd(), 'src/')
        // ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              silent: false,
              happyPackMode: false,
              configFile: path.resolve(__dirname, '../tsconfig.server.json')
            }
          }
        ]
      }
    ]
  },

  output: {
    path: path.resolve(process.cwd(), 'public'),
    filename: "server/[name].js"
  },

  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    }),
  ]
};

export default config;