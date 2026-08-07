import { n as N, t as M } from "../_libs/react-international-phone.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-B_8IvW9T.js
var PHONE_LENGTH_OVERRIDES = {
	ae: 9,
	in: 10,
	us: 10,
	gb: 10,
	sa: 9,
	bh: 8
};
var PARSED_COUNTRIES = M.map(N);
function getCountryByIso(iso2) {
	return PARSED_COUNTRIES.find((country) => country.iso2 === iso2) ?? PARSED_COUNTRIES.find((country) => country.iso2 === "ae");
}
function getExpectedPhoneLength(country) {
	const override = PHONE_LENGTH_OVERRIDES[country.iso2];
	if (override) return override;
	const format = country.format;
	if (typeof format === "string") {
		const dots = (format.match(/\./g) || []).length;
		if (dots > 0) return dots;
	}
	if (format && typeof format === "object" && "default" in format) {
		const dots = (String(format.default).match(/\./g) || []).length;
		if (dots > 0) return dots;
	}
	return 10;
}
function parseStoredPhone(storedPhone) {
	const trimmed = storedPhone.trim();
	const defaultCountry = getCountryByIso("ae");
	if (!trimmed) return {
		country: defaultCountry,
		localNumber: ""
	};
	const allDigits = trimmed.replace(/\D/g, "");
	const countries = [...PARSED_COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
	if (trimmed.startsWith("+") || allDigits.length > 10) {
		for (const country of countries) if (allDigits.startsWith(country.dialCode) && allDigits.length > country.dialCode.length) return {
			country,
			localNumber: allDigits.slice(country.dialCode.length)
		};
	}
	let local = allDigits;
	if (local.startsWith("91") && local.length > 10) local = local.slice(2);
	return {
		country: defaultCountry,
		localNumber: local
	};
}
function validatePhoneNumber(value, country, { required = true } = {}) {
	if (!value.trim()) return required ? "Please enter your phone number" : null;
	const cleanPhone = value.replace(/\D/g, "");
	const expectedLength = getExpectedPhoneLength(country);
	if (cleanPhone.length !== expectedLength) return `Phone number must be ${expectedLength} digits for ${country.name}`;
	return null;
}
function formatPhoneForApi(localDigits, country) {
	const clean = localDigits.replace(/\D/g, "").trim();
	if (!clean) return "";
	return `+${country.dialCode}${clean}`;
}
//#endregion
export { parseStoredPhone as a, getExpectedPhoneLength as i, formatPhoneForApi as n, validatePhoneNumber as o, getCountryByIso as r, PARSED_COUNTRIES as t };
