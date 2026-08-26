<!DOCTYPE html>
<html lang="zh-Hant">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Bootstrap 表單驗證</title>


  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
    rel="stylesheet">
</head>

<body>
  <div class="container py-5" style="max-width: 700px;">

    <h2 class="mb-3">訂單表單</h2>

    <div class="alert alert-info">
      先直接按下「提交訂單」，即可觀察
      <code>was-validated</code>
      加入後的紅色驗證效果。
    </div>

    <!--
      novalidate：
      關閉瀏覽器原生的驗證提示泡泡。

      注意：
      novalidate 並不是關閉驗證功能，
      form.checkValidity() 仍然可以正常驗證。
    -->
    <form
      id="orderForm"
      novalidate
    >

      <!-- 姓名 -->
      <div class="mb-3">
        <label for="customerName" class="form-label">
          姓名
        </label>

        <input
          type="text"
          class="form-control"
          id="customerName"
          placeholder="請輸入您的姓名"
          required
        >

        <!-- 欄位有效時顯示 -->
        <div class="valid-feedback">
          姓名填寫完成。
        </div>

        <!-- 欄位無效時顯示 -->
        <div class="invalid-feedback">
          請輸入您的姓名。
        </div>
      </div>

      <!-- 電子郵件 -->
      <div class="mb-3">
        <label for="email" class="form-label">
          電子郵件
        </label>

        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="請輸入您的電子郵件"
          required
        >

        <div class="valid-feedback">
          電子郵件格式正確。
        </div>

        <div class="invalid-feedback">
          請輸入有效的電子郵件地址。
        </div>
      </div>

      <!-- 電話號碼 -->
      <div class="mb-3">
        <label for="phone" class="form-label">
          電話號碼
        </label>

        <input
          type="tel"
          class="form-control"
          id="phone"
          placeholder="例如：0912-345-678"
          pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"
          required
        >

        <div class="valid-feedback">
          電話號碼格式正確。
        </div>

        <div class="invalid-feedback">
          請輸入有效的電話號碼，格式：0912-345-678。
        </div>
      </div>

      <!-- 配送地址 -->
      <div class="mb-3">
        <label for="address" class="form-label">
          配送地址
        </label>

        <textarea
          class="form-control"
          id="address"
          rows="3"
          placeholder="請輸入您的配送地址"
          minlength="5"
          required
        ></textarea>

        <div class="valid-feedback">
          配送地址填寫完成。
        </div>

        <div class="invalid-feedback">
          請輸入至少 5 個字的配送地址。
        </div>
      </div>

      <!-- 性別 -->
      <fieldset class="mb-3">
        <legend class="col-form-label pt-0">
          性別
        </legend>

        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            id="genderMale"
            name="gender"
            value="male"
            required
          >

          <label
            class="form-check-label"
            for="genderMale"
          >
            男性
          </label>
        </div>

        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            id="genderFemale"
            name="gender"
            value="female"
          >

          <label
            class="form-check-label"
            for="genderFemale"
          >
            女性
          </label>

          <!--
            Radio 驗證訊息放在最後一個選項後面，
            顯示效果會比較正常。
          -->
          <div class="invalid-feedback">
            請選擇您的性別。
          </div>
        </div>
      </fieldset>

      <!-- 預計配送日期 -->
      <div class="mb-3">
        <label for="deliveryDate" class="form-label">
          預計配送日期
        </label>

        <input
          type="date"
          class="form-control"
          id="deliveryDate"
          required
        >

        <div class="valid-feedback">
          配送日期已選擇。
        </div>

        <div class="invalid-feedback">
          請選擇預計配送日期。
        </div>
      </div>

      <!-- 訂單數量 -->
      <div class="mb-3">
        <label for="orderQuantity" class="form-label">
          訂單數量
        </label>

        <input
          type="number"
          class="form-control"
          id="orderQuantity"
          placeholder="請輸入 1～100"
          min="1"
          max="100"
          required
        >

        <div class="valid-feedback">
          訂單數量符合範圍。
        </div>

        <div class="invalid-feedback">
          請輸入有效的訂單數量，範圍為 1～100。
        </div>
      </div>

      <!-- 付款方式 -->
      <div class="mb-3">
        <label for="paymentMethod" class="form-label">
          付款方式
        </label>

        <select
          class="form-select"
          id="paymentMethod"
          required
        >
          <option value="" selected disabled>
            請選擇付款方式
          </option>

          <option value="creditCard">
            信用卡
          </option>

          <option value="paypal">
            PayPal
          </option>

          <option value="bankTransfer">
            銀行轉帳
          </option>
        </select>

        <div class="valid-feedback">
          付款方式已選擇。
        </div>

        <div class="invalid-feedback">
          請選擇付款方式。
        </div>
      </div>

      <!-- 上傳付款證明 -->
      <div class="mb-3">
        <label for="uploadReceipt" class="form-label">
          上傳付款證明
          <span class="text-secondary">（選填）</span>
        </label>

        <input
          type="file"
          class="form-control"
          id="uploadReceipt"
          accept=".jpg,.jpeg,.png,.pdf"
        >

        <div class="form-text">
          可接受 JPG、PNG 或 PDF。
        </div>
      </div>

      <!-- 訂閱電子報 -->
      <div class="form-check form-switch mb-4">
        <input
          class="form-check-input"
          type="checkbox"
          id="subscribeNewsletter"
        >

        <label
          class="form-check-label"
          for="subscribeNewsletter"
        >
          訂閱電子報
        </label>
      </div>

      <!-- 表單整體結果 -->
      <div
        id="resultMessage"
        class="alert d-none"
        role="alert"
      ></div>

      <!-- 按鈕 -->
      <button
        class="btn btn-primary"
        type="submit"
      >
        提交訂單
      </button>

      <button
        class="btn btn-outline-secondary"
        type="button"
        id="removeValidationButton"
      >
        移除驗證效果
      </button>

      <button
        class="btn btn-outline-danger"
        type="reset"
      >
        清空表單
      </button>
    </form>
  </div>

  <!-- Bootstrap JavaScript -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

  <script>
    // 取得表單
    const form = document.getElementById('orderForm');

    // 取得結果訊息區塊
    const resultMessage = document.getElementById('resultMessage');

    // 取得移除驗證按鈕
    const removeValidationButton = document.getElementById(
      'removeValidationButton'
    );

    // 監聽表單送出事件
    form.addEventListener('submit', function (event) {
      /*
        阻止表單預設提交行為。

      */
      event.preventDefault();

      /*
        將 was-validated 加入 form。

        加入後，Bootstrap 會根據每個欄位的：

        :valid
        :invalid

        顯示綠色或紅色效果。
      */
      form.classList.add('was-validated');

      /*
        checkValidity() 會檢查整張表單。

        全部欄位有效：回傳 true
        只要一個欄位無效：回傳 false
      */
      if (form.checkValidity()) {
        // 驗證成功
        resultMessage.className = 'alert alert-success';

        resultMessage.textContent =
          '表單驗證成功！資料目前沒有真的送到伺服器。';

        console.log('驗證成功');
      } else {
        // 驗證失敗
        resultMessage.className = 'alert alert-danger';

        resultMessage.textContent =
          '表單驗證失敗，請檢查紅色欄位。';

        console.log('驗證失敗');
      }
    });

    // 移除 was-validated
    removeValidationButton.addEventListener('click', function () {
      form.classList.remove('was-validated');

      // 隱藏整體結果訊息
      resultMessage.className = 'alert d-none';

      resultMessage.textContent = '';

      console.log('已移除 was-validated');
    });

    // 按下 reset 清空表單後，也移除驗證樣式
    form.addEventListener('reset', function () {
      form.classList.remove('was-validated');

      resultMessage.className = 'alert d-none';

      resultMessage.textContent = '';
    });
  </script>
</body>

</html>