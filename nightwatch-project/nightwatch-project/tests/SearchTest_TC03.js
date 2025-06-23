module.exports = {
  'TC_03 - Tìm kiếm với từ khóa rỗng ""': function (browser) {
    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)

      // === Nhập từ khóa rỗng ===
      .waitForElementVisible('#txtSearch', 5000)
      .clearValue('#txtSearch') // đảm bảo ô trống
      .pause(500) // đợi chút để thao tác ổn định

      // === Nhấn nút tìm kiếm (class si) ===
      .waitForElementVisible('button.si', 5000)
      .click('button.si')
      .pause(3000)

      // === Kiểm tra phản hồi khi tìm kiếm rỗng ===
      .execute(function () {
        return document.body.innerText;
      }, [], function (result) {
        const content = result.value.toLowerCase();
        console.log("DEBUG | Nội dung sau tìm kiếm rỗng:", content.slice(0, 300));

        browser.assert.ok(
          content.includes('kết quả tìm kiếm') || content.includes('sản phẩm'),
          '✅ Trang đã phản hồi hợp lệ sau khi tìm kiếm rỗng (ví dụ: hiển thị tất cả sản phẩm hoặc thông báo)'
        );
      })

      .end();
  }
};
