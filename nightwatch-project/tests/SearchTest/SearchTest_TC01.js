module.exports = {
  'TC_01 - Tìm kiếm với chuỗi vô nghĩa': function (browser) {
    const invalidKeyword = '@abc';

    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)

      // Nhập từ khóa vào ô tìm kiếm
      .waitForElementVisible('#txtSearch', 5000)
      .setValue('#txtSearch', invalidKeyword)

      // Click nút tìm kiếm
      .waitForElementVisible('button.si', 5000)
      .click('button.si')

      // Chờ kết quả
      .pause(4000)

      // Dùng execute lấy đúng <p> thông báo kết quả
      .execute(function () {
        const p = Array.from(document.querySelectorAll('p'))
          .find(p => p.innerText.includes('Kết quả tìm kiếm'));
        return p ? p.innerText : 'Không tìm thấy';
      }, [], function (result) {
        const text = result.value.trim();
        console.log('DEBUG | Kết quả trả về:', text);
        browser.assert.ok(
          text.includes('0') && text.includes('Kết quả tìm kiếm'),
          `✅ Kết quả tìm kiếm hợp lệ (không có kết quả): "${text}"`
        );
      })

      .end();
  }
};
