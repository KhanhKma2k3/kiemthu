module.exports = {
  'TC_02 - Tìm kiếm với từ khóa "chip"': function (browser) {
    const keyword = 'chip';

    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)

      // Nhập từ khóa
      .waitForElementVisible('#txtSearch', 5000)
      .clearValue('#txtSearch')
      .setValue('#txtSearch', keyword)
      .sendKeys('#txtSearch', browser.Keys.ENTER)

      .pause(5000) // đợi trang tải kết quả

      // Lấy nội dung toàn trang để kiểm tra
      .execute(function () {
        return document.body.innerText;
      }, [], function (result) {
        const content = result.value.toLowerCase();
        console.log("DEBUG | Nội dung trang:", content.slice(0, 500));
        browser.assert.ok(
          content.includes('kết quả tìm kiếm') && content.includes('chip'),
          `✅ Có kết quả chứa từ "chip": "${content.match(/.*kết quả.*chip.*/gi) || '❌ Không tìm thấy đoạn văn phù hợp'}"`
        );
      })

      .end();
  }
};
