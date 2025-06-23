module.exports = {
  'TC_01 - Đăng ký không nhập tên': function (browser) {
    const email = "phamxuankhanh9797@gmail.com";
    const password = "0927189745";

    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)

      // Mở form đăng ký
      .useXpath()
      .waitForElementVisible("//a[contains(text(), 'Đăng ký')]", 5000)
      .click("//a[contains(text(), 'Đăng ký')]")
      .useCss()

      // Nhập email và mật khẩu, KHÔNG nhập tên
      .waitForElementVisible('#email', 5000)
      .setValue('#email', email)

      .waitForElementVisible('#password', 5000)
      .setValue('#password', password)

      // Click nút Đăng ký
      .waitForElementVisible('#btnSubmit', 5000)
      .click('#btnSubmit')
      .pause(1000)

      // Kiểm tra có hiển thị lỗi "Bạn chưa nhập Tên đầy đủ"
      .execute(function () {
        return Array.from(document.querySelectorAll('li')).some(li => li.innerText.includes('Bạn chưa nhập Tên đầy đủ'));
      }, [], function (result) {
        // Xác nhận lỗi có xuất hiện
        browser.assert.ok(result.value, '✅ Có thông báo lỗi "Bạn chưa nhập Tên đầy đủ" xuất hiện');
      })

      .end();
  }
};
