declare var CONFIG: {
  ENV: {
    PROJECT_NAME: string,
    PROJECT_DESC: string,
    PROJECT_HOST: string,
    PROJECT_PORT: number,
    SLACK_WEBHOOK_URL: string,
    INCLUDE_ASSETS: string,
    BUILD_DIRECTORIES: string,
    ENABLE_DEV_TOOLS: boolean
  },
  GA: {
    TRACKING_ID: string
  },
  LOCALE: {
    LANGUAGE_INIT: string,
    LANGUAGE_FALLBACK: string
  },
  REMOTE: {
    SHARE_URL: string,
    WP_URL: string,
    MEMBER_URL: string,
    MEMBER_ENABLED: boolean,
    TOKEN_1_KEY: string,
    FB_APP_ID: string,
    TWITTER_NAME: string,
    RSS_LINK: string
  },
  ROUTE: {
    ROUTE_BASENAME: string
  }
};
