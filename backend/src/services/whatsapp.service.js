import { sock } from "../config/whatsapp.js";
import { generateReceiptPdf } from "./receiptPdf.service.js";

export const sendReceipt = async (phone, receipt) => {
  try {
    const jid = `${phone}@s.whatsapp.net`;

    const pdfBuffer = await generateReceiptPdf(receipt);

    const date = new Date().toISOString().slice(0, 10);

    await sock.sendMessage(jid, {
      document: pdfBuffer,
      mimetype: "application/pdf",
      fileName: `Bil-Kantin-${date}.pdf`,
      caption: "🧾 Bil Kantin",
    });

    console.log("Receipt sent successfully");

  } catch (err) {
    console.error(err);
    throw err;
  }
};