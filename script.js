async function submitAnswer() {
    const answerInput = document.getElementById('answer-input');
    const errorMessage = document.getElementById('error-message');
    const levelTitle = document.querySelector('h1').textContent.toLowerCase().replace(' ', '');
    
    // raw answer take imput remove all special characters and convert to lowercase, even spaces
    const rawAnswer = answerInput.value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

    if (!rawAnswer) {
        errorMessage.textContent = 'Please enter an answer.';
        return;
    }

    const hashedAnswer = await hashString(rawAnswer);

    if (answers[levelTitle] === hashedAnswer) {
        errorMessage.textContent = '';
        const currentLevelNum = parseInt(levelTitle.replace('level', ''), 10);

        if (currentLevelNum === 6) {
            document.getElementById('questions').innerHTML = 
            '<h1>Congratulations! and.. Happy Birthday</h1><p> Sometimes the only gift you get is experience.....😛</p>';
            return;
        }

        const nextLevelNum = currentLevelNum + 1;
        const nextLevelKey = `level${nextLevelNum}`;
        const encryptedHex = levelCode[nextLevelKey];

        try {
            const decryptedHtml = await decryptData(encryptedHex, rawAnswer);
            console.log('Decrypted HTML:', decryptedHtml);
            document.getElementById('questions').innerHTML = decryptedHtml;
        } catch (error) {
            console.error('Decryption failed:', error);
            errorMessage.textContent = 'Could not load the next level. Data might be corrupt.';
        }
    } else {
        errorMessage.textContent = 'Wrong answer. Please try again.';
    }
}

async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function decryptData(encryptedHex, password) {
    // Convert hex string to Uint8Array
    const encryptedBytes = new Uint8Array(encryptedHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    // As per OpenSSL's "Salted__" format, the first 8 bytes are salt.
    const salt = encryptedBytes.slice(8, 16);
    const ciphertext = encryptedBytes.slice(16);

    // Derive key and IV from password and salt using PBKDF2
    const passwordKey = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password), {
            name: 'PBKDF2'
        },
        false,
        ['deriveBits']
    );

    // AES key is 256 bits (32 bytes), IV is 128 bits (16 bytes)
    const derivedBits = await crypto.subtle.deriveBits({
            name: 'PBKDF2',
            salt: salt,
            iterations: 10000, // A reasonable number of iterations
            hash: 'SHA-256',
        },
        passwordKey,
        256 + 128 // 32-byte key + 16-byte IV
    );

    const key = derivedBits.slice(0, 32);
    const iv = derivedBits.slice(32, 48);

    const aesKey = await crypto.subtle.importKey(
        'raw',
        key, {
            name: 'AES-CBC',
            length: 256
        },
        false,
        ['decrypt']
    );

    const decryptedBuffer = await crypto.subtle.decrypt({
            name: 'AES-CBC',
            iv: iv
        },
        aesKey,
        ciphertext
    );

    return new TextDecoder().decode(decryptedBuffer);
}

async function encryptData(plaintext, password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);

    // Generate a random 8-byte salt
    const salt = crypto.getRandomValues(new Uint8Array(8));

    // Derive key and IV from password and salt using PBKDF2
    const passwordKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password), {
            name: 'PBKDF2'
        },
        false,
        ['deriveBits']
    );

    const derivedBits = await crypto.subtle.deriveBits({
            name: 'PBKDF2',
            salt: salt,
            iterations: 10000,
            hash: 'SHA-256',
        },
        passwordKey,
        256 + 128 // 32-byte key + 16-byte IV
    );

    const key = derivedBits.slice(0, 32);
    const iv = derivedBits.slice(32, 48);

    const aesKey = await crypto.subtle.importKey(
        'raw',
        key, {
            name: 'AES-CBC',
            length: 256
        },
        false,
        ['encrypt']
    );

    const encryptedBuffer = await crypto.subtle.encrypt({
            name: 'AES-CBC',
            iv: iv
        },
        aesKey,
        data
    );

    // Prepend "Salted__" and the salt to the ciphertext
    const saltedCiphertext = new Uint8Array(8 + salt.length + encryptedBuffer.byteLength);
    saltedCiphertext.set(encoder.encode('Salted__'));
    saltedCiphertext.set(salt, 8);
    saltedCiphertext.set(new Uint8Array(encryptedBuffer), 16);

    // Convert to hex string
    return Array.from(saltedCiphertext).map(b => b.toString(16).padStart(2, '0')).join('');
}
