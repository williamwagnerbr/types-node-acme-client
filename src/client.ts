import {
  PrivateKey,
  Cert,
  Csr,
  Account,
  Order,  
  Authorization,
  AuthorizationList,
  Challenge,
  ChallengeType,
  KeyAuthorization,
  Validable
} from "./base";

export interface ClientOpts {
  directoryUrl: string;
  accountKey: PrivateKey;
  accountUrl?: string | null;
  backoffAttempts?: number;
  backoffMin?: number;
  backoffMax?: number;
}

export interface ClientConstructor {
  opts: ClientOpts;
};

export interface ClientAutoParamsOpts {
  csr: Csr;
  challengeCreateFn: Function;
  challengeRemoveFn: Function;
  email?: string;
  termsOfServiceAgreed?: boolean;
  challengePriority?: Array<ChallengeType>
};

export interface CreateAccountOptions {};
export interface UpdateAccountOptions {};
export interface UpdateAccountKeyOptions {};
export interface CreateOrderOptions {};
export interface RevokeCertificateOptions {};
export interface ClientAutoOptions {
  opts: ClientAutoParamsOpts
};

var optss : CreateAccountOptions = {
  cert: 111
};

export interface Client {
  getTermsOfServiceUrl: () => Promise<string>;
  getAccountUrl: () => string;
  createAccount: (options: CreateAccountOptions) => Promise<Account>;
  updateAccount: (options: UpdateAccountOptions) => Promise<Account>;
  updateAccountKey: (newAccountKey: PrivateKey, options: UpdateAccountKeyOptions) => Promise<Account>;
  createOrder: (options: CreateOrderOptions) => Promise<Order>;
  finalizeOrder: (order: Order, csr: Csr) => Promise<Order>;
  getAuthorizations: (order: Order) => Promise<AuthorizationList>;
  deactivateAuthorization: (authz: Authorization) => Promise<Authorization>;
  getChallengeKeyAuthorization: (challenge: Challenge) => Promise<KeyAuthorization>;
  verifyChallenge: (authz: Authorization, challenge: Challenge) => Promise<any>;
  completeChallenge: (challenge: Challenge) => Promise<Challenge>;
  waitForValidStatus: (item: Validable) => Promise<Validable>;
  getCertificate: (order: Order) => Promise<string>;
  revokeCertificate: (cert: Cert, data?: RevokeCertificateOptions) => Promise<any>;
  auto: (options: ClientAutoOptions) => Promise<string>;
}