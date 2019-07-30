export interface Directory {
  staging: string;
  production: string;
}

export interface LetsEncryptDirectory extends Directory {}

export interface Directory {
  letsencrypt: LetsEncryptDirectory
};

export default Directory;