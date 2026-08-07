import { a as __toESM } from "../_runtime.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { m as getCustomerId } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as AddressesListSkeleton, t as AddressesGridSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Pencil, E as Plus, L as MapPin, at as EllipsisVertical, gt as Check, mt as ChevronLeft, u as Trash2 } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { n as formatFullAddress, r as getAddressType, t as AddAddressModal } from "./addressDisplay-CkJOG3Mm.mjs";
import { t as useRequireAuth } from "./useRequireAuth-flXyrm-M.mjs";
import { _ as useAddresses, h as deleteAddress } from "./router-BAl0mxep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.addresses-CZJ8oJNq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var addressesDesktop_module_default = {
	shell: "_shell_v1dmg_1",
	topBar: "_topBar_v1dmg_8",
	backBtn: "_backBtn_v1dmg_17",
	topTitle: "_topTitle_v1dmg_31",
	topSubtitle: "_topSubtitle_v1dmg_38",
	inner: "_inner_v1dmg_44",
	toolbar: "_toolbar_v1dmg_51",
	addBtn: "_addBtn_v1dmg_57",
	sectionTitle: "_sectionTitle_v1dmg_76",
	grid: "_grid_v1dmg_85",
	card: "_card_v1dmg_91",
	cardSelected: "_cardSelected_v1dmg_100",
	selectArea: "_selectArea_v1dmg_105",
	radio: "_radio_v1dmg_117",
	radioSelected: "_radioSelected_v1dmg_130",
	typeIconWrap: "_typeIconWrap_v1dmg_135",
	cardBody: "_cardBody_v1dmg_147",
	cardTopRow: "_cardTopRow_v1dmg_155",
	cardTitle: "_cardTitle_v1dmg_162",
	selectedBadge: "_selectedBadge_v1dmg_168",
	defaultBadge: "_defaultBadge_v1dmg_179",
	addressText: "_addressText_v1dmg_188",
	phoneText: "_phoneText_v1dmg_194",
	cardActions: "_cardActions_v1dmg_199",
	actionBtn: "_actionBtn_v1dmg_206",
	actionBtnDanger: "_actionBtnDanger_v1dmg_226",
	loadingWrap: "_loadingWrap_v1dmg_240",
	loadingSpinner: "_loadingSpinner_v1dmg_248",
	spin: "_spin_v1dmg_1",
	loadingText: "_loadingText_v1dmg_257",
	emptyState: "_emptyState_v1dmg_263",
	emptyIcon: "_emptyIcon_v1dmg_275",
	emptyTitle: "_emptyTitle_v1dmg_279",
	emptyText: "_emptyText_v1dmg_286",
	emptyBtn: "_emptyBtn_v1dmg_294"
};
function AddressesDesktop() {
	const isSelectMode = useSearch({ from: "/profile/addresses" }).select === "1";
	const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
	const { addresses, selectedAddressId, setSelectedAddressId, refreshAddresses, isLoading, error } = useAddresses();
	const [isAddressFormOpen, setIsAddressFormOpen] = (0, import_react.useState)(false);
	const [editingAddress, setEditingAddress] = (0, import_react.useState)(null);
	const [deletingId, setDeletingId] = (0, import_react.useState)(null);
	const [hasLoaded, setHasLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (authLoading || !isAuthenticated) return;
		refreshAddresses().catch(() => void 0).finally(() => setHasLoaded(true));
	}, [
		authLoading,
		isAuthenticated,
		refreshAddresses
	]);
	const loading = !hasLoaded || isLoading;
	const openAddForm = () => {
		setEditingAddress(null);
		setIsAddressFormOpen(true);
	};
	const openEditForm = (address) => {
		setEditingAddress(address);
		setIsAddressFormOpen(true);
	};
	const handleSelect = (addressId) => {
		setSelectedAddressId(addressId);
		if (isSelectMode) window.history.back();
	};
	const handleDelete = async (address) => {
		const customerId = getCustomerId();
		if (!customerId) return;
		if (!window.confirm("Delete this address?")) return;
		setDeletingId(address.id);
		try {
			if ((await deleteAddress(customerId, address.id)).status) await refreshAddresses();
		} finally {
			setDeletingId(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: addressesDesktop_module_default.shell,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: addressesDesktop_module_default.topBar,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: addressesDesktop_module_default.backBtn,
					onClick: () => window.history.back(),
					"aria-label": "Go back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 22 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: addressesDesktop_module_default.topTitle,
					children: isSelectMode ? "Select delivery address" : "My Addresses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: addressesDesktop_module_default.topSubtitle,
					children: isSelectMode ? "Choose where you want your order delivered" : "Manage your saved delivery locations"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: addressesDesktop_module_default.inner,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: addressesDesktop_module_default.toolbar,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: addressesDesktop_module_default.addBtn,
						onClick: openAddForm,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 18 }), "Add new address"]
					})
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressesGridSkeleton, { count: 4 }) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: addressesDesktop_module_default.emptyState,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							size: 64,
							className: addressesDesktop_module_default.emptyIcon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: addressesDesktop_module_default.emptyTitle,
							children: "Could not load addresses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: addressesDesktop_module_default.emptyText,
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: addressesDesktop_module_default.emptyBtn,
							onClick: () => void refreshAddresses(),
							children: "Try again"
						})
					]
				}) : addresses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: addressesDesktop_module_default.emptyState,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							size: 64,
							className: addressesDesktop_module_default.emptyIcon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: addressesDesktop_module_default.emptyTitle,
							children: "No addresses saved"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: addressesDesktop_module_default.emptyText,
							children: "Add a delivery address to start ordering from Deepfit."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: addressesDesktop_module_default.emptyBtn,
							onClick: openAddForm,
							children: "Add your first address"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: addressesDesktop_module_default.sectionTitle,
					children: "Your saved addresses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: addressesDesktop_module_default.grid,
					children: addresses.map((address) => {
						const { label, icon: TypeIcon } = getAddressType(address);
						const isSelected = address.id === selectedAddressId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: `${addressesDesktop_module_default.card} ${isSelected ? addressesDesktop_module_default.cardSelected : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: addressesDesktop_module_default.selectArea,
								onClick: () => handleSelect(address.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `${addressesDesktop_module_default.radio} ${isSelected ? addressesDesktop_module_default.radioSelected : ""}`,
										"aria-hidden": true,
										children: isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											size: 14,
											strokeWidth: 3
										}) : null
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: addressesDesktop_module_default.typeIconWrap,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeIcon, { size: 22 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: addressesDesktop_module_default.cardBody,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: addressesDesktop_module_default.cardTopRow,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: addressesDesktop_module_default.cardTitle,
														children: label
													}),
													isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: addressesDesktop_module_default.selectedBadge,
														children: "Selected"
													}) : null,
													address.isDefault && !isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: addressesDesktop_module_default.defaultBadge,
														children: "Default"
													}) : null
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: addressesDesktop_module_default.addressText,
												children: formatFullAddress(address)
											}),
											address.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: addressesDesktop_module_default.phoneText,
												children: address.phone
											}) : null
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: addressesDesktop_module_default.cardActions,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: addressesDesktop_module_default.actionBtn,
									onClick: () => openEditForm(address),
									"aria-label": `Edit ${label} address`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 16 }), "Edit"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: `${addressesDesktop_module_default.actionBtn} ${addressesDesktop_module_default.actionBtnDanger}`,
									onClick: () => void handleDelete(address),
									disabled: deletingId === address.id,
									"aria-label": `Delete ${label} address`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 }), "Delete"]
								})]
							})]
						}, address.id);
					})
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddAddressModal, {
				isOpen: isAddressFormOpen,
				editAddress: editingAddress,
				onClose: () => {
					setIsAddressFormOpen(false);
					setEditingAddress(null);
				},
				onSaved: refreshAddresses
			})
		]
	});
}
var addresses_module_default = {
	container: "_container_1wvbq_1",
	header: "_header_1wvbq_9",
	backBtn: "_backBtn_1wvbq_20",
	pageTitle: "_pageTitle_1wvbq_32",
	content: "_content_1wvbq_38",
	addRow: "_addRow_1wvbq_45",
	addIconWrap: "_addIconWrap_1wvbq_59",
	addText: "_addText_1wvbq_71",
	sectionTitle: "_sectionTitle_1wvbq_77",
	addressList: "_addressList_1wvbq_84",
	addressCard: "_addressCard_1wvbq_90",
	addressCardSelected: "_addressCardSelected_1wvbq_97",
	cardMain: "_cardMain_1wvbq_102",
	typeIconWrap: "_typeIconWrap_1wvbq_108",
	cardBody: "_cardBody_1wvbq_120",
	cardTopRow: "_cardTopRow_1wvbq_125",
	titleRow: "_titleRow_1wvbq_133",
	addressLabel: "_addressLabel_1wvbq_140",
	defaultBadge: "_defaultBadge_1wvbq_147",
	menuWrap: "_menuWrap_1wvbq_153",
	menuBtn: "_menuBtn_1wvbq_158",
	menu: "_menu_1wvbq_153",
	menuItem: "_menuItem_1wvbq_189",
	menuItemDanger: "_menuItemDanger_1wvbq_207",
	addressText: "_addressText_1wvbq_211",
	phoneText: "_phoneText_1wvbq_218",
	statusText: "_statusText_1wvbq_224",
	emptyState: "_emptyState_1wvbq_231",
	emptyIcon: "_emptyIcon_1wvbq_239"
};
function AddressesMobile() {
	const isSelectMode = useSearch({ from: "/profile/addresses" }).select === "1";
	const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
	const { addresses, selectedAddressId, setSelectedAddressId, refreshAddresses, error } = useAddresses();
	const [isAddressFormOpen, setIsAddressFormOpen] = (0, import_react.useState)(false);
	const [editingAddress, setEditingAddress] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [menuAddress, setMenuAddress] = (0, import_react.useState)(null);
	const [deletingId, setDeletingId] = (0, import_react.useState)(null);
	const menuRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (authLoading || !isAuthenticated) return;
		refreshAddresses().catch(() => void 0).finally(() => setLoading(false));
	}, [
		authLoading,
		isAuthenticated,
		refreshAddresses
	]);
	(0, import_react.useEffect)(() => {
		if (!menuAddress) return;
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) setMenuAddress(null);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [menuAddress]);
	const openAddForm = () => {
		setEditingAddress(null);
		setIsAddressFormOpen(true);
	};
	const openEditForm = (address) => {
		setMenuAddress(null);
		setEditingAddress(address);
		setIsAddressFormOpen(true);
	};
	const handleDelete = async (address) => {
		const customerId = getCustomerId();
		if (!customerId) return;
		if (!window.confirm("Delete this address?")) return;
		setMenuAddress(null);
		setDeletingId(address.id);
		try {
			if ((await deleteAddress(customerId, address.id)).status) await refreshAddresses();
		} finally {
			setDeletingId(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: addresses_module_default.container,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: addresses_module_default.header,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: addresses_module_default.backBtn,
					onClick: () => window.history.back(),
					"aria-label": "Go back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: addresses_module_default.pageTitle,
					children: isSelectMode ? "Select Address" : "My Addresses"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: addresses_module_default.content,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: addresses_module_default.addRow,
					onClick: openAddForm,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: addresses_module_default.addIconWrap,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: addresses_module_default.addText,
						children: "Add new address"
					})]
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressesListSkeleton, { count: 3 }) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: addresses_module_default.emptyState,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							size: 48,
							className: addresses_module_default.emptyIcon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: addresses_module_default.statusText,
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: addresses_module_default.addRow,
							onClick: () => void refreshAddresses(),
							children: "Try again"
						})
					]
				}) : addresses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: addresses_module_default.emptyState,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						size: 48,
						className: addresses_module_default.emptyIcon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: addresses_module_default.statusText,
						children: "No addresses saved"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: addresses_module_default.sectionTitle,
					children: "Your saved addresses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: addresses_module_default.addressList,
					children: addresses.map((address, index) => {
						const { label, icon: TypeIcon } = getAddressType(address);
						const isMenuOpen = menuAddress?.id === address.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
							className: `${addresses_module_default.addressCard} ${isSelectMode && address.id === selectedAddressId ? addresses_module_default.addressCardSelected : ""}`,
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .3,
								delay: index * .05
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: addresses_module_default.cardMain,
								role: isSelectMode ? "button" : void 0,
								tabIndex: isSelectMode ? 0 : void 0,
								onClick: isSelectMode ? () => {
									setSelectedAddressId(address.id);
									window.history.back();
								} : void 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: addresses_module_default.typeIconWrap,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeIcon, { size: 22 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: addresses_module_default.cardBody,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: addresses_module_default.cardTopRow,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: addresses_module_default.titleRow,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: addresses_module_default.addressLabel,
													children: label
												}), address.isDefault ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: addresses_module_default.defaultBadge,
													children: "Default"
												}) : null]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: addresses_module_default.menuWrap,
												ref: isMenuOpen ? menuRef : null,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: addresses_module_default.menuBtn,
													onClick: (event) => {
														event.stopPropagation();
														setMenuAddress(isMenuOpen ? null : address);
													},
													"aria-label": "Address actions",
													disabled: deletingId === address.id,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { size: 18 })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isMenuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
													className: addresses_module_default.menu,
													initial: {
														opacity: 0,
														y: -4
													},
													animate: {
														opacity: 1,
														y: 0
													},
													exit: {
														opacity: 0,
														y: -4
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														className: addresses_module_default.menuItem,
														onClick: () => openEditForm(address),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Edit Address" })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														className: `${addresses_module_default.menuItem} ${addresses_module_default.menuItemDanger}`,
														onClick: () => void handleDelete(address),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delete Address" })]
													})]
												}) : null })]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: addresses_module_default.addressText,
											children: formatFullAddress(address)
										}),
										address.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: addresses_module_default.phoneText,
											children: address.phone
										}) : null
									]
								})]
							})
						}, address.id);
					})
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddAddressModal, {
				isOpen: isAddressFormOpen,
				editAddress: editingAddress,
				onClose: () => {
					setIsAddressFormOpen(false);
					setEditingAddress(null);
				},
				onSaved: refreshAddresses
			})
		]
	});
}
function AddressesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-sub-desktop-only",
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressesDesktop, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-sub-mobile-only",
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressesMobile, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-sub-desktop-only",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .profile-sub-desktop-only { display: none; }
        .profile-sub-mobile-only { display: block; }
        @media (min-width: 1024px) {
          .profile-sub-desktop-only { display: block; }
          .profile-sub-mobile-only { display: none; }
        }
      ` })
		]
	});
}
var SplitComponent = AddressesPage;
//#endregion
export { SplitComponent as component };
