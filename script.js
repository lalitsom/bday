// --- Core Cryptography Functions using Web Crypto API ---

/**
 * Hashes a string using SHA-256.
 * @param {string} text - The text to hash.
 * @returns {Promise<ArrayBuffer>} - The hash as an ArrayBuffer.
 */
async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    return window.crypto.subtle.digest('SHA-256', data);
}

/**
 * Encrypts plaintext using AES-GCM.
 * @param {string} plaintext - The text to encrypt.
 * @param {ArrayBuffer} key - The 32-byte AES key.
 * @returns {Promise<{iv: Uint8Array, ciphertext: ArrayBuffer}>} - The IV and encrypted data.
 */
async function encryptAES(plaintext, key) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for GCM
    const encoder = new TextEncoder();
    const encodedPlaintext = encoder.encode(plaintext);

    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-GCM' },
        false,
        ['encrypt']
    );

    const ciphertext = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        cryptoKey,
        encodedPlaintext
    );

    return { iv, ciphertext };
}

/**
 * Decrypts ciphertext using AES-GCM.
 * @param {ArrayBuffer} ciphertext - The encrypted data.
 * @param {ArrayBuffer} key - The 32-byte AES key.
 * @param {Uint8Array} iv - The 12-byte initialization vector.
 * @returns {Promise<string>} - The decrypted plaintext.
 */
async function decryptAES(ciphertext, key, iv) {
    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-GCM' },
        false,
        ['decrypt']
    );

    try {
        const decrypted = await window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: iv },
            cryptoKey,
            ciphertext
        );
        const decoder = new TextDecoder();
        return decoder.decode(decrypted);
    } catch (error) {
        console.error('Decryption failed:', error);
        throw new Error('Decryption failed. The key is likely incorrect.');
    }
}

// --- Utility Functions ---

/**
 * Converts an ArrayBuffer to a Base64 string.
 * @param {ArrayBuffer} buffer - The buffer to convert.
 * @returns {string} - The Base64 representation.
 */
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

/**
 * Converts a Base64 string to an ArrayBuffer.
 * @param {string} base64 - The Base64 string.
 * @returns {ArrayBuffer} - The corresponding ArrayBuffer.
 */
function base64ToArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}


// --- Puzzle Logic ---

/**
 * Handles the answer submission for a level.
 * @param {string} userAnswer - The answer provided by the user.
 * @param {string} encryptedBlob - The Base64 encoded encrypted data for the next level.
 */
async function solvePuzzle(userAnswer, encryptedBlob) {
    const answer = userAnswer.trim().toLowerCase();
    if (!answer) return;

    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';

    try {
        // Derive the key from the user's answer
        const key = await sha256(answer);

        // Decode the blob
        const { iv_b64, ct_b64 } = JSON.parse(atob(encryptedBlob));
        const iv = base64ToArrayBuffer(iv_b64);
        const ciphertext = base64ToArrayBuffer(ct_b64);

        // Try to decrypt
        const decryptedHtml = await decryptAES(ciphertext, key, new Uint8Array(iv));

        // If successful, render the next level
        document.body.innerHTML = decryptedHtml;

    } catch (error) {
        errorMessage.textContent = 'Incorrect. Try again.';
    }
}

// --- Level Creator Logic ---

/**
 * Handles the creation of an encrypted level blob.
 */
async function createLevel() {
    const htmlContent = document.getElementById('html-content').value;
    const answer = document.getElementById('answer').value.trim().toLowerCase();
    const output = document.getElementById('output');

    if (!htmlContent || !answer) {
        output.textContent = 'Please provide both HTML content and an answer.';
        return;
    }

    try {
        // Derive key from the answer
        const key = await sha256(answer);

        // Encrypt the HTML content
        const { iv, ciphertext } = await encryptAES(htmlContent, key);

        // Package the IV and ciphertext into a single Base64 blob
        const blob = btoa(JSON.stringify({
            iv_b64: arrayBufferToBase64(iv),
            ct_b64: arrayBufferToBase64(ciphertext)
        }));

        output.textContent = blob;
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
    }
}
