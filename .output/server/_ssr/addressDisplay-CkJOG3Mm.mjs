import { a as __toESM } from "../_runtime.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { m as getCustomerId } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { L as MapPin, Q as Globe, R as Mailbox, X as House, _t as Building2, ht as ChevronDown, n as X, vt as Briefcase } from "../_libs/lucide-react.mjs";
import { o as useBodyScrollLock } from "./Nav-BaCy2SUO.mjs";
import { t as useBreakpoint } from "./useBreakpoint-lPiqp3A4.mjs";
import { f as UAE_COUNTRY, g as updateAddress, m as addAddress, p as UAE_EMIRATES } from "./router-BAl0mxep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/addressDisplay-CkJOG3Mm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var addAddressModal_module_default = {
	backdrop: "_backdrop_n0d5c_1",
	backdropDesktop: "_backdropDesktop_n0d5c_11",
	sheet: "_sheet_n0d5c_18",
	sheetDesktop: "_sheetDesktop_n0d5c_29",
	handle: "_handle_n0d5c_39",
	header: "_header_n0d5c_48",
	headerText: "_headerText_n0d5c_56",
	title: "_title_n0d5c_60",
	subtitle: "_subtitle_n0d5c_67",
	closeBtn: "_closeBtn_n0d5c_74",
	divider: "_divider_n0d5c_89",
	form: "_form_n0d5c_95",
	gridRow: "_gridRow_n0d5c_102",
	field: "_field_n0d5c_109",
	label: "_label_n0d5c_120",
	optional: "_optional_n0d5c_126",
	typeRow: "_typeRow_n0d5c_131",
	typeBtn: "_typeBtn_n0d5c_137",
	typeBtnActive: "_typeBtnActive_n0d5c_163",
	inputWrap: "_inputWrap_n0d5c_170",
	inputIcon: "_inputIcon_n0d5c_174",
	input: "_input_n0d5c_170",
	inputReadonly: "_inputReadonly_n0d5c_199",
	selectWrap: "_selectWrap_n0d5c_204",
	select: "_select_n0d5c_204",
	selectIcon: "_selectIcon_n0d5c_225",
	error: "_error_n0d5c_234",
	footer: "_footer_n0d5c_240",
	saveBtn: "_saveBtn_n0d5c_248",
	cancelBtn: "_cancelBtn_n0d5c_270"
};
function resolveEmirate(state) {
	if (!state) return "";
	return UAE_EMIRATES.find((emirate) => emirate.toLowerCase() === state.toLowerCase()) ?? state;
}
function resolvePoBox(pincode) {
	if (!pincode || pincode === "00000") return "";
	return pincode;
}
function resolveAddressType(type) {
	const normalized = (type ?? "").toLowerCase();
	if (normalized.includes("work") || normalized.includes("office")) return "Work";
	return "Home";
}
function AddAddressModal({ isOpen, onClose, onSaved, editAddress = null }) {
	const { isDesktop, isHydrated } = useBreakpoint();
	const desktop = isHydrated && isDesktop;
	const isEditMode = editAddress != null;
	const [poBox, setPoBox] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [emirate, setEmirate] = (0, import_react.useState)("");
	const [addressType, setAddressType] = (0, import_react.useState)("Home");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	useBodyScrollLock(isOpen);
	(0, import_react.useEffect)(() => {
		if (!isOpen) return;
		if (editAddress) {
			setPoBox(resolvePoBox(editAddress.pincode));
			setAddress(editAddress.address);
			setCity(editAddress.city);
			setEmirate(resolveEmirate(editAddress.state));
			setAddressType(resolveAddressType(editAddress.type));
		} else {
			setPoBox("");
			setAddress("");
			setCity("");
			setEmirate("");
			setAddressType("Home");
		}
		setError("");
		setSaving(false);
	}, [isOpen, editAddress]);
	const handleSave = async () => {
		if (!address.trim() || !city.trim() || !emirate) {
			setError("Please fill address, city, and emirate.");
			return;
		}
		setSaving(true);
		setError("");
		try {
			const customerId = getCustomerId();
			if (!customerId) {
				setError("Please sign in to save your address.");
				return;
			}
			if (isEditMode && editAddress) {
				const result = await updateAddress({
					customerId,
					addressId: editAddress.id,
					addressLine1: address.trim(),
					city: city.trim(),
					state: emirate,
					pincode: poBox.trim() || "00000",
					addressType,
					country: editAddress.country || "United Arab Emirates",
					isDefault: editAddress.isDefault
				});
				if (!result.status) {
					setError(result.message ?? "Could not update address.");
					return;
				}
			} else {
				const result = await addAddress({
					customerId,
					addressLine1: address.trim(),
					city: city.trim(),
					state: emirate,
					pincode: poBox.trim() || "00000",
					addressType,
					country: UAE_COUNTRY
				});
				if (!result.status) {
					setError(result.message ?? "Could not save address.");
					return;
				}
			}
			onSaved?.();
			onClose();
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${addAddressModal_module_default.backdrop} ${desktop ? addAddressModal_module_default.backdropDesktop : ""}`,
		"data-lenis-prevent": true,
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: `${addAddressModal_module_default.sheet} ${desktop ? addAddressModal_module_default.sheetDesktop : ""}`,
			initial: desktop ? {
				opacity: 0,
				scale: .96,
				y: 12
			} : { y: "100%" },
			animate: desktop ? {
				opacity: 1,
				scale: 1,
				y: 0
			} : { y: 0 },
			exit: desktop ? {
				opacity: 0,
				scale: .96,
				y: 12
			} : { y: "100%" },
			transition: desktop ? {
				duration: .22,
				ease: [
					.22,
					1,
					.36,
					1
				]
			} : {
				type: "spring",
				damping: 28,
				stiffness: 320
			},
			onClick: (event) => event.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "add-address-title",
			children: [
				!desktop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: addAddressModal_module_default.handle }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: addAddressModal_module_default.header,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: addAddressModal_module_default.headerText,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "add-address-title",
							className: addAddressModal_module_default.title,
							children: isEditMode ? "Edit Address" : "Add New Address"
						}), desktop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: addAddressModal_module_default.subtitle,
							children: isEditMode ? "Update your delivery details below." : "Enter your UAE delivery location for faster checkout."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: addAddressModal_module_default.closeBtn,
						onClick: onClose,
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: desktop ? 20 : 24 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: addAddressModal_module_default.divider }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: addAddressModal_module_default.form,
					"data-lenis-prevent": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: addAddressModal_module_default.field,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: addAddressModal_module_default.label,
								children: "Address type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: addAddressModal_module_default.typeRow,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: `${addAddressModal_module_default.typeBtn} ${addressType === "Home" ? addAddressModal_module_default.typeBtnActive : ""}`,
									onClick: () => setAddressType("Home"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { size: 18 }), "Home"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: `${addAddressModal_module_default.typeBtn} ${addressType === "Work" ? addAddressModal_module_default.typeBtnActive : ""}`,
									onClick: () => setAddressType("Work"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { size: 18 }), "Work"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: addAddressModal_module_default.field,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: addAddressModal_module_default.label,
								htmlFor: "address-line",
								children: "Street address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: addAddressModal_module_default.inputWrap,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									size: 18,
									className: addAddressModal_module_default.inputIcon
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "address-line",
									type: "text",
									className: addAddressModal_module_default.input,
									placeholder: "Villa/Apartment, Street, Area",
									value: address,
									onChange: (event) => setAddress(event.target.value)
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: addAddressModal_module_default.gridRow,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: addAddressModal_module_default.field,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: addAddressModal_module_default.label,
									htmlFor: "address-city",
									children: "City"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: addAddressModal_module_default.inputWrap,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
										size: 18,
										className: addAddressModal_module_default.inputIcon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "address-city",
										type: "text",
										className: addAddressModal_module_default.input,
										placeholder: "City",
										value: city,
										onChange: (event) => setCity(event.target.value)
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: addAddressModal_module_default.field,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: addAddressModal_module_default.label,
									htmlFor: "address-emirate",
									children: "Emirate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: addAddressModal_module_default.selectWrap,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "address-emirate",
										className: addAddressModal_module_default.select,
										value: emirate,
										onChange: (event) => setEmirate(event.target.value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Select emirate"
										}), UAE_EMIRATES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: item,
											children: item
										}, item))]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
										size: 18,
										className: addAddressModal_module_default.selectIcon
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: addAddressModal_module_default.gridRow,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: addAddressModal_module_default.field,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: addAddressModal_module_default.label,
									htmlFor: "address-pobox",
									children: ["P.O. Box ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: addAddressModal_module_default.optional,
										children: "(optional)"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: addAddressModal_module_default.inputWrap,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mailbox, {
										size: 18,
										className: addAddressModal_module_default.inputIcon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "address-pobox",
										type: "text",
										className: addAddressModal_module_default.input,
										placeholder: "P.O. Box",
										value: poBox,
										onChange: (event) => setPoBox(event.target.value)
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: addAddressModal_module_default.field,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: addAddressModal_module_default.label,
									htmlFor: "address-country",
									children: "Country"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: addAddressModal_module_default.inputWrap,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
										size: 18,
										className: addAddressModal_module_default.inputIcon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "address-country",
										type: "text",
										className: `${addAddressModal_module_default.input} ${addAddressModal_module_default.inputReadonly}`,
										value: "UAE",
										readOnly: true
									})]
								})]
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: addAddressModal_module_default.error,
							children: error
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: addAddressModal_module_default.footer,
					children: [desktop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: addAddressModal_module_default.cancelBtn,
						onClick: onClose,
						disabled: saving,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: addAddressModal_module_default.saveBtn,
						onClick: handleSave,
						disabled: saving,
						children: saving ? isEditMode ? "Updating..." : "Saving..." : isEditMode ? "Update Address" : "Save Address"
					})]
				})
			]
		})
	}) });
}
function formatFullAddress(address) {
	return [
		address.address,
		address.city,
		address.state,
		address.pincode,
		address.country
	].filter(Boolean).join(", ");
}
function getAddressType(address) {
	const label = (address.type || address.addressLabel || "Home").toLowerCase();
	if (label.includes("work") || label.includes("office")) return {
		label: "Work",
		icon: Building2
	};
	if (label.includes("home") || label.includes("house")) return {
		label: "Home",
		icon: House
	};
	return {
		label: address.type || "Other",
		icon: MapPin
	};
}
//#endregion
export { formatFullAddress as n, getAddressType as r, AddAddressModal as t };
