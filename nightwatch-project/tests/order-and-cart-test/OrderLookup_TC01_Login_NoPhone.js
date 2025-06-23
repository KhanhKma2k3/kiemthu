module.exports = {
  'TC_01 - Đăng nhập và tra cứu không nhập SĐT': function (browser) {
    const email = "phamxuankhanh9797@gmail.com";
    const password = "0927189745";

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

      // === Truy cập trang tra cứu đơn hàng ===
      .useXpath()
      .click("//a[contains(@href, '/tra-cuu-don-hang')]")
      .useCss()
      .waitForElementVisible('input[name="q"]', 5000)

      // Không nhập số điện thoại, click tìm kiếm
      .click('button.btn-danger')

      // Kiểm tra thông báo lỗi
      .waitForElementVisible('td[colspan="5"]', 5000)
      .assert.containsText('td[colspan="5"]', 'Không tìm thấy đơn hàng theo yêu cầu.')
      .end();
  }
};
