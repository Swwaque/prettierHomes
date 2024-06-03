import { confirmPopup } from "primereact/confirmpopup";
import { HiCheck, HiXMark } from "react-icons/hi2";
import { PiQuestionFill } from "react-icons/pi";
import {  confirmDialog } from 'primereact/confirmdialog';
import { CiCircleQuestion } from "react-icons/ci";
import { t } from 'i18next';

export const prettyConfirm = ({
  event,
  message,
  icon,
  acceptIcon,
  rejectIcon,
  acceptButtonType,
  rejectButtonType,
  acceptButtonLabel,
  rejectButtonLabel,
  handleAccept,
  handleReject,
}) => {
  confirmPopup({
    target: event.currentTarget,
    message: message || "Are you sure?",
    icon: icon || <PiQuestionFill size={50} />,
    acceptIcon: acceptIcon || <HiCheck size={24} />,
    rejectIcon: rejectIcon || <HiXMark size={24} />,
    acceptClassName: handleClassName(acceptButtonType),
    rejectClassName: handleClassName(rejectButtonType),
    acceptLabel: acceptButtonLabel || t("confirmation.yes"),
    rejectLabel: rejectButtonLabel || t("confirmation.no"),
    accept: handleAccept,
    reject: handleReject,
  });
};

export const prettyDialog = ({ message, header, icon, handleAccept, handleReject, }) => {
  confirmDialog({
    message: message || 'Are you sure?',
    header: header || 'Confirmation',
    icon: icon || <CiCircleQuestion size={50} />,
    accept : handleAccept,
    reject: handleReject,
    acceptLabel: t("confirmation.yes"),
    rejectLabel: t("confirmation.no"),
  });
};

// export const accept = (toastRef, options = {}) => {
//
//   const {
//     severity = 'info',
//     summary = 'Confirmed',
//     detail = 'You have accepted',
//     life = 2000
//   } = options;

//   toastRef.current.show({ severity, summary, detail, life });
// };

// export const reject = (toastRef, options = {}) => {
//
//   const {
//     severity = 'warn',
//     summary = 'Rejected',
//     detail = 'You have rejected',
//     life = 2000
//   } = options;

//   toastRef.current.show({ severity, summary, detail, life });
// };

const handleClassName = (type) => {
  switch (type) {
    case "success":
      return "p-2 w-3 me-2 bg-green-300 hover:bg-green-500  active:bg-green-600 active:text-gray-50 border-none text-gray-900";
    case "info":
      return "p-2 w-3 me-2 bg-blue-300 hover:bg-blue-500  active:bg-blue-600 active:text-gray-50 border-none text-gray-900";
    case "warning":
      return "p-2 w-3 me-2 bg-yellow-300 hover:bg-yellow-500  active:bg-yellow-600 active:text-gray-50 border-none text-gray-900";
    case "danger":
      return "p-2 w-3 me-2 bg-red-300 hover:bg-red-500  active:bg-red-600 active:text-gray-50 border-none text-gray-900";
    default:
      return "p-2 w-3 me-2 bg-gray-300 hover:bg-gray-500 active:bg-gray-600 active:text-gray-50 border-none text-gray-900";
  }
};

//"PrettyConfirm" usage sample :
// const queryTourApprove = (event, row) => {
//   prettyConfirm({
//     event: event,
//     message: "Are you sure you want to accept the tour request?",
//     icon: <PiHandshakeFill size={50} />,
//     acceptIcon: <HiCheck size={24} />,
//     rejectIcon: <HiXMark size={24} />,
//     acceptButtonType: "success",
//     rejectButtonType: "info",
//     acceptLabel: "Yes",
//     rejectLabel: "No",
//     handleAccept: () => handleApprove(row),
//     handleReject: () => { },
//   });
// }

//  Toast usage sample :
// toast.current.show({
//   severity: "warn",    //-----> "success", "info", "warn", "error"
//   summary: "Declined",
//   detail: "Tour request declined",
//   life: 3000,
//   icon: <PiHandPalmDuotone size={50} />,
// });


// sticky: true ->  toast do not hide automatically.


//                 FOR EXAMPLE

/*
 
  İMPORTU ÖNEMLİ DİKKAT EDİLMELİ ()
   const { showToast } = useToast();

  BU KISIM İSTEĞE GÖRE ŞEKİLLENDİRİLEBİLİR
  showToast({
    severity: "error", //-----> "success", "info", "warn", "error"
    summary: "Error!",
    detail: errMsg,
    life: 3000,
  });



  
*/

