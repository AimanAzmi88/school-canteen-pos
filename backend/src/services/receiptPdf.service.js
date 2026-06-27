import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

export const generateReceiptPdf = (receipt) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        bufferPages: true,
      });

      const buffers = [];
      doc.on("data", (d) => buffers.push(d));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      // ========================
      // FONTS
      // ========================
      const regular = path.join(process.cwd(), "assets/fonts/Roboto-Regular.ttf");
      const bold = path.join(process.cwd(), "assets/fonts/Roboto-Bold.ttf");
      doc.registerFont("Regular", regular);
      doc.registerFont("Bold", bold);

      // ========================
      // LAYOUT CONSTANTS
      // ========================
      const PAGE_LEFT = doc.page.margins.left;
      const PAGE_RIGHT = doc.page.width - doc.page.margins.right;
      const CONTENT_WIDTH = PAGE_RIGHT - PAGE_LEFT;
      const CENTER = doc.page.width / 2;

      // Brand palette — selari dengan logo (gold + charcoal)
      const COLOR_DARK = "#1C1C1C";   // charcoal
      const COLOR_GOLD = "#C8A046";   // gold
      const COLOR_TEXT = "#2A2A2A";
      const COLOR_MUTED = "#7A7A7A";
      const COLOR_LINE = "#E6E6E6";
      const COLOR_ZEBRA = "#FAF8F3";  // cream lembut

      const money = (v) => `RM ${Number(v).toFixed(2)}`;

      const hr = (y, color = COLOR_LINE, width = 1, x1 = PAGE_LEFT, x2 = PAGE_RIGHT) => {
        doc.moveTo(x1, y).lineTo(x2, y).lineWidth(width).strokeColor(color).stroke();
      };

      // ========================
      // HEADER — logo center atas background putih
      // ========================
      const logoPath = path.join(process.cwd(), "assets/logo/logo.png");
      let y = 45;

      if (fs.existsSync(logoPath)) {
        const logoW = 230;
        const logoH = 95;
        doc.image(logoPath, CENTER - logoW / 2, y, {
          fit: [logoW, logoH],
          align: "center",
          valign: "center",
        });
        y += logoH + 6;
      } else {
        // Fallback kalau logo takde
        doc
          .font("Bold")
          .fontSize(22)
          .fillColor(COLOR_DARK)
          .text("TIARA SINAR CATERING", PAGE_LEFT, y, {
            width: CONTENT_WIDTH,
            align: "center",
          });
        y += 34;
      }

      // Contact line (center) — tukar kepada maklumat sebenar
      doc
        .font("Regular")
        .fontSize(9.5)
        .fillColor(COLOR_MUTED)
        .text("Kafeteria Seri Pantai, Kampung Darat, 06600 Kuala Kedah • 012-6564128 ", PAGE_LEFT, y, {
          width: CONTENT_WIDTH,
          align: "center",
        });
      y += 24;

      // Double gold divider
      hr(y, COLOR_GOLD, 2);
      hr(y + 3, COLOR_GOLD, 0.5);
      y += 22;

      // ========================
      // RESIT TITLE + META
      // ========================
      doc
        .font("Bold")
        .fontSize(13)
        .fillColor(COLOR_DARK)
        .text("RESIT RASMI", PAGE_LEFT, y, { characterSpacing: 2 });
      y += 26;

      const metaLabel = (label, value, x, w, align = "left") => {
        doc
          .font("Regular")
          .fontSize(8.5)
          .fillColor(COLOR_MUTED)
          .text(label.toUpperCase(), x, y, { width: w, align, characterSpacing: 0.5 });
        doc
          .font("Bold")
          .fontSize(11)
          .fillColor(COLOR_TEXT)
          .text(value, x, y + 13, { width: w, align });
      };

      const colW = CONTENT_WIDTH / 3;
      metaLabel(
  "Pending Bill",
  receipt.receiptNo,
  PAGE_LEFT,
  colW
);

      metaLabel(
        "Tarikh",
        new Date().toLocaleString("ms-MY", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
}),
        PAGE_LEFT + colW,
        colW
      );
      metaLabel("Penerima", receipt.teacher.name, PAGE_LEFT + colW * 2, colW, "right");

      y += 50;

      // ========================
      // TABLE HEADER
      // ========================
      const COL_ITEM = PAGE_LEFT;
      const COL_QTY = PAGE_LEFT + CONTENT_WIDTH * 0.5;
      const COL_PRICE = PAGE_LEFT + CONTENT_WIDTH * 0.65;
      const COL_TOTAL = PAGE_LEFT + CONTENT_WIDTH * 0.82;
      const W_QTY = CONTENT_WIDTH * 0.13;
      const W_PRICE = CONTENT_WIDTH * 0.17;
      const W_TOTAL = CONTENT_WIDTH * 0.18;

      const headerRowH = 26;
      doc.rect(PAGE_LEFT, y, CONTENT_WIDTH, headerRowH).fill(COLOR_DARK);
      // gold accent strip kiri
      doc.rect(PAGE_LEFT, y, 4, headerRowH).fill(COLOR_GOLD);

      const thY = y + 8;
      doc.font("Bold").fontSize(9.5).fillColor("#FFFFFF");
      doc.text("ITEM", COL_ITEM + 12, thY, { characterSpacing: 0.5 });
      doc.text("QTY", COL_QTY, thY, { width: W_QTY, align: "center" });
      doc.text("HARGA", COL_PRICE, thY, { width: W_PRICE, align: "right" });
      doc.text("JUMLAH", COL_TOTAL, thY, { width: W_TOTAL, align: "right" });

      y += headerRowH;

      // ========================
      // ITEMS
      // ========================
      const rowH = 28;
      receipt.items.forEach((item, i) => {
        if (y + rowH > doc.page.height - 140) {
          doc.addPage();
          y = doc.page.margins.top;
        }

        if (i % 2 === 0) {
          doc.rect(PAGE_LEFT, y, CONTENT_WIDTH, rowH).fill(COLOR_ZEBRA);
        }

        const tY = y + 9;
        doc.font("Regular").fontSize(10).fillColor(COLOR_TEXT);
        doc.text(item.name, COL_ITEM + 12, tY, {
          width: CONTENT_WIDTH * 0.46,
          ellipsis: true,
        });
        doc.text(item.quantity.toString(), COL_QTY, tY, {
          width: W_QTY,
          align: "center",
        });
        doc.text(money(item.unitPrice), COL_PRICE, tY, {
          width: W_PRICE,
          align: "right",
        });
        doc.font("Bold").text(money(item.subtotal), COL_TOTAL, tY, {
          width: W_TOTAL,
          align: "right",
        });

        y += rowH;
      });

      hr(y, COLOR_LINE);
      y += 18;

      // ========================
      // SUMMARY (tiada SST)
      // ========================
      const itemCount = receipt.items.reduce(
        (sum, it) => sum + Number(it.quantity),
        0
      );

      const summaryRow = (label, value) => {
        doc
          .font("Regular")
          .fontSize(10)
          .fillColor(COLOR_MUTED)
          .text(label, PAGE_LEFT + CONTENT_WIDTH * 0.5, y, {
            width: CONTENT_WIDTH * 0.3,
            align: "right",
          });
        doc
          .font("Bold")
          .fontSize(10)
          .fillColor(COLOR_TEXT)
          .text(value, COL_TOTAL, y, { width: W_TOTAL, align: "right" });
        y += 18;
      };

      summaryRow("Jumlah Item", itemCount.toString());
      summaryRow("Subtotal", money(receipt.total));
      y += 4;

      // Grand total band
      const totalBoxW = CONTENT_WIDTH * 0.42;
      const totalBoxX = PAGE_RIGHT - totalBoxW;
      const totalBoxH = 44;

      doc.rect(totalBoxX, y, totalBoxW, totalBoxH).fill(COLOR_DARK);
      doc.rect(totalBoxX, y, 4, totalBoxH).fill(COLOR_GOLD);

      doc
        .font("Bold")
        .fontSize(11)
        .fillColor(COLOR_GOLD)
        .text("JUMLAH BAYARAN", totalBoxX + 16, y + 16);

      doc
        .font("Bold")
        .fontSize(16)
        .fillColor("#FFFFFF")
        .text(money(receipt.total), totalBoxX, y + 13, {
          width: totalBoxW - 16,
          align: "right",
        });

      // ========================
      // FOOTER
      // ========================
      const footerY = doc.page.height - 85;
      hr(footerY - 15, COLOR_GOLD, 1);

      doc
        .font("Bold")
        .fontSize(11)
        .fillColor(COLOR_DARK)
        .text("Terima Kasih — Sedap • Halal • Berkualiti", PAGE_LEFT, footerY, {
          width: CONTENT_WIDTH,
          align: "center",
        });

      doc
        .font("Regular")
        .fontSize(8)
        .fillColor(COLOR_MUTED)
        .text("Powered by aimanazmi.dev", PAGE_LEFT, footerY + 18, {
          width: CONTENT_WIDTH,
          align: "center",
        });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};