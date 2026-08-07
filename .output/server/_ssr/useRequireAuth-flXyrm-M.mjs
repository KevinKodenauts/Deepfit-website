import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useAuth } from "./AuthContext-B71YYWma.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useRequireAuth-flXyrm-M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useRequireAuth(redirectTo = "/login") {
	const auth = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (auth.isLoading) return;
		if (!auth.isAuthenticated) navigate({ to: redirectTo });
	}, [
		auth.isAuthenticated,
		auth.isLoading,
		redirectTo,
		navigate
	]);
	return auth;
}
//#endregion
export { useRequireAuth as t };
