# Generar código de verificación
import random
import string


def generate_verification_code():
    length = 6
    characters = string.ascii_letters + string.digits
    code = ''.join(random.choice(characters) for _ in range(length))
    return code