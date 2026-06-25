import Swal from "sweetalert2";

export function sweetAlert(lang: "en" | "ar" = "en", status: "success" | "error" = "success") {
  const isSuccess = status === "success";

  const title = isSuccess
    ? lang === "ar"
      ? "تم تسجيل الحجز بنجاح!"
      : "Booking Registered Successfully!"
    : lang === "ar"
      ? "فشل إرسال الطلب!"
      : "Submission Failed!";

  const text = isSuccess
    ? undefined
    : lang === "ar"
      ? "حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى."
      : "An error occurred with the server. Please try again.";

  const themeColor = isSuccess ? "#5168ee" : "#ef4444";

  Swal.fire({
    title,
    text,
    icon: status,
    iconColor: themeColor,
    color: "#4c4c4c",
    background: "#ffffff",
    padding: "3rem",
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true,

    willOpen: () => {
      const progressBar = Swal.getTimerProgressBar();
      if (progressBar) {
        progressBar.style.backgroundColor = themeColor;
      }
    },
  });
}
