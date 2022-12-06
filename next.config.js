/** @type {import('next').NextConfig} */
const intercept = require('intercept-stdout');

// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return '';
  }
  return text;
}

intercept(interceptStdout);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // images: {
  //   domains: ['https://img.seadn.io/'],
  // },
  images: {
    domains: ['res.cloudinary.com']
  }
};

exports.default = nextConfig;
