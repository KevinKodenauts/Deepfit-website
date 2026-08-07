import { a as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as EquipmentCardSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Play, _ as SkipForward, j as Pause, mt as ChevronLeft, v as SkipBack, w as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { r as getExerciseById } from "./exercise-a9sO23D0.mjs";
import { u as Route } from "./router-BAl0mxep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exercise.active._id-CtI6Ek6Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var explore_active_module_default = {
	container: "_container_1e21f_1",
	loadingWrap: "_loadingWrap_1e21f_10",
	errorText: "_errorText_1e21f_14",
	pageHeader: "_pageHeader_1e21f_20",
	pageBackBtn: "_pageBackBtn_1e21f_29",
	pageTitle: "_pageTitle_1e21f_40",
	headerSpacer: "_headerSpacer_1e21f_52",
	bodyLayout: "_bodyLayout_1e21f_56",
	mediaSection: "_mediaSection_1e21f_68",
	mediaImage: "_mediaImage_1e21f_78",
	mediaOverlay: "_mediaOverlay_1e21f_82",
	mediaTopBar: "_mediaTopBar_1e21f_94",
	mediaTopLeft: "_mediaTopLeft_1e21f_106",
	mediaTopIcons: "_mediaTopIcons_1e21f_115",
	mediaTopRight: "_mediaTopRight_1e21f_121",
	avatarBtn: "_avatarBtn_1e21f_128",
	pulseBtn: "_pulseBtn_1e21f_129",
	formCheckBtn: "_formCheckBtn_1e21f_146",
	menuBtn: "_menuBtn_1e21f_162",
	workoutInfo: "_workoutInfo_1e21f_173",
	workoutTitle: "_workoutTitle_1e21f_177",
	workoutLabel: "_workoutLabel_1e21f_186",
	timerCenter: "_timerCenter_1e21f_197",
	timerWrapper: "_timerWrapper_1e21f_207",
	timerRing: "_timerRing_1e21f_217",
	timerRingTrack: "_timerRingTrack_1e21f_225",
	timerRingProgress: "_timerRingProgress_1e21f_231",
	timerContent: "_timerContent_1e21f_239",
	timerValue: "_timerValue_1e21f_248",
	timerLabel: "_timerLabel_1e21f_255",
	bottomImageInfo: "_bottomImageInfo_1e21f_264",
	bottomTextBlock: "_bottomTextBlock_1e21f_276",
	exerciseBadge: "_exerciseBadge_1e21f_281",
	exerciseName: "_exerciseName_1e21f_293",
	videoPlayBtn: "_videoPlayBtn_1e21f_301",
	bottomSpacer: "_bottomSpacer_1e21f_312",
	playCircle: "_playCircle_1e21f_316",
	statsContainer: "_statsContainer_1e21f_329",
	statBox: "_statBox_1e21f_336",
	statTitle: "_statTitle_1e21f_347",
	statData: "_statData_1e21f_356",
	statDataSmall: "_statDataSmall_1e21f_363",
	controlsContainer: "_controlsContainer_1e21f_370",
	controlBtn: "_controlBtn_1e21f_378",
	playPauseBtn: "_playPauseBtn_1e21f_400",
	finishWrapper: "_finishWrapper_1e21f_415",
	finishBtn: "_finishBtn_1e21f_420"
};
function formatTime(totalSeconds) {
	return `${Math.floor(totalSeconds / 60)}:${(totalSeconds % 60).toString().padStart(2, "0")}`;
}
function ActiveWorkoutPage() {
	const router = useRouter();
	const { id } = Route.useParams();
	const exerciseId = Number(id);
	const [exercise, setExercise] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [loadError, setLoadError] = (0, import_react.useState)(false);
	const [timeLeft, setTimeLeft] = (0, import_react.useState)(45);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(true);
	const [currentSet, setCurrentSet] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		if (!exerciseId || Number.isNaN(exerciseId)) {
			setLoadError(true);
			setLoading(false);
			return;
		}
		setLoading(true);
		setLoadError(false);
		getExerciseById(exerciseId).then((data) => {
			if (!data) {
				setLoadError(true);
				return;
			}
			setExercise(data);
			setTimeLeft(data.durationSeconds ?? 45);
			setCurrentSet(1);
		}).catch(() => {
			setLoadError(true);
		}).finally(() => {
			setLoading(false);
		});
	}, [exerciseId]);
	(0, import_react.useEffect)(() => {
		if (!isPlaying || timeLeft <= 0) return;
		const timerId = window.setTimeout(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1e3);
		return () => window.clearTimeout(timerId);
	}, [timeLeft, isPlaying]);
	const duration = exercise?.durationSeconds ?? 45;
	const timerProgress = (0, import_react.useMemo)(() => duration > 0 ? timeLeft / duration : 0, [duration, timeLeft]);
	const ringCircumference = 2 * Math.PI * 62;
	const ringOffset = ringCircumference * (1 - timerProgress);
	const togglePlay = () => setIsPlaying((prev) => !prev);
	const handlePrevious = () => {
		setCurrentSet((prev) => Math.max(1, prev - 1));
	};
	const handleNext = () => {
		if (!exercise) return;
		setCurrentSet((prev) => Math.min(exercise.sets ?? 1, prev + 1));
	};
	const handleReset = () => {
		setTimeLeft(exercise?.durationSeconds ?? 45);
		setCurrentSet(1);
		setIsPlaying(false);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: explore_active_module_default.container,
			style: { paddingTop: "var(--desktop-nav-height)" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: explore_active_module_default.loadingWrap,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentCardSkeleton, {})
			})
		})]
	});
	if (loadError || !exercise) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: explore_active_module_default.container,
			style: { paddingTop: "var(--desktop-nav-height)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: explore_active_module_default.pageHeader,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: explore_active_module_default.pageBackBtn,
						onClick: () => router.history.back(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 22 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: explore_active_module_default.pageTitle,
						children: "Exercise"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: explore_active_module_default.headerSpacer })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: explore_active_module_default.errorText,
				children: "Could not load exercise details."
			})]
		})]
	});
	const totalSets = exercise.sets ?? 3;
	const reps = exercise.reps ?? 12;
	const target = (exercise.targetMuscle ?? "FULL BODY").toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: explore_active_module_default.container,
			style: { paddingTop: "var(--desktop-nav-height)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: explore_active_module_default.pageHeader,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: explore_active_module_default.pageBackBtn,
						onClick: () => router.history.back(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 22 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: explore_active_module_default.pageTitle,
						children: exercise.exerciseName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: explore_active_module_default.headerSpacer })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: explore_active_module_default.bodyLayout,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: explore_active_module_default.mediaSection,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: exercise.exerciseImage || "/images/bicep-curl.png",
								alt: exercise.exerciseName,
								className: explore_active_module_default.mediaImage,
								style: {
									position: "absolute",
									inset: 0,
									width: "100%",
									height: "100%",
									objectFit: "cover"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: explore_active_module_default.mediaOverlay }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: explore_active_module_default.timerCenter,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									className: explore_active_module_default.timerWrapper,
									initial: {
										scale: .85,
										opacity: 0
									},
									animate: {
										scale: 1,
										opacity: 1
									},
									transition: {
										duration: .45,
										type: "spring"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										className: explore_active_module_default.timerRing,
										viewBox: "0 0 140 140",
										"aria-hidden": true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											className: explore_active_module_default.timerRingTrack,
											cx: "70",
											cy: "70",
											r: "62"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											className: explore_active_module_default.timerRingProgress,
											cx: "70",
											cy: "70",
											r: "62",
											strokeDasharray: ringCircumference,
											strokeDashoffset: ringOffset
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: explore_active_module_default.timerContent,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: explore_active_module_default.timerValue,
											children: formatTime(timeLeft)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: explore_active_module_default.timerLabel,
											children: "REMAINING"
										})]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: explore_active_module_default.bottomImageInfo,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: explore_active_module_default.bottomTextBlock,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: explore_active_module_default.exerciseBadge,
											children: target
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: explore_active_module_default.exerciseName,
											children: exercise.exerciseName
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: explore_active_module_default.videoPlayBtn,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: explore_active_module_default.playCircle,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
												size: 11,
												fill: "currentColor"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(duration) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: explore_active_module_default.bottomSpacer,
										"aria-hidden": true
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: explore_active_module_default.statsContainer,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: explore_active_module_default.statBox,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: explore_active_module_default.statTitle,
								children: "SET"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: explore_active_module_default.statData,
								children: [
									currentSet,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: explore_active_module_default.statDataSmall,
										children: ["/ ", totalSets]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: explore_active_module_default.statBox,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: explore_active_module_default.statTitle,
								children: "REPS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: explore_active_module_default.statData,
								children: reps
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: explore_active_module_default.controlsContainer,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: explore_active_module_default.controlBtn,
								onClick: handleReset,
								"aria-label": "Reset workout",
								title: "Reset",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 22 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: explore_active_module_default.controlBtn,
								onClick: handlePrevious,
								"aria-label": "Previous set",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, { size: 22 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: explore_active_module_default.playPauseBtn,
								onClick: togglePlay,
								"aria-label": isPlaying ? "Pause" : "Play",
								children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
									size: 26,
									fill: "currentColor"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
									size: 26,
									fill: "currentColor",
									style: { marginLeft: "3px" }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: explore_active_module_default.controlBtn,
								onClick: handleNext,
								"aria-label": "Next set",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { size: 22 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: explore_active_module_default.finishWrapper,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: explore_active_module_default.finishBtn,
							onClick: () => router.history.back(),
							children: "FINISH WORKOUT"
						})
					})
				]
			})]
		})]
	});
}
//#endregion
export { ActiveWorkoutPage as component };
