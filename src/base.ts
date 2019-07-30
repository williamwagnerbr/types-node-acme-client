export type PemBase = string | Buffer;
export type PrivateKey = PemBase;
export type PublicKey = PemBase;
export type Cert = PemBase;
export type Csr = PemBase;
export type PrivateKeyBuffer = Buffer;
export type PublicKeyBuffer = Buffer;
export type AnyPem = PublicKey | PrivateKey | Cert | Csr;
export type Pem<T> = T;

export enum NameIdentifierType {
  DNS = 'dns'
};

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
};

export interface NameIdentifier {
  type: NameIdentifierType;
  value: string;
};

export interface Authorization {
  identifier: NameIdentifier;
  status: AuthorizationStatus;
  expires: string;
  challenges: Array<Challenge>;
  wildcard: boolean;
}

export interface Account {};
export interface Order {};
export type AuthorizationList = Array<Authorization>;
export type Validable = Order | Authorization | Challenge;

export interface CsrDomains {
  commonName: string;
  altNames: Array<string>;
}