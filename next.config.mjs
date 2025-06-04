/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: ['avatars.githubusercontent.com','raw.githubusercontent.com'],
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg|m4a)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/sounds/',
            outputPath: 'static/sounds/',
            name: '[name].[hash].[ext]',
            esModule: false,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;