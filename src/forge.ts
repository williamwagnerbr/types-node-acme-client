import {
  PrivateKeyBuffer,
  PublicKeyBuffer,
  PrivateKey,
  Cert,
  Csr,
  AnyPem,
  CsrDomains
} from './base';

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