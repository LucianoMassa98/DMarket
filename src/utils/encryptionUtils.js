import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // Clave de 32 bytes
const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // IV de 16 bytes

/**
 * Encripta un mensaje.
 * @param {string} message - El mensaje a encriptar.
 * @returns {string} - El mensaje encriptado en formato base64.
 */
function encryptMessage(message) {
    const encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv });
    return encrypted.toString();
}

/**
 * Desencripta un mensaje.
 * @param {string} encryptedMessage - El mensaje encriptado en formato base64.
 * @returns {string} - El mensaje desencriptado.
 */
function decryptMessage(encryptedMessage) {
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export { encryptMessage, decryptMessage };
