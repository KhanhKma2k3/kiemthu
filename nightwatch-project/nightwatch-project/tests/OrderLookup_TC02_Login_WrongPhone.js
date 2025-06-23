module.exports = {
  'TC_02 - Đăng nhập và tra cứu với số điện thoại sai': function (browser) {
    const email = "phamxuankhanh9797@gmail.com";
    const password = "0927189745";
    const wrongPhone = "0000000000";

    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)

      // === Đăng nhập ===
      .useXpath()
      .click("//a[contains(text(), 'Đăng nhập')]")
      .useCss()
      .setValue('#username', email)
      .setValue('#password', password)
      .click('#btnSubmit')
      .pause(3000)

      // === Truy cập tra cứu đơn hàng ===
      .useXpath()
      .click("//a[contains(@href, '/tra-cuu-don-hang')]")
      .useCss()
      .waitForElementVisible('input[name="q"]', 5000)

      // Nhập sai số điện thoại
      .setValue('input[name="q"]', wrongPhone)
      .click('button.btn-danger')

      // Kiểm tra lỗi
      .waitForElementVisible('td[colspan="5"]', 5000)
      .assert.containsText('td[colspan="5"]', 'Không tìm thấy đơn hàng theo yêu cầu.')
      .end();
  }
};
