module.exports = {
  'TC_06 - Đổi mật khẩu mới không đủ mạnh': function (browser) {
    const email = 'phamxuankhanh9797@gmail.com';
    const password = '0927189745';
    const weakPassword = '123';

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
      .setValue('#newpassword', weakPassword)
      .setValue('#repassword', weakPassword)
      .click('#btnSubmit')
      .pause(1000)
      .execute(function () {
        return Array.from(document.querySelectorAll('li')).some(li =>
          li.innerText.toLowerCase().includes('mật khẩu không đủ mạnh') ||
          li.innerText.toLowerCase().includes('mật khẩu quá ngắn') ||
          li.innerText.toLowerCase().includes('mật khẩu phải có từ 6 kí tự')
        );
      }, [], function (result) {
        browser.assert.ok(result.value, '✅ Có thông báo mật khẩu mới không đủ mạnh');
      })
      .end();
  }
};