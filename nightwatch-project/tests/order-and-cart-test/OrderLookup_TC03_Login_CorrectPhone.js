module.exports = {
  'TC_03 - Đăng nhập và tra cứu với SĐT đúng': function (browser) {
    const email = "phamxuankhanh9797@gmail.com";
    const password = "0927189745";
    const correctPhone = "0987654321"; // ✅ SĐT đã dùng để đặt hàng

    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)

      // === Đăng nhập ===
      .useXpath()
      .click("//a[contains(text(), 'Đăng nhập')]")
      .useCss()
      .waitForElementVisible('#username', 5000)
      .setValue('#username', email)
      .setValue('#password', password)
      .click('#btnSubmit')
      .pause(3000)

      // === Truy cập tra cứu đơn hàng ===
      .useXpath()
      .click("//a[contains(@href, '/tra-cuu-don-hang')]")
      .useCss()

      // ✅ Nhập đúng SĐT vào đúng ô input tra cứu đơn hàng
      .waitForElementVisible('input[name="q"][placeholder*="số điện thoại"]', 5000)
      .clearValue('input[name="q"][placeholder*="số điện thoại"]')
      .setValue('input[name="q"][placeholder*="số điện thoại"]', correctPhone)
      .pause(2000)
      .click('button.btn-danger')

      // ✅ Kiểm tra có ít nhất 1 đơn hàng
      .elements('css selector', 'table tbody tr', function (result) {
        const count = result.value.length;
        console.log("📦 Số đơn hàng tìm được:", count);
        browser.assert.ok(count > 0, '✅ Tìm thấy ít nhất 1 đơn hàng.');
      })
      .pause(2000)
      .end();
  }
};
