module.exports = {
  'TC_02 - Đăng nhập thành công': function (browser) {
    const email = "phamxuankhanh9797@gmail.com";
    const password = "0927189745";

    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)
      .useXpath()
      .waitForElementVisible("//a[contains(text(), 'Đăng nhập')]", 5000)
      .click("//a[contains(text(), 'Đăng nhập')]")
      .useCss()
      .waitForElementVisible('#username', 5000)
      .setValue('#username', email)
      .waitForElementVisible('#password', 5000)
      .setValue('#password', password)
      .waitForElementVisible('#btnSubmit', 5000)
      .click('#btnSubmit')
      .pause(3000)
      // Kiểm tra đã đăng nhập thành công bằng cách kiểm tra trang cá nhân
      .url('https://banlinhkien.com/profile')
      .waitForElementVisible('body', 5000)
      .assert.containsText('body', 'Thông tin tài khoản')
      .end();
  }
};