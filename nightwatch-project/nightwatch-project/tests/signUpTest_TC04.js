module.exports = {
  'TC_01 - Đăng ký thành công khi nhập đầy đủ thông tin': function (browser) {
    const email = "phamxuankhanh" + Date.now() + "@gmail.com"; // Email duy nhất mỗi lần test
    const password = "0927189745";
    const hovaten = "Pham Xuan Khanh";
    const phone = "0927189745";

    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)

      // Mở form đăng ký
      .useXpath()
      .waitForElementVisible("//a[contains(text(), 'Đăng ký')]", 5000)
      .click("//a[contains(text(), 'Đăng ký')]")
      .useCss()

      // Nhập đầy đủ thông tin
      .waitForElementVisible('#email', 5000)
      .setValue('#email', email)

      .waitForElementVisible('#password', 5000)
      .setValue('#password', password)

      .waitForElementVisible('#fullName', 5000)
      .setValue('#fullName', hovaten)

      .waitForElementVisible('#mobile', 5000)
      .setValue('#mobile', phone)

      // Click nút Đăng ký
      .waitForElementVisible('#btnSubmit', 5000)
      .click('#btnSubmit')

      .pause(3000)

      // Kiểm tra có hiện thông báo thành công
      .execute(function () {
        return document.querySelector('h3')?.innerText.includes('Chúc mừng bạn đã đăng ký thành công');
      }, [], function (result) {
        browser.assert.ok(result.value, '✅ Đăng ký thành công: Hiển thị "Chúc mừng bạn đã đăng ký thành công"');
      })

      .end();
  }
};
