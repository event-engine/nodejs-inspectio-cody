const config = {
    ENV_NAME: process.env.NODE_ENV,

    PORT: process.env.PORT || 3000,
    SELF_URL: process.env.SELF_URL || 'http://localhost:' + process.env.PORT,

    // Controls how often clients ping back and forth
    HEARTBEAT_TIMEOUT: 8000,
    HEARTBEAT_INTERVAL: 4000,
};

export default config;
