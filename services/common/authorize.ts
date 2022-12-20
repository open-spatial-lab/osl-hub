export const authorize =(
    headers: Headers,
    PRESHARED_AUTH_HEADER_KEY: string,
    PRESHARED_AUTH_HEADER_VALUE: string
) => {
    if (headers.get(PRESHARED_AUTH_HEADER_KEY) !== PRESHARED_AUTH_HEADER_VALUE) {
        return new Response("Sorry, you have supplied an invalid key.", {
            status: 403,
        });
    }
}