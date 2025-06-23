module.exports = {
  'TC_01 - Đặt hàng thiếu địa chỉ': function (browser) {
    const email = "phamxuankhanh9797@gmail.com";
    const password = "0927189745";

    browser
      // Đăng nhập
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
      .pause(2000)

      // Thêm sản phẩm vào giỏ
      .url('https://banlinhkien.com/bo-kit-hoc-tap-esp32-iot-maker-blk-p38421358.html')
      .waitForElementVisible('button.insertCart', 5000)
      .click('button.insertCart')
      .pause(1000)

      // Vào giỏ hàng và checkout
      .url('https://banlinhkien.com/cart')
      .waitForElementVisible('a.btnRed.btnColor[href="/cart/checkout"]', 5000)
      .click('a.btnRed.btnColor[href="/cart/checkout"]')
      .pause(2000)

      // Nhập thiếu địa chỉ
      .waitForElementVisible('input[name="customerName"]', 5000)
      .setValue('input[name="customerName"]', 'Nguyễn Văn A')
      .waitForElementVisible('input[name="customerMobile"]', 5000)
      .setValue('input[name="customerMobile"]', '0927189745')
      .setValue('input[name="customerEmail"]', 'phamxuankhanhhh9797@gmail.com')
      .setValue('#cityId', '255')
      .pause(1000)
      .waitForElementVisible('#districtId', 5000)
      .setValue('#districtId', 'quanhuyen_id') // thay bằng id thực tế
      .pause(1000)
      .waitForElementVisible('#wardId', 5000)
      .setValue('#wardId', 'phuongxa_id') // thay bằng id thực tế
      .pause(1000)
      // Để trống địa chỉ
      .clearValue('input[name="customerAddress"]')

      .waitForElementVisible('button[type="submit"],input[type="submit"]', 5000)
      .click('button[type="submit"],input[type="submit"]')
      .pause(1000)

      // Kiểm tra thông báo lỗi trường bắt buộc
      .execute(function () {
        return Array.from(document.querySelectorAll('.formErrorContent')).some(div =>
          div.innerText.includes('Trường này bắt buộc')
        );
      }, [], function (result) {
        browser.assert.ok(result.value, '✅ Có thông báo lỗi trường bắt buộc khi thiếu địa chỉ');
      })
      .end();
  }
};