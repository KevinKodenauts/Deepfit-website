import { a as __toESM } from "../_runtime.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as Search, ht as ChevronDown, n as X } from "../_libs/lucide-react.mjs";
import { r as q } from "../_libs/react-international-phone.mjs";
import { i as getExpectedPhoneLength, t as PARSED_COUNTRIES } from "./utils-B_8IvW9T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CountryPhoneField-B46LXByD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var countryPickerSheet_module_default = {
	backdrop: "_backdrop_mw83p_1",
	sheet: "_sheet_mw83p_11",
	handle: "_handle_mw83p_22",
	header: "_header_mw83p_31",
	title: "_title_mw83p_38",
	closeBtn: "_closeBtn_mw83p_44",
	searchWrap: "_searchWrap_mw83p_53",
	searchIcon: "_searchIcon_mw83p_58",
	searchInput: "_searchInput_mw83p_66",
	list: "_list_mw83p_80",
	countryRow: "_countryRow_mw83p_86",
	countryRowActive: "_countryRowActive_mw83p_103",
	flag: "_flag_mw83p_107",
	countryName: "_countryName_mw83p_115",
	dialCode: "_dialCode_mw83p_121"
};
function CountryPickerSheet({ isOpen, selectedIso, onClose, onSelect }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const filteredCountries = (0, import_react.useMemo)(() => {
		const normalized = query.trim().toLowerCase();
		if (!normalized) return PARSED_COUNTRIES;
		return PARSED_COUNTRIES.filter((country) => country.name.toLowerCase().includes(normalized) || country.dialCode.includes(normalized) || country.iso2.includes(normalized));
	}, [query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: countryPickerSheet_module_default.backdrop,
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: countryPickerSheet_module_default.sheet,
			initial: { y: "100%" },
			animate: { y: 0 },
			exit: { y: "100%" },
			transition: {
				type: "spring",
				damping: 28,
				stiffness: 320
			},
			onClick: (event) => event.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: countryPickerSheet_module_default.handle }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: countryPickerSheet_module_default.header,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: countryPickerSheet_module_default.title,
						children: "Select Country"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: countryPickerSheet_module_default.closeBtn,
						onClick: onClose,
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: countryPickerSheet_module_default.searchWrap,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						size: 18,
						className: countryPickerSheet_module_default.searchIcon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "search",
						className: countryPickerSheet_module_default.searchInput,
						placeholder: "Search country or code",
						value: query,
						onChange: (event) => setQuery(event.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: countryPickerSheet_module_default.list,
					children: filteredCountries.map((country) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `${countryPickerSheet_module_default.countryRow} ${country.iso2 === selectedIso ? countryPickerSheet_module_default.countryRowActive : ""}`,
						onClick: () => {
							onSelect(country);
							setQuery("");
							onClose();
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(q, {
								iso2: country.iso2,
								className: countryPickerSheet_module_default.flag
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: countryPickerSheet_module_default.countryName,
								children: country.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: countryPickerSheet_module_default.dialCode,
								children: ["+", country.dialCode]
							})
						]
					}, country.iso2))
				})
			]
		})
	}) });
}
var countryPhoneField_module_default = {
	field: "_field_1dybl_1",
	fieldCompact: "_fieldCompact_1dybl_5",
	label: "_label_1dybl_9",
	inputWrap: "_inputWrap_1dybl_17",
	inputWrapError: "_inputWrapError_1dybl_32",
	countryBtn: "_countryBtn_1dybl_36",
	flag: "_flag_1dybl_47",
	dialCode: "_dialCode_1dybl_54",
	chevron: "_chevron_1dybl_60",
	divider: "_divider_1dybl_64",
	phoneInput: "_phoneInput_1dybl_71",
	helper: "_helper_1dybl_86",
	error: "_error_1dybl_92"
};
function CountryPhoneField({ label, value, country, onValueChange, onCountryChange, optional = false, error, placeholder, showChevron = true, compact = false }) {
	const [pickerOpen, setPickerOpen] = (0, import_react.useState)(false);
	const expectedLength = getExpectedPhoneLength(country);
	const inputPlaceholder = placeholder ?? (optional ? "Optional" : "Enter phone number");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${countryPhoneField_module_default.field}${compact ? ` ${countryPhoneField_module_default.fieldCompact}` : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: countryPhoneField_module_default.label,
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${countryPhoneField_module_default.inputWrap} ${error ? countryPhoneField_module_default.inputWrapError : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: countryPhoneField_module_default.countryBtn,
					onClick: () => setPickerOpen(true),
					"aria-label": "Select country code",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(q, {
							iso2: country.iso2,
							className: countryPhoneField_module_default.flag
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: countryPhoneField_module_default.dialCode,
							children: ["+", country.dialCode]
						}),
						showChevron && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
							size: 16,
							className: countryPhoneField_module_default.chevron
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: countryPhoneField_module_default.divider })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "tel",
					inputMode: "numeric",
					className: countryPhoneField_module_default.phoneInput,
					value,
					maxLength: expectedLength,
					onChange: (event) => {
						onValueChange(event.target.value.replace(/\D/g, "").slice(0, expectedLength));
					},
					placeholder: inputPlaceholder
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: countryPhoneField_module_default.helper,
				children: optional ? `Optional (${expectedLength} digits)` : `Must be ${expectedLength} digits`
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: countryPhoneField_module_default.error,
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryPickerSheet, {
				isOpen: pickerOpen,
				selectedIso: country.iso2,
				onClose: () => setPickerOpen(false),
				onSelect: onCountryChange
			})
		]
	});
}
//#endregion
export { CountryPhoneField as t };
