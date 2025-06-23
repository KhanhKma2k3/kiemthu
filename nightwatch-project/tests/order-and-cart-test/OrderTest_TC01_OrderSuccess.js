module.exports = {
  'TC_01 - Đặt hàng thành công khi nhập đầy đủ thông tin': function (browser) {
    const email = "exodia5555@gmail.com";
    const password = "exodia5555";

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

      // Vào giỏ hàng
      .url('https://banlinhkien.com/cart')
      .waitForElementVisible('a.btnRed.btnColor[href="/cart/checkout"]', 5000)
      .click('a.btnRed.btnColor[href="/cart/checkout"]')
      .pause(2000)

      // Nhập thông tin đặt hàng
      .waitForElementVisible('input[name="customerName"]', 5000)
      .setValue('input[name="customerName"]', 'Nguyễn Văn A')
      .waitForElementVisible('input[name="customerMobile"]', 5000)
      .setValue('input[name="customerMobile"]', '0901234567')
      .setValue('input[name="customerEmail"]', 'toibigaaaa@gmail.com')
      .setValue('input[name="customerAddress"]', '123 Đường ABC, Quận 1')

      // Chọn tỉnh/thành, quận/huyện, phường/xã (ví dụ chọn Hồ Chí Minh)
    .click('#cityId')
    .click('#cityId option[value="255"]')      // Hồ Chí Minh
    .pause(4000) // hoặc dùng waitForElementVisible nếu cần chờ load động
    .click('#districtId')
    .click('#districtId option[value="329"]')  // VD: Quận 1 (kiểm tra lại value đúng)
    .pause(2000)
    .click('#wardId')
    .click('#wardId option[value="10266"]')     // VD: Phường Bến Nghé (kiểm tra lại value đúng)
    .pause(1000)

      // Gửi đặt hàng
      .waitForElementVisible('button[type="submit"],input[type="submit"]', 5000)
      .click('button[type="submit"],input[type="submit"]')
      .pause(5000) // tăng thời gian chờ sau khi submit

      // Kiểm tra thông báo đặt hàng thành công
    
      .waitForElementVisible('p', 20000)
      .execute(function () {
        return Array.from(document.querySelectorAll('p')).some(p =>
          p.innerText.includes('Chúc mừng bạn đã đặt hàng thành công')
        );
      }, [], function (result) {
        browser.assert.ok(result.value, '✅ Đặt hàng thành công');
      })
      .end();
  }
};