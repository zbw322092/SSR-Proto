import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  
  context: path.join(process.cwd(), './src/client/'),

  entry: {
    client: './index.tsx'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [
          path.resolve(process.cwd(), 'src/client/')
        ],
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
              configFile: path.resolve(__dirname, '../tsconfig.client.json')
            }
          }
        ]
      }
    ]
  },

  output: {
    path: path.resolve(process.cwd(), 'public'),
    filename: "client/[name].js"
  }
};

export default config;