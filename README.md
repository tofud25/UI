# ✨ Fancy Mobile UI for SillyTavern

Extension nâng cấp toàn diện giao diện SillyTavern cho **điện thoại di động (Mobile)** với phong cách **Kính mờ cường lực (Glassmorphism)**, tối ưu diện tích chạm ngón tay và không bao giờ bị ẩn hay lỗi hiển thị trong menu Extensions.

---

## 🌟 Tính Năng Nổi Bật

1. **Hiệu ứng Kính Mờ (Glassmorphism & OLED Dark)**:
   - Làm mờ hậu cảnh bong bóng chat (`backdrop-filter: blur(14px)`).
   - Viền dạ quang (glow) mềm mại quanh tin nhắn và ảnh avatar nhân vật.
2. **Tối ưu thao tác tay trên Điện thoại (Mobile Touch Booster)**:
   - Các nút **Sửa, Xóa, Vuốt tin nhắn (Swipe), Sao chép** được phóng to lên `36px × 36px` có đệm bo góc dễ bấm bằng ngón tay cái.
   - Thêm phản hồi nén nhẹ khi chạm ngón tay (`:active`).
3. **Thanh nhập văn bản nổi (Floating Send Dock)**:
   - Thanh chat đáy màn hình được nâng lên cao hơn viền dưới, bo góc tròn 20px, nút gửi tròn nổi bật.
4. **4 Bộ Theme màu cực đẹp**:
   - 🔮 **Cyberpunk Violet**: Tím neon huyền bí pha xanh Cyan.
   - 🌌 **OLED Midnight**: Đen tuyền tiết kiệm pin điện thoại màn AMOLED, viền bạc sang trọng.
   - 💎 **Emerald Matrix**: Xanh ngọc lục bảo hiện đại.
   - 🌸 **Sakura Rose**: Hồng pastel ngọt ngào ấm áp.
5. **Nút nổi Tiện Ích Trên Màn Hình (Quick Floating Pill)**:
   - Một nút tròn nhỏ tiện ích xuất hiện ở góc dưới màn hình điện thoại giúp bạn bấm đổi theme hoặc bật tắt nhanh mà không cần phải mở menu sâu.
6. **Không bao giờ bị ẩn trong Extension Panel**:
   - Tích hợp cơ chế **tự phục hồi DOM & mẫu dự phòng tích hợp sẵn (embedded fallback)**, đảm bảo hiển thị 100% trong danh sách cài đặt Extension của SillyTavern.

---

## 📁 Cấu Trúc Thư Mục

```text
st-fancy-mobile-ui/
├── manifest.json       (Khai báo extension cho SillyTavern)
├── index.js            (Logic JavaScript khởi tạo & quản lý cài đặt)
├── style.css           (Bộ CSS giao diện kính mờ & tối ưu mobile)
├── settings.html       (Giao diện điều khiển trong tab Extensions)
└── README.md
```

---

## 🚀 Hướng Dẫn Cài Đặt Vào SillyTavern

### Cách 1: Copy thủ công (Đơn giản nhất)
1. Copy toàn bộ thư mục `st-fancy-mobile-ui` này.
2. Dán vào thư mục SillyTavern của bạn theo đường dẫn:
   ```text
   SillyTavern/public/scripts/extensions/third-party/st-fancy-mobile-ui
   ```
3. Khởi động SillyTavern (hoặc nếu đang chạy thì chỉ cần bấm **F5 / Tải lại trang** trên trình duyệt).

### Cách 2: Nếu bạn chạy SillyTavern trên Android (Termux)
Chỉ cần copy thư mục `st-fancy-mobile-ui` vào đường dẫn:
```bash
~/SillyTavern/public/scripts/extensions/third-party/st-fancy-mobile-ui
```

---

## 🎮 Cách Sử Dụng

1. Mở SillyTavern trên điện thoại hoặc trình duyệt.
2. Bấm vào biểu tượng **Mảnh ghép (🧩 Extensions)** ở thanh trên cùng.
3. Bạn sẽ thấy ngay mục **✨ Fancy Mobile UI** (có huy hiệu **PRO**):
   - Bấm vào tiêu đề để mở rộng bảng điều khiển.
   - Bật/Tắt các công tắc theo sở thích (Kính mờ, Tối ưu nút bấm, Nút tiện ích...).
   - Kéo thanh trượt điều chỉnh **Độ bo góc bong bóng chat** hoặc **Độ mờ kính**.
4. Mọi thay đổi đều có hiệu lực ngay lập tức mà không cần khởi động lại SillyTavern!
