module.exports = {
  'TC_06 - Xóa sản phẩm khỏi giỏ hàng': function (browser) {
    const email = "phamxuankhanh9797@gmail.com";
    const password = "0927189745";

    const itemToRemoveId = '38420583'; // ID sản phẩm cần xóa
    let initialCartCount = 0;

    // Bước 1: Đăng nhập
    browser
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
      .pause(3000)

      // Bước 2: Lấy số lượng giỏ hàng ban đầu
      .url('https://banlinhkien.com/')
      .waitForElementVisible('p.tracking span.changeICart', 5000)
      .getText('p.tracking span.changeICart', function (result) {
        initialCartCount = parseInt(result.value) || 0;
        console.log("🛒 Số sản phẩm ban đầu trong giỏ:", initialCartCount);
      })

      // Bước 3: Click vào biểu tượng giỏ hàng để vào trang giỏ
      .click('p.tracking') // Click vào biểu tượng giỏ hàng
      .pause(2000)

      // Bước 4: Xóa sản phẩm với ID cụ thể
      .useCss()
      .waitForElementVisible(`i.removeCartItem[data-id="${itemToRemoveId}"]`, 5000)
      .click(`i.removeCartItem[data-id="${itemToRemoveId}"]`)
      .pause(3000) // chờ cập nhật lại giỏ hàng

      // Bước 5: Kiểm tra số lượng giỏ hàng sau khi xóa
      .url('https://banlinhkien.com/')
      .waitForElementVisible('p.tracking span.changeICart', 5000)
      .getText('p.tracking span.changeICart', function (result) {
        const newCount = parseInt(result.value) || 0;
        console.log("🧾 Số sản phẩm sau khi xóa:", newCount);
        browser.assert.strictEqual(
          newCount,
          initialCartCount - 1,
          `✅ Đã xóa thành công 1 sản phẩm: ${initialCartCount} → ${newCount}`
        );
      })

      .end();
  }
};
