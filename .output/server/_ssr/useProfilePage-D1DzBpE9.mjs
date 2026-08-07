import { a as __toESM } from "../_runtime.mjs";
import { h as getCustomerReferralTree } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useAuth } from "./AuthContext-B71YYWma.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useProfilePage-D1DzBpE9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function formatProfilePhone(phone) {
	if (!phone) return "";
	if (phone.startsWith("+")) return phone;
	return `+${phone}`;
}
function getProfileInitials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
function useProfilePage() {
	const navigate = useNavigate();
	const { user, isAuthenticated, isLoading, logout, refreshProfile } = useAuth();
	const [profileLoading, setProfileLoading] = (0, import_react.useState)(false);
	const [copyMessage, setCopyMessage] = (0, import_react.useState)("");
	const [referralStats, setReferralStats] = (0, import_react.useState)({
		totalReferrals: 0,
		directInvites: 0
	});
	const displayName = user?.name || user?.customerName || "";
	const displayEmail = user?.customerEmail || user?.email || "";
	const displayPhone = formatProfilePhone(user?.phone || user?.customerMobile || "");
	const referralCode = user?.referralCode || "";
	const totalRewards = user?.referralPoints ?? 0;
	const initials = getProfileInitials(displayName || displayEmail || "User");
	const loadProfile = (0, import_react.useCallback)(async () => {
		if (!isAuthenticated || !user?.id) return;
		setProfileLoading(true);
		try {
			await refreshProfile();
			const tree = await getCustomerReferralTree(user.id);
			if (tree?.data) setReferralStats({
				totalReferrals: tree.data.totalReferrals ?? 0,
				directInvites: tree.data.rootCustomer?.totalDirectReferrals ?? 0
			});
		} catch {} finally {
			setProfileLoading(false);
		}
	}, [
		isAuthenticated,
		refreshProfile,
		user?.id
	]);
	(0, import_react.useEffect)(() => {
		loadProfile();
	}, [loadProfile]);
	const requireAuth = (0, import_react.useCallback)((to) => {
		if (!isAuthenticated) {
			navigate({ to: "/login" });
			return;
		}
		navigate({ to });
	}, [isAuthenticated, navigate]);
	const handleCopyReferral = async () => {
		if (!referralCode) return;
		try {
			await navigator.clipboard.writeText(referralCode);
			setCopyMessage("Referral code copied");
			setTimeout(() => setCopyMessage(""), 2e3);
		} catch {
			setCopyMessage("Could not copy code");
			setTimeout(() => setCopyMessage(""), 2e3);
		}
	};
	const handleShareReferral = async () => {
		if (!referralCode) return;
		const shareText = `Join Deepfit using my referral code: ${referralCode}\n\nSign up and start your fitness journey today!`;
		if (navigator.share) {
			try {
				await navigator.share({
					text: shareText,
					title: "Deepfit Referral"
				});
			} catch {}
			return;
		}
		await handleCopyReferral();
	};
	const handleLogout = () => {
		logout();
		navigate({ to: "/login" });
	};
	return {
		navigate,
		user,
		isAuthenticated,
		isLoading,
		profileLoading,
		copyMessage,
		referralStats,
		displayName,
		displayEmail,
		displayPhone,
		referralCode,
		totalRewards,
		initials,
		requireAuth,
		handleCopyReferral,
		handleShareReferral,
		handleLogout
	};
}
//#endregion
export { useProfilePage as n, getProfileInitials as t };
