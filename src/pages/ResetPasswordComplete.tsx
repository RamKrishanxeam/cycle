import { confirmPasswordReset } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";

const ResetPasswordComplete = () => {
  const [newPassword, setNewPassword] = useState<string>("");

  const handleResetComplete = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const oobCode = urlParams.get("oobCode");

      if (!oobCode) throw new Error("Invalid reset link");

      await confirmPasswordReset(auth, oobCode, newPassword);
      // Redirect to login or success page
      window.location.href = "/login";
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
      />
      <button onClick={handleResetComplete}>Reset Password</button>
    </div>
  );
};
export default ResetPasswordComplete;
