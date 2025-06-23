module.exports = {
  'TC_01 - Đăng xuất thành công': function (browser) {
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
      // Đăng xuất
      .useXpath()
      .waitForElementVisible("//a[contains(text(), 'Đăng xuất')]", 5000)
      .click("//a[contains(text(), 'Đăng xuất')]")
      .pause(2000)
      // Kiểm tra không còn truy cập được trang cá nhân
      .url('https://banlinhkien.com/profile')
      .pause(2000)
      .execute(function () {
        return !document.body.innerText.toLowerCase().includes('thông tin tài khoản');
      }, [], function (result) {
        browser.assert.ok(result.value, '✅ Đăng xuất thành công, không còn truy cập được trang cá nhân');
      })
      .end();
  }
};