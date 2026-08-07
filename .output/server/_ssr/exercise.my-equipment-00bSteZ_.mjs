import { a as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as EquipmentCardSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link, b as useRouter, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { mt as ChevronLeft, ot as Dumbbell, wt as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as useBreakpoint } from "./useBreakpoint-lPiqp3A4.mjs";
import { n as getEquipmentList } from "./exercise-a9sO23D0.mjs";
import { n as parseEquipmentIds, r as saveSelectedEquipment, t as getSelectedEquipment } from "./selection-BcMgILWp.mjs";
import { s as Route } from "./router-BAl0mxep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exercise.my-equipment-00bSteZ_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function resolveSelectedIds(idsParam) {
	const fromUrl = parseEquipmentIds(idsParam);
	if (fromUrl.length > 0) return fromUrl;
	if (typeof window !== "undefined") try {
		const params = new URLSearchParams(window.location.search);
		const fromLocation = parseEquipmentIds(params.get("ids"));
		if (fromLocation.length > 0) return fromLocation;
	} catch {}
	return getSelectedEquipment().filter((id) => Number(id) > 0);
}
function useMyEquipmentPage(idsParam) {
	const navigate = useNavigate();
	const [equipmentList, setEquipmentList] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [loadError, setLoadError] = (0, import_react.useState)(false);
	const selectedIds = (0, import_react.useMemo)(() => resolveSelectedIds(idsParam), [idsParam]);
	const selectedKey = selectedIds.join(",");
	(0, import_react.useEffect)(() => {
		const ids = resolveSelectedIds(idsParam);
		if (ids.length === 0) {
			const timer = window.setTimeout(() => {
				if (resolveSelectedIds(idsParam).length === 0) navigate({
					to: "/exercise",
					replace: true
				});
			}, 50);
			return () => window.clearTimeout(timer);
		}
		if (!parseEquipmentIds(idsParam).length) navigate({
			to: "/exercise/my-equipment",
			search: { ids: ids.join(",") },
			replace: true
		});
		saveSelectedEquipment(ids);
		let cancelled = false;
		setLoading(true);
		setLoadError(false);
		getEquipmentList().then((data) => {
			if (cancelled) return;
			const selected = new Set(ids.map(Number));
			setEquipmentList(data.filter((item) => selected.has(Number(item.id))));
		}).catch(() => {
			if (cancelled) return;
			setEquipmentList([]);
			setLoadError(true);
		}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [
		navigate,
		selectedKey,
		idsParam
	]);
	return {
		navigate,
		equipmentList,
		loading,
		loadError,
		selectedIds,
		librarySearch: { equipment_ids: selectedKey },
		reload: () => {
			const ids = resolveSelectedIds(idsParam);
			if (ids.length === 0) return;
			setLoading(true);
			setLoadError(false);
			getEquipmentList().then((data) => {
				const selected = new Set(ids.map(Number));
				setEquipmentList(data.filter((item) => selected.has(Number(item.id))));
			}).catch(() => {
				setEquipmentList([]);
				setLoadError(true);
			}).finally(() => setLoading(false));
		}
	};
}
var my_equipment_module_default = {
	container: "_container_1g7xt_1",
	header: "_header_1g7xt_10",
	backBtn: "_backBtn_1g7xt_20",
	pageTitle: "_pageTitle_1g7xt_32",
	subtitleBlock: "_subtitleBlock_1g7xt_41",
	subtitle: "_subtitle_1g7xt_41",
	badge: "_badge_1g7xt_52",
	statusText: "_statusText_1g7xt_62",
	listArea: "_listArea_1g7xt_70",
	equipCard: "_equipCard_1g7xt_78",
	imageWrap: "_imageWrap_1g7xt_89",
	equipImage: "_equipImage_1g7xt_96",
	primaryBadge: "_primaryBadge_1g7xt_100",
	cardBody: "_cardBody_1g7xt_113",
	cardHeader: "_cardHeader_1g7xt_120",
	equipTitle: "_equipTitle_1g7xt_127",
	deleteBtn: "_deleteBtn_1g7xt_133",
	category: "_category_1g7xt_142",
	description: "_description_1g7xt_154",
	howToUseBtn: "_howToUseBtn_1g7xt_163",
	listAreaTabletThree: "_listAreaTabletThree_1g7xt_200"
};
var my_equipment_desktop_module_default = {
	shell: "_shell_ua88n_1",
	inner: "_inner_ua88n_13",
	pageHeader: "_pageHeader_ua88n_20",
	pageHeaderMain: "_pageHeaderMain_ua88n_28",
	pageTitle: "_pageTitle_ua88n_32",
	pageSubtitle: "_pageSubtitle_ua88n_39",
	badge: "_badge_ua88n_47",
	headerActions: "_headerActions_ua88n_58",
	editBtn: "_editBtn_ua88n_65",
	startBtn: "_startBtn_ua88n_83",
	grid: "_grid_ua88n_105",
	loadingGrid: "_loadingGrid_ua88n_111",
	skeletonCard: "_skeletonCard_ua88n_117",
	shimmer: "_shimmer_ua88n_1",
	card: "_card_ua88n_134",
	imageWrap: "_imageWrap_ua88n_151",
	image: "_image_ua88n_151",
	primaryBadge: "_primaryBadge_ua88n_161",
	cardBody: "_cardBody_ua88n_175",
	cardTop: "_cardTop_ua88n_182",
	cardTitle: "_cardTitle_ua88n_190",
	category: "_category_ua88n_198",
	description: "_description_ua88n_209",
	howToUseBtn: "_howToUseBtn_ua88n_221",
	statusCard: "_statusCard_ua88n_239",
	statusIcon: "_statusIcon_ua88n_248",
	statusTitle: "_statusTitle_ua88n_253",
	statusText: "_statusText_ua88n_260",
	retryBtn: "_retryBtn_ua88n_266"
};
function MyEquipmentPage() {
	const { ids } = Route.useSearch();
	const { isDesktop } = useBreakpoint();
	const page = useMyEquipmentPage(ids);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { paddingTop: "var(--desktop-nav-height)" },
			children: isDesktop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyEquipmentDesktop, { ...page }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyEquipmentMobile, { ...page })
		})]
	});
}
function MyEquipmentMobile({ navigate, equipmentList, loading, loadError, librarySearch }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: my_equipment_module_default.container,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: my_equipment_module_default.header,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: my_equipment_module_default.backBtn,
					onClick: () => router.history.back(),
					"aria-label": "Go back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: my_equipment_module_default.pageTitle,
					children: "My Equipment"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: my_equipment_module_default.subtitleBlock,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: my_equipment_module_default.subtitle,
					children: "Gear currently in your arsenal for precision training."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: my_equipment_module_default.badge,
					children: [equipmentList.length, " Items Selected"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${my_equipment_module_default.listArea} ${!loading && equipmentList.length >= 3 ? my_equipment_module_default.listAreaTabletThree : ""}`,
				children: [
					loading ? Array.from({ length: 3 }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentCardSkeleton, {}, index)) : null,
					!loading && loadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: my_equipment_module_default.statusText,
						children: "Could not load equipment. Please try again."
					}) : null,
					!loading && equipmentList.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: my_equipment_module_default.equipCard,
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .4,
							delay: i * .1
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: my_equipment_module_default.imageWrap,
							children: [item.isPrimary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: my_equipment_module_default.primaryBadge,
								children: "Primary"
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.equipmentImage || "/images/dumbbells.png",
								alt: item.name,
								className: my_equipment_module_default.equipImage,
								style: {
									position: "absolute",
									inset: 0,
									width: "100%",
									height: "100%"
								}
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: my_equipment_module_default.cardBody,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: my_equipment_module_default.cardHeader,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: my_equipment_module_default.equipTitle,
										children: item.name
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: my_equipment_module_default.category,
									children: item.category ?? "Equipment"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: my_equipment_module_default.description,
									children: item.description ?? "Premium fitness equipment designed for precision training."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: my_equipment_module_default.howToUseBtn,
									onClick: () => void navigate({
										to: "/exercise/equipment/$id",
										params: { id: String(item.id) }
									}),
									children: "How To Use"
								})
							]
						})]
					}, item.id))
				]
			}),
			!loading && !loadError && equipmentList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { padding: "0 24px 32px" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/exercise/library",
					search: librarySearch,
					className: my_equipment_desktop_module_default.startBtn,
					style: {
						width: "100%",
						justifyContent: "center"
					},
					children: ["Start training", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
				})
			}) : null
		]
	});
}
function MyEquipmentDesktop({ navigate, equipmentList, loading, loadError, librarySearch, reload }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: my_equipment_desktop_module_default.shell,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: my_equipment_desktop_module_default.inner,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: my_equipment_desktop_module_default.pageHeader,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: my_equipment_desktop_module_default.pageHeaderMain,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: my_equipment_desktop_module_default.pageTitle,
							children: "My Equipment"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: my_equipment_desktop_module_default.pageSubtitle,
							children: "Gear in your arsenal for precision training. Review usage guides and start your workout library."
						}),
						!loading && !loadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: my_equipment_desktop_module_default.badge,
							children: [
								equipmentList.length,
								" ",
								equipmentList.length === 1 ? "item" : "items",
								" selected"
							]
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: my_equipment_desktop_module_default.headerActions,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: my_equipment_desktop_module_default.editBtn,
						onClick: () => void navigate({ to: "/exercise" }),
						children: "Edit selection"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/exercise/library",
						search: librarySearch,
						className: my_equipment_desktop_module_default.startBtn,
						children: ["Start training", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
					})]
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: my_equipment_desktop_module_default.loadingGrid,
				children: Array.from({ length: 3 }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentCardSkeleton, {}, index))
			}) : loadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: my_equipment_desktop_module_default.statusCard,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, {
						size: 64,
						strokeWidth: 1.2,
						className: my_equipment_desktop_module_default.statusIcon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: my_equipment_desktop_module_default.statusTitle,
						children: "Could not load equipment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: my_equipment_desktop_module_default.statusText,
						children: "Please check your connection and try again."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: my_equipment_desktop_module_default.retryBtn,
						onClick: reload,
						children: "Retry"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: my_equipment_desktop_module_default.grid,
				children: equipmentList.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: my_equipment_desktop_module_default.card,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: my_equipment_desktop_module_default.imageWrap,
						children: [item.isPrimary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: my_equipment_desktop_module_default.primaryBadge,
							children: "Primary"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.equipmentImage || "/images/dumbbells.png",
							alt: item.name,
							className: my_equipment_desktop_module_default.image,
							style: {
								position: "absolute",
								inset: 0,
								width: "100%",
								height: "100%",
								objectFit: "cover"
							}
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: my_equipment_desktop_module_default.cardBody,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: my_equipment_desktop_module_default.cardTop,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: my_equipment_desktop_module_default.cardTitle,
									children: item.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: my_equipment_desktop_module_default.category,
								children: item.category ?? "Equipment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: my_equipment_desktop_module_default.description,
								children: item.description ?? "Premium fitness equipment designed for precision training."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: my_equipment_desktop_module_default.howToUseBtn,
								onClick: () => void navigate({
									to: "/exercise/equipment/$id",
									params: { id: String(item.id) }
								}),
								children: "How to use"
							})
						]
					})]
				}, item.id))
			})]
		})
	});
}
//#endregion
export { MyEquipmentPage as component };
