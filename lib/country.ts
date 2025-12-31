import countryCode from "country-code-lookup";

export function getCountryCode(countryName: string): string {
  const country = countryCode.byCountry(countryName);

  return country
    ? `https://flagcdn.com/${country.iso2.toLowerCase()}.svg`
    : `/flag.webp`;
}
// export function getCountryCode(countryName: string): string {
//   const country = countryCode.byCountry(countryName);

//   return country
//     ? `https://flagcdn.com/${country.iso2.toLowerCase()}.svg`
//     : `/flag.webp`;
// }




// https://flagcdn.com/MA.svg