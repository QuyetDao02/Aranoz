// Thêm script trực tiếp vào tệp JS của bạn
var axiosScript = document.createElement('script');
axiosScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js';
document.head.appendChild(axiosScript);

// Đảm bảo rằng Axios đã được tải xong trước khi sử dụng nó
axiosScript.onload = function () {
  // Bây giờ bạn có thể sử dụng Axios bình thường
  var citis = document.getElementById("city");
  var districts = document.getElementById("district");
  var wards = document.getElementById("ward");
  if (districts && wards) {
    var Parameter = {
      url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json", 
      method: "GET", 
      responseType: "application/json", 
    };
  
    var promise = axios(Parameter);
    promise.then(function (result) {
      renderCity(result.data);
    });
  
    function renderCity(data) {
      for (const x of data) {
        citis.options[citis.options.length] = new Option(x.Name, x.Id);
      }
  
      citis.onchange = function () {
        districts.length = 1;
        wards.length = 1;
        if (this.value != "") {
          const result = data.filter(n => n.Id === this.value);
          for (const k of result[0].Districts) {
            districts.options[districts.options.length] = new Option(k.Name, k.Id);
          }
        }
      };
  
      districts.onchange = function () {
        wards.length = 1;
        const dataCity = data.filter((n) => n.Id === citis.value);
        if (this.value != "") {
          const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;
          for (const w of dataWards) {
            wards.options[wards.options.length] = new Option(w.Name, w.Id);
          }
        }
      };
    }
  } else {
    console.error("Phần tử HTML với id 'district' hoặc 'ward' không tồn tại trong DOM.");
  }
};
var numberInput = document.getElementById("numberInput");

// Thêm sự kiện ngăn chặn ký tự không phải số
numberInput.addEventListener("input", function() {
  this.value = this.value.replace(/[^0-9]/g, '');
});