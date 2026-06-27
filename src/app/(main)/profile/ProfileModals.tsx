"use client";

import PolicyModal from "@/components/PolicyModal";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import ChangePasswordSheet from "@/components/ChangePasswordSheet";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import type { useProfilePage } from "@/hooks/useProfilePage";
import { POLICY_CONFIG } from "@/hooks/useProfilePage";

type ProfileModalsProps = Pick<
  ReturnType<typeof useProfilePage>,
  | "activePolicy"
  | "setActivePolicy"
  | "showUpdateProfile"
  | "setShowUpdateProfile"
  | "showChangePassword"
  | "setShowChangePassword"
  | "loadProfile"
>;

export default function ProfileModals({
  activePolicy,
  setActivePolicy,
  showUpdateProfile,
  setShowUpdateProfile,
  showChangePassword,
  setShowChangePassword,
  loadProfile,
}: ProfileModalsProps) {
  const { isDesktop, isHydrated } = useBreakpoint();

  return (
    <>
      {activePolicy && (
        <PolicyModal
          title={POLICY_CONFIG[activePolicy].title}
          visible={Boolean(activePolicy)}
          onClose={() => setActivePolicy(null)}
          fetchPolicy={POLICY_CONFIG[activePolicy].fetch}
        />
      )}

      {(!isHydrated || !isDesktop) && (
        <UpdateProfileModal
          isOpen={showUpdateProfile}
          onClose={() => setShowUpdateProfile(false)}
          onUpdated={loadProfile}
        />
      )}

      <ChangePasswordSheet
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </>
  );
}
