declare namespace NodeJS {
  export interface ProcessEnv {
    BUILD_PATH: string;
    SERVER_PORT: string;
    TRANSMISSION_URL: string;
    TRANSMISSION_USERNAME: string;
    TRANSMISSION_PASSWORD: string;
  }
}
