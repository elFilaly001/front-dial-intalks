function fetchImages(image : string): string {

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL  || '';
    return baseURL +"/uploads" + image;
}

export { fetchImages };