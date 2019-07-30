/// <reference types="node" />

declare module 'acme-client' {

  export type PrivateKey = string | Buffer;
  export type PublicKey = string | Buffer;
  export type Cert = string | Buffer;
  export type Csr = string | Buffer;
  export type PrivateKeyBuffer = Buffer;
  export type PublicKeyBuffer = Buffer;
  export type AnyPem = PublicKey | PrivateKey | Cert | Csr;

  export enum NameIdentifierType {
    DNS = 'dns'
  }

  export type KeyAuthorization = string;

  export enum ChallengeType {
    HTTP_01 = 'http-01',
    DNS_01 = 'dns-01'
  }

  export enum AuthorizationStatus {
    PENDING = 'pending',
    VALID = 'valid'
  }

  export interface Challenge {
    type: ChallengeType;
    url: string;
    token: string;
  }

  export interface NameIdentifier {
    type: NameIdentifierType;
    value: string;
  }

  export interface Authorization {
    identifier: NameIdentifier;
    status: AuthorizationStatus;
    expires: string;
    challenges: Array<Challenge>;
    wildcard: boolean;
  }

  export interface Account {}
  export interface Order {}
  export type AuthorizationList = Array<Authorization>;
  export type Validable = Order | Authorization | Challenge;

  export interface CsrDomains {
    commonName: string;
    altNames: Array<string>;
  }

  export interface AcmeClientOptions {
    directoryUrl: string;
    accountKey: PrivateKey;
    accountUrl?: string | null;
    backoffAttempts?: number;
    backoffMin?: number;
    backoffMax?: number;
  }
  
  export interface AcmeClientAutoOptions {
    csr: Csr;

    /**
     * Add challenge hook
     * @param {Authorization} authz
     * @param {Challenge} challenge
     * @param {String} key
     */
    challengeCreateFn: (authz: Authorization, challenge: Challenge, key: KeyAuthorization) => Promise<any>;
    
    /**
     * Remove challenge hook
     * @param {Authorization} authz
     * @param {Challenge} challenge
     * @param {String} key
     */
    challengeRemoveFn: (authz: Authorization, challenge: Challenge, key: KeyAuthorization) => Promise<any>;
    
    email?: string;
    termsOfServiceAgreed?: boolean;
    challengePriority?: Array<ChallengeType>
  }
  
  export interface CreateAccountOptions {
    termsOfServiceAgreed: boolean;
    contact: Array<string>;
  }

  export interface UpdateAccountOptions {}
  export interface UpdateAccountKeyOptions {}

  export interface CreateOrderOptions {
    identifiers: Array<NameIdentifier>
  }

  export interface RevokeCertificateOptions {}

  export interface AcmeClient {
    constructor: (options: AcmeClientOptions) => Client;
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
    auto: (options: AcmeClientAutoOptions) => Promise<string>;
  }

  export interface Directory {
    staging: string;
    production: string;
  }
  
  export interface LetsEncryptDirectory extends Directory {}
  
  export interface DirectoryMap {
    letsencrypt: LetsEncryptDirectory
  }

  export interface CreateCsrOptions {
    keySize: number;
    commonName: string;
    altNames: Array<string>;
    country?: string;
    state?: string;
    locality?: string;
    organization?: string;
    organizationUnit?: string;
    emailAddress?: string;
  }
  
  export interface Forge {
    createPrivateKey: (size: number) => Promise<PrivateKeyBuffer>;
    createPublicKey: (key: PrivateKey) => Promise<PublicKeyBuffer>;
    getModulus: (input: AnyPem) => Promise<Buffer>;
    getPublicExponent: (input: AnyPem) => Promise<Buffer>;
    readCsrDomains: (csr: Csr) => Promise<CsrDomains>;
    readCertificateInfo: (cert: Cert) => Promise<object>;
    createCsr: (options: CreateCsrOptions, key?: PrivateKey) => Promise<Array<Buffer>>;
  }

  export const directory : DirectoryMap;
  export const forge : Forge;

  export class Client {
    constructor(options: AcmeClientOptions);
    getTermsOfServiceUrl () : Promise<string>;
    getAccountUrl () : string;
    createAccount (options: CreateAccountOptions) : Promise<Account>;
    updateAccount (options: UpdateAccountOptions) : Promise<Account>;
    updateAccountKey (newAccountKey: PrivateKey, options: UpdateAccountKeyOptions) : Promise<Account>;
    createOrder (options: CreateOrderOptions) : Promise<Order>;
    finalizeOrder (order: Order, csr: Csr) : Promise<Order>;
    getAuthorizations (order: Order) : Promise<AuthorizationList>;
    deactivateAuthorization (authz: Authorization) : Promise<Authorization>;
    getChallengeKeyAuthorization (challenge: Challenge) : Promise<KeyAuthorization>;
    verifyChallenge (authz: Authorization, challenge: Challenge) : Promise<any>;
    completeChallenge (challenge: Challenge) : Promise<Challenge>;
    waitForValidStatus (item: Validable) : Promise<Validable>;
    getCertificate (order: Order) : Promise<string>;
    revokeCertificate (cert: Cert, data?: RevokeCertificateOptions) : Promise<any>;
    auto (options: AcmeClientAutoOptions) : Promise<string>;
  }
}