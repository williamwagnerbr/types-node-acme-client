/// <reference types="node" />
declare module 'acme-client' {
    type PrivateKey = string | Buffer;
    type PublicKey = string | Buffer;
    type Cert = string | Buffer;
    type Csr = string | Buffer;
    type PrivateKeyBuffer = Buffer;
    type PublicKeyBuffer = Buffer;
    type AnyPem = PublicKey | PrivateKey | Cert | Csr;
    enum NameIdentifierType {
        DNS = "dns"
    }
    type KeyAuthorization = string;
    enum ChallengeType {
        HTTP_01 = "http-01",
        DNS_01 = "dns-01"
    }
    enum AuthorizationStatus {
        PENDING = "pending",
        VALID = "valid"
    }
    interface Challenge {
        type: ChallengeType;
        url: string;
        token: string;
    }
    interface NameIdentifier {
        type: NameIdentifierType;
        value: string;
    }
    interface Authorization {
        identifier: NameIdentifier;
        status: AuthorizationStatus;
        expires: string;
        challenges: Array<Challenge>;
        wildcard: boolean;
    }
    interface Account {
    }
    interface Order {
    }
    type AuthorizationList = Array<Authorization>;
    type Validable = Order | Authorization | Challenge;
    interface CsrDomains {
        commonName: string;
        altNames: Array<string>;
    }
    interface AcmeClientOptions {
        directoryUrl: string;
        accountKey: PrivateKey;
        accountUrl?: string | null;
        backoffAttempts?: number;
        backoffMin?: number;
        backoffMax?: number;
    }
    interface AcmeClientAutoOptions {
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
        challengePriority?: Array<ChallengeType>;
    }
    interface CreateAccountOptions {
        termsOfServiceAgreed: boolean;
        contact: Array<string>;
    }
    interface UpdateAccountOptions {
    }
    interface UpdateAccountKeyOptions {
    }
    interface CreateOrderOptions {
        identifiers: Array<NameIdentifier>;
    }
    interface RevokeCertificateOptions {
    }
    interface AcmeClient {
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
    interface Directory {
        staging: string;
        production: string;
    }
    interface LetsEncryptDirectory extends Directory {
    }
    interface DirectoryMap {
        letsencrypt: LetsEncryptDirectory;
    }
    interface CreateCsrOptions {
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
    interface Forge {
        createPrivateKey: (size: number) => Promise<PrivateKeyBuffer>;
        createPublicKey: (key: PrivateKey) => Promise<PublicKeyBuffer>;
        getModulus: (input: AnyPem) => Promise<Buffer>;
        getPublicExponent: (input: AnyPem) => Promise<Buffer>;
        readCsrDomains: (csr: Csr) => Promise<CsrDomains>;
        readCertificateInfo: (cert: Cert) => Promise<object>;
        createCsr: (options: CreateCsrOptions, key?: PrivateKey) => Promise<Array<Buffer>>;
    }
    const directory: DirectoryMap;
    const forge: Forge;
    class Client {
        constructor(options: AcmeClientOptions);
        getTermsOfServiceUrl(): Promise<string>;
        getAccountUrl(): string;
        createAccount(options: CreateAccountOptions): Promise<Account>;
        updateAccount(options: UpdateAccountOptions): Promise<Account>;
        updateAccountKey(newAccountKey: PrivateKey, options: UpdateAccountKeyOptions): Promise<Account>;
        createOrder(options: CreateOrderOptions): Promise<Order>;
        finalizeOrder(order: Order, csr: Csr): Promise<Order>;
        getAuthorizations(order: Order): Promise<AuthorizationList>;
        deactivateAuthorization(authz: Authorization): Promise<Authorization>;
        getChallengeKeyAuthorization(challenge: Challenge): Promise<KeyAuthorization>;
        verifyChallenge(authz: Authorization, challenge: Challenge): Promise<any>;
        completeChallenge(challenge: Challenge): Promise<Challenge>;
        waitForValidStatus(item: Validable): Promise<Validable>;
        getCertificate(order: Order): Promise<string>;
        revokeCertificate(cert: Cert, data?: RevokeCertificateOptions): Promise<any>;
        auto(options: AcmeClientAutoOptions): Promise<string>;
    }
}
