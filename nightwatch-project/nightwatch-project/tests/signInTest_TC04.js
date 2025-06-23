module.exports = {
  'TC_02 - Đăng nhập không nhập mật khẩu': function (browser) {
    const email = "phamxuankhanh@gmail.com";

    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)

      // Vào form đăng nhập
      .useXpath()
      .waitForElementVisible("//a[contains(text(), 'Đăng nhập')]", 5000)
      .click("//a[contains(text(), 'Đăng nhập')]")
      .useCss()

      .waitForElementVisible('#username', 5000)
      .setValue('#username', email)

      // Không nhập mật khẩu
      .waitForElementVisible('#btnSubmit', 5000)
      .click('#btnSubmit')
      .pause(1000)

      // Kiểm tra lỗi "Bạn chưa nhập Mật khẩu"
      .execute(function () {
        return Array.from(document.querySelectorAll('li')).some(li => li.innerText.includes('Bạn chưa nhập Mật khẩu'));
      }, [], function (result) {
        browser.assert.ok(result.value, '❌ Không nhập mật khẩu → báo lỗi đúng');
      })

      .end();
  },
};
