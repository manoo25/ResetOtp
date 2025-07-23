import emailjs from '@emailjs/nodejs';

const SERVICE_ID = "service_tc3dlzm";
const TEMPLATE_ID = "template_vuo3fyo";
const USER_ID = "MrsDkRGIT4G7JGcan";

let generatedResetCode = null;

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendPasswordResetCode = async (email) => {
  try {
    const code = generateOTP();
    generatedResetCode = code;

    const templateParams = {
      to_email: email,
      message: `كود الاسترجاع الخاص بك هو: ${code}`,
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: USER_ID,
    });

    console.log("✅ تم إرسال الكود:", code);
    return true;
  } catch (err) {
    console.error("🔴 فشل في إرسال الكود:", err?.text || err.message || err);
    return false;
  }
};

export const verifyResetCode = (inputCode) => {
  return inputCode === generatedResetCode;
};