import crypto from "crypto";

/**
 * Generates a cryptographically strong pseudo random OTP using the crypto library and
 * returns it as a base64url encoded string.
 * @param {number} numberBytes Number of bytes to generate, defaults to 32
 * @returns The base64url enconded OTP
 */
const generateOTP = (numberBytes = 32) => {
    const bytes = crypto.randomBytes(numberBytes);
    return bytes.toString("base64url");
};

export default generateOTP;