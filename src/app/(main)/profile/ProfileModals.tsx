"use client";

import UpdateProfileModal from "@/components/UpdateProfileModal";
import ChangePasswordSheet from "@/components/ChangePasswordSheet";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import type { useProfilePage } from "@/hooks/useProfilePage";

type ProfileModalsProps = Pick<
  ReturnType<typeof useProfilePage>,
  | "showUpdateProfile"
  | "setShowUpdateProfile"
  | "showChangePassword"
  | "setShowChangePassword"
  | "loadProfile"
>;

export default function ProfileModals({
  showUpdateProfile,
  setShowUpdateProfile,
  showChangePassword,
  setShowChangePassword,
  loadProfile,
}: ProfileModalsProps) {
  const { isDesktop, isHydrated } = useBreakpoint();

  return (
    <>
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
