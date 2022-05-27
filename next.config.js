module.exports = {
    env: {
        DB_LOCAL_URI: '',
        DB_URI: 'mongodb+srv://bookit:tPXLU78N2SSKpJGf@cluster0.w5gm0.mongodb.net/?retryWrites=true&w=majority',

        STRIPE_API_KEY: 'pk_test_51L3vL8SJJlCj5EtXVg1fNAYJLEyX0Bu67tvVgqx46nqNhNqvugFjTLurtAhIZlzROWCNNyiAUCwLJ8vcw2ZjnpL200wmSADFBo',
        STRIPE_SECRET_KEY: 'sk_test_51L3vL8SJJlCj5EtXISeekS6MprsPxsn0oMMr8R9ttSq7Cg4rRzT6yiagA4c1Eylrmj82KmEMGGwjW2OhwNg9zWRN00nruMM48o',

        STRIPE_WEBHOOK_SECRET: 'whsec_zDcQgt5UWKeZfkB20DOkTlk9If6ePtf0',

        CLOUDINARY_CLOUD_NAME: 'dbbxqppre',
        CLOUDINARY_API_KEY: '148245814257764',
        CLOUDINARY_API_SECRET: 'XLApoQhb6bcw23bdtplhitS0QhI',

        SMTP_HOST: "smtp.mailtrap.io",
        SMTP_PORT: "2525",
        SMTP_USER: "2dc3b1bea6e6e8",
        SMTP_PASSWORD: "4f674dc07c891c",
        SMTP_FROM_EMAIL: "noreply@bookit.com",
        SMTP_FROM_NAME: "BOOKIT",

        NEXTAUTH_URL: 'https://bookitnew.vercel.app',
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
}