/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};