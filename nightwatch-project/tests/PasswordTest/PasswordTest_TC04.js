module.exports = {
  'TC_04 - Đổi mật khẩu thành công': function (browser) {
    const email = 'phamxuankhanh9797@gmail.com';
    const oldPassword = '0927189745';
    const newPassword = '0927189745'; // nên thay đổi nếu mật khẩu đã từng được đổi

    // Đăng nhập trước
    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)
      .useXpath()
      .click("//a[contains(text(), 'Đăng nhập')]")
      .useCss()
      .waitForElementVisible('#username', 5000)
      .setValue('#username', email)
      .waitForElementVisible('#password', 5000)
      .setValue('#password', oldPassword)
      .waitForElementVisible('#btnSubmit', 5000)
      .pause(1000)
      .click('#btnSubmit')
      .pause(3000) // chờ đăng nhập

      // Truy cập trang đổi mật khẩu
      .url('https://banlinhkien.com/profile/changepassword')
      .waitForElementVisible('#oldpassword', 5000)

      // Nhập mật khẩu cũ và mới
      .setValue('#oldpassword', oldPassword)
      .setValue('#newpassword', newPassword)
      .setValue('#repassword', newPassword)

      // Nhấn xác nhận
      .click('#btnSubmit')
      .pause(2000)

      // Kiểm tra thông báo thành công
      .useXpath()
      .waitForElementVisible("//p[@class='message' and contains(text(), 'Đổi mật khẩu tài khoản thành công')]", 5000)
      .assert.containsText("//p[@class='message']", "Đổi mật khẩu tài khoản thành công")

      .end();
  }
};
