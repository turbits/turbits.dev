import CryptoJS from "crypto-js";
import pkg from "crypto-js";
const { lib, AES, PBKDF2, SHA256 } = pkg;

export const ValidatePassword = (password, hash, salt) => {
  const _hasher = CryptoJS.algo.SHA256.create();
  const _verify = PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 1000,
    hasher: _hasher,
  });

  return hash === _verify;
};

export const GeneratePassword = (password) => {
  const _salt = CryptoJS.lib.WordArray.random(128 / 8);
  const _hasher = CryptoJS.algo.SHA256.create();
  const _hash = new PBKDF2(password, _salt, {
    keySize: 256 / 32,
    iterations: 1000,
    hasher: _hasher,
  });

  return {
    salt: _salt,
    hash: _hash,
  };
};
