module.exports = {
  'TC_01 - Đăng ký không nhập số điện thoại': function (browser) {
    const email = "phamxuankhanh9797@gmail.com";
    const password = "0927189745";
    const hovaten = "Pham Xuan Khanh";

    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)

      // Mở form đăng ký
      .useXpath()
      .waitForElementVisible("//a[contains(text(), 'Đăng ký')]", 5000)
      .click("//a[contains(text(), 'Đăng ký')]")
      .useCss()

      // Nhập email, mật khẩu, họ tên nhưng KHÔNG nhập số điện thoại
      .waitForElementVisible('#email', 5000)
      .setValue('#email', email)

      .waitForElementVisible('#password', 5000)
      .setValue('#password', password)

      .waitForElementVisible('#fullName', 5000)
      .setValue('#fullName', hovaten)

      // Không nhập #phone

      // Click nút Đăng ký
      .waitForElementVisible('#btnSubmit', 5000)
      .click('#btnSubmit')
      .pause(1000)

      // Kiểm tra có hiển thị lỗi "Bạn chưa nhập số điện thoại"
      .execute(function () {
        return Array.from(document.querySelectorAll('li')).some(li => li.innerText.includes('Bạn chưa nhập số điện thoại'));
      }, [], function (result) {
        browser.assert.ok(result.value, '✅ Có thông báo lỗi "Bạn chưa nhập số điện thoại" xuất hiện');
      })

      .end();
  }
};
