from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import serialization, hashes
import sys
import os

def generate_keys():
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )
    public_key = private_key.public_key()
    
    with open("private_key.pem", "wb") as priv_file:
        priv_file.write(private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.NoEncryption()
        ))
    
    with open("public_key.pem", "wb") as pub_file:
        pub_file.write(public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ))


# ---------------
# --- Encrypt ---
def encrypt_file(file_path):
    with open("public_key.pem", "rb") as key_file:
        public_key = serialization.load_pem_public_key(key_file.read())
    
    with open(file_path, "rb") as f:
        plaintext = f.read()
    
    cipher_text = public_key.encrypt(
        plaintext,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    
    encrypted_file_path = file_path + ".enc"
    with open(encrypted_file_path, "wb") as enc_file:
        enc_file.write(cipher_text)
    
    os.remove(file_path)
    print(f"File '{file_path}' encrypted to '{encrypted_file_path}'.")


# ---------------
# --- Decrypt ---
def decrypt_file(file_path):
    if not file_path.endswith(".enc"):
        print("File must have a .enc extension.")
        sys.exit(1)

    with open("private_key.pem", "rb") as key_file:
        private_key = serialization.load_pem_private_key(key_file.read(), password=None)
    
    with open(file_path, "rb") as enc_file:
        cipher_text = enc_file.read()
    
    plaintext = private_key.decrypt(
        cipher_text,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    
    # Removes the .enc extension
    decrypted_file_path = file_path[:-4]
    with open(decrypted_file_path, "wb") as dec_file:
        dec_file.write(plaintext)
    
    os.remove(file_path)
    print(f"File '{file_path}' decrypted back to '{decrypted_file_path}'.")


# ---------------
# --- Main ---
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python encrypt_decrypt.py <encrypt/decrypt> <file_path>")
        sys.exit(1)
    
    action = sys.argv[1]
    file_path = sys.argv[2]
    
    if not (os.path.exists("private_key.pem") and os.path.exists("public_key.pem")):
        generate_keys()
    
    if action == "encrypt":
        encrypt_file(file_path)
    elif action == "decrypt":
        decrypt_file(file_path)
    else:
        print("Invalid. Either use 'encrypt' or 'decrypt'.")
