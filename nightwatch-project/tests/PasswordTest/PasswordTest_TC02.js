module.exports = {
  'TC_02 - Đổi mật khẩu KHÔNG nhập mật khẩu mới': function (browser) {
    const email = 'phamxuankhanh9797@gmail.com';
    const password = '0927189745';

    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)
      .useXpath()
      .click("//a[contains(text(), 'Đăng nhập')]")
      .useCss()
      .setValue('#username', email)
      .setValue('#password', password)
      .pause(3000)
      .click('#btnSubmit')
      .pause(3000)

      .url('https://banlinhkien.com/profile/changepassword')
      .waitForElementVisible('#oldpassword', 5000)

      .setValue('#oldpassword', password)
      // KHÔNG nhập mật khẩu mới
      .setValue('#repassword', '12345678')

      .click('#btnSubmit')
      .pause(1000)

      .execute(function () {
        return Array.from(document.querySelectorAll('li')).some(li => li.innerText.includes('Bạn chưa nhập Mật khẩu mới'));
      }, [], function (result) {
        browser.assert.ok(result.value, '✅ Hiển thị lỗi: Bạn chưa nhập Mật khẩu mới');
      })

      .end();
  }
};
