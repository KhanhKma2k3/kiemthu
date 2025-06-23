module.exports = {
  'TC_01 - Đăng ký không nhập mật khẩu': function (browser) {
    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)

      // Mở trang đăng ký
      .useXpath()
      .waitForElementVisible("//a[contains(text(), 'Đăng ký')]", 5000)
      .click("//a[contains(text(), 'Đăng ký')]")
      .useCss()

      // Click nút Đăng ký mà không nhập gì
      .waitForElementVisible('#btnSubmit', 5000)
      .click('#btnSubmit')
      .pause(1000)

      // ✅ Kiểm tra bằng JavaScript trong DOM
      .execute(function () {
        return Array.from(document.querySelectorAll('li')).some(li => li.innerText.includes('Bạn chưa nhập Email'));
      }, [], function (result) {
        browser.assert.ok(result.value, '✅ Có thông báo lỗi "Bạn chưa nhập Email" xuất hiện');
      })

      .end();
  }
};
