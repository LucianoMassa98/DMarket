import { jwtVerify, SignJWT } from 'jose';

const jwtSecret = new TextEncoder().encode('123456789'); // Cambiar por una clave secreta segura

/**
 * Genera un token JWT.
 * @param {string} message - El mensaje a incluir en el token.
 * @returns {Promise<string>} - Token JWT.
 */
async function encryptMessage(message) {
    return new SignJWT({ data: message })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(jwtSecret);
}

/**
 * Verifica y decodifica un token JWT.
 * @param {string} token - Token JWT.
 * @returns {Promise<string>} - Mensaje original.
 */
async function decryptMessage(token) {
    try {
        const { payload } = await jwtVerify(token, jwtSecret);
        return payload.data;
    } catch (error) {
        console.error('Error al verificar el token JWT:', error.message);
        return '';
    }
}

async function generarMensaje() {
    const token = await encryptMessage('Tu mensaje aquí');
    const mensaje = `*Forma(s) de pago:* transferencia *Link para ver el pedido:* dmarket.up.railway.app/note/${token}`;
    console.log(mensaje);
}

generarMensaje();

export { encryptMessage, decryptMessage };
