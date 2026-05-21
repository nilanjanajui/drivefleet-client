/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "i.pravatar.cc",
            },
            {
                protocol: "https",
                hostname: "i.ibb.co",
            },
            {
                protocol: "https",
                hostname: "i.postimg.cc",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "www.svgrepo.com",      // used for Google logo in login/register
            },
            {
                protocol: "https",
                hostname: "ui-avatars.com",       // used as fallback avatar in AuthContext
            },
        ],
    },
};

export default nextConfig;